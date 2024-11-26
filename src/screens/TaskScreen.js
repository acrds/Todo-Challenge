import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Card, FAB, SegmentedButtons, Title, Portal, Modal, TextInput, Button, useTheme, HelperText, ActivityIndicator, IconButton, Paragraph } from 'react-native-paper';
import styles from '../styles/TaskStyles';
import { listTaskAproject, generateDescriptionNewTask, createTask } from '../services/auth';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

export default function TaskScreen() {
    const route = useRoute();
    const theme = useTheme();
    const navigation = useNavigation();
    const { project } = route.params;
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatuses, setSelectedStatuses] = useState(['To Do', 'Doing', 'Done']);
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [hasTitle, setHasTitle] = useState(false);

    const fetchTasks = async () => {
        const updatedTasks = await listTaskAproject(project?.id);
        setTasks(updatedTasks);
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchTasks();
        }, [])
    );

    const getAllTasks = async () => {
        try {
            setLoading(true);
            const taskList = await listTaskAproject(project?.id);
            setTasks(taskList);
        } catch (error) {
            alert("Error in load tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const filteredTasks_ = tasks.filter(task =>
            selectedStatuses.includes(task.currentState.state.name)
        );
        setFilteredTasks(filteredTasks_);
    }, [tasks, selectedStatuses]);

    useEffect(() => {
        getAllTasks();
    }, []);

    useEffect(() => {
        const isValid =
            newTitle.trim().length > 0 &&
            newDescription.trim().length > 0;

        setIsFormValid(isValid);
    }, [newTitle, newDescription]);

    useEffect(() => {
        const isValid =
            newTitle.trim().length > 0;
        setHasTitle(isValid);
    }, [newTitle]);

    var emptyTaskList = tasks?.length == 0;


    const addNewTask = async () => {
        try {
            if (newTitle.trim() && newDescription.trim()) {
                const newTask = {
                    name: newTitle,
                    description: newDescription,
                    projectId: project?.id
                };
                await createTask(newTask);
                await getAllTasks();
                alert("Task created successfully");
            }
        } catch (error) {
            if (error.status === 500) {
                alert("Error. Try later");
            } else if (error.status === 404) {
                alert("User not found");
            } else if (error.status === 400) {
                alert("Fields are required");
            } else {
                alert(error.message);
            }
        } finally {
            setNewTitle('');
            setNewDescription('');
            setModalVisible(false);
        }
    };

    const generateDescription = async () => {
        try {
            setLoading(true);
            if (newTitle.trim() && project?.id) {
                const newTask = {
                    taskName: newTitle,
                    taskDescription: newDescription,
                    projectId: project?.id
                };
                const description = await generateDescriptionNewTask(newTask);
                setNewDescription(description);
                alert("Description generated successfully");
            }
        } catch (error) {
            if (error.status === 500) {
                alert("Error. Try later");
            } else if (error.status === 404) {
                alert("User not found");
            } else if (error.status === 200) {
                alert("Description generated successfully");
            } else if (error.status === 400) {
                alert("Title is required");
            } else {
                alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    function iconStatus(element) {
        let icon = '';
        if (element === 'to-do') {
            icon = 'circle'
        } else if (element === "doing") {
            icon = 'circle-slice-5'
        } else if (element === 'done') {
            icon = 'circle-slice-8'
        } else {
            icon = 'pause-circle'
        }
        return icon
    }


    function formatDate(dateString) {
        const date = new Date(dateString);
        const offset = -3;
        const adjustedDate = new Date(date.getTime() + offset * 60 * 60 * 1000);
        const day = String(adjustedDate.getUTCDate()).padStart(2, '0');
        const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, '0');
        const year = adjustedDate.getUTCFullYear();
        const hours = String(adjustedDate.getUTCHours()).padStart(2, '0');
        const minutes = String(adjustedDate.getUTCMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes} (-3GMT)`;
    }

    function onUpdateFilter(selectedStatusList) {
        const filteredTasks_ = tasks.filter(task => {
            return selectedStatusList.includes(task.currentState.state.name)
        })
        setFilteredTasks(filteredTasks_)
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator
                    animating={true}
                    size="large"
                    style={styles.loadingIndicator}
                />
            ) : (
                <>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Title style={styles.header}>Your Tasks {tasks?.length ? `(${tasks?.length})` : "(0)"}</Title>
                        <SegmentedButtons theme={{ colors: { primary: 'green' } }}
                            value={selectedStatuses}
                            onValueChange={(selectedStatusList) => {
                                setSelectedStatuses(selectedStatusList);
                                onUpdateFilter(selectedStatusList)
                            }}
                            buttons={[
                                { value: 'To Do', label: 'TO DO', icon: 'circle' },
                                { value: 'Doing', label: 'DOING', icon: 'circle-slice-5'},
                                { value: 'Done', label: 'DONE', icon: 'circle-slice-8'},
                            ]}
                            multiSelect
                        />
                        {emptyTaskList ? (
                            <View style={styles.div}>
                                <Image
                                    source={require('../../assets/taskempty.png')}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                                <Title style={styles.noTasksText}>No task yet.</Title>
                            </View>
                        ) : (
                            filteredTasks?.map(task => (
                                <Card onPress={() => navigation.navigate('TaskDetail', { task: task, project: project })} key={task.id} style={styles.card}>
                                    <Card.Content>
                                        <View style={styles.cardHeader}>
                                            <IconButton icon={iconStatus(task?.currentState?.state?.slug)} iconColor={task?.currentState?.state?.color} size={24} />
                                            <Title style={styles.titleTask}>{task.name}</Title>
                                        </View>
                                        <Paragraph>Created at: {formatDate(task.createdAt)}</Paragraph>
                                        <Paragraph>Updated at: {formatDate(task.updatedAt)}</Paragraph>
                                        <Paragraph style={styles.boldText}>Status: {task?.currentState?.state?.name}</Paragraph>
                                    </Card.Content>
                                </Card>

                            ))
                        )}
                    </ScrollView>
                    <FAB
                        style={[styles.fab, { backgroundColor: '#004aad' }]}
                        icon="plus"
                        color='white'
                        onPress={() => setModalVisible(true)}
                    />
                    <Portal>
                        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
                            <Title style={styles.modalTitle}>Create New Task</Title>
                            <View>
                                <TextInput
                                    label="Task Title"
                                    mode="outlined"
                                    value={newTitle}
                                    onChangeText={setNewTitle}

                                />
                                <HelperText style={styles.suggest} type="info">
                                    Fill in the title and automatically generate the description
                                </HelperText>
                            </View>

                            <TextInput
                                label="Task Description"
                                mode="outlined"
                                value={newDescription}
                                onChangeText={setNewDescription}
                                style={styles.input}
                                multiline
                            />
                            <View style={styles.containerButton}>
                                <Button icon='robot' mode="contained" disabled={!hasTitle} onPress={generateDescription} style={[styles.generateButton, { backgroundColor: hasTitle ? "#1573ef" : theme.colors.disabled }]}>
                                    Generate with AI
                                </Button>
                                <Button mode="contained" disabled={!isFormValid} onPress={addNewTask} style={[styles.createButton, { backgroundColor: isFormValid ? "#004aad" : theme.colors.disabled }]}>
                                    Create
                                </Button>

                            </View>
                        </Modal>
                    </Portal>
                </>
            )};
        </View>
    )
};
