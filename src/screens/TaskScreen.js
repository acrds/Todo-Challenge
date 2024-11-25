import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { Card, FAB, SegmentedButtons, Title, Portal, Modal, TextInput, Button, useTheme, HelperText, ActivityIndicator, IconButton, Paragraph } from 'react-native-paper';
import styles from '../styles/TaskStyles';
import { listTaskAproject } from '../services/auth';
import { useRoute } from '@react-navigation/native';
import { createTask } from '../services/auth';


export default function TaskScreen() {
    const route = useRoute();
    const theme = useTheme();
    const { project } = route.params;
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatuses, setSelectedStatuses] = useState(['To Do', 'Doing', 'Done']);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [hasTitle, setHasTitle] = useState(false);

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
            } else if (error.status === 201) {
                alert("Task created successfully");
            } else if (error.status === 400) {
                alert("Fields are required");
            } else {
                alert(error.message);
            }
        } finally {
            setModalVisible(false);
        }
    };

    const generate = () => {
        console.log("caga")
    };

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
                    <Title style={styles.header}>Your Tasks {tasks?.length ? `(${tasks?.length})` : "(0)"}</Title>
                    <SegmentedButtons
                        value={selectedStatuses}
                        onValueChange={setSelectedStatuses}
                        buttons={[
                            { value: 'To Do', label: 'TO DO', icon: 'check' },
                            { value: 'Doing', label: 'DOING', icon: 'check' },
                            { value: 'Done', label: 'DONE', icon: 'check' },
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
                        tasks?.map(task => (

                            <Card onPress={() => console.log("oi")} key={task.id} style={styles.card}>
                            <Card.Content>
                                <View style={styles.cardHeader}>
                                    <Title style={styles.titleTask}>{task.name}</Title>
                                    <IconButton icon="calendar" size={24} />
                                </View>
                                <Paragraph>Created at: {formatDate(task.createdAt)}</Paragraph>
                                <Paragraph>Updated at: {formatDate(task.updatedAt)}</Paragraph>
                            </Card.Content>
                        </Card>

                        ))
                    )}
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
                                <Button icon='robot' mode="contained" disabled={!hasTitle} onPress={generate} style={[styles.generateButton, { backgroundColor: hasTitle ? "#1573ef" : theme.colors.disabled }]}>
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
