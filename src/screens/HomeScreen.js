import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { listProjects, createProject, deleteProject } from '../services/routes';
import { Card, Title, FAB, IconButton, ActivityIndicator, Portal, Modal, TextInput, Button, useTheme, Dialog, Text } from "react-native-paper";
import styles from '../styles/HomeStyles';

export default function HomeScreen() {
    const navigation = useNavigation();
    const theme = useTheme();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadDelete, setLoadDelete] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [modalDeleteProject, setModalDeleteProject] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [emptyProjectList, setEmptyProjectList] = useState(false);

    useEffect(() => {
        setEmptyProjectList(projects?.length === 0);
    }, [projects]);

    const fetchProject = async () => {
        const updatedProjects = await listProjects();
        setTasks(updatedProjects);
    };
    useFocusEffect(
        React.useCallback(() => {
            fetchProject();
        }, [])
    );

    const getAllProjects = async () => {
        try {
            setLoading(true);
            const projectList = await listProjects();
            setProjects(projectList);
        } catch (error) {
            alert("Error in load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isValid =
            newTitle.trim().length > 0 &&
            newDescription.trim().length > 0;

        setIsFormValid(isValid);
    }, [newTitle, newDescription]);

    useEffect(() => {
        getAllProjects();
    }, [])

    const addNewProject = async () => {
        try {
            if (newTitle.trim() && newDescription.trim()) {
                const newProject = {
                    name: newTitle,
                    description: newDescription,
                };
                await createProject(newProject);
                await getAllProjects();
                alert("Project created successfully");

            }
        } catch (error) {
            if (error.status === 500) {
                alert("Error. Try later");
            } else if (error.status === 404) {
                alert("User not found");
            } else if (error.status === 201) {
                alert("Project created successfully");
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

    const handleDeleteProject = async () => {
        try {
            setLoadDelete(true);
            await deleteProject(selectedId);
            const fetchProject = await getAllProjects();
            setEmptyProjectList(fetchProject);
            alert('Project deleted successfully');
        } catch (error) {
            if (error.status === 500) {
                alert("Error internal. Try later");
            } else if (error.status === 401) {
                alert("User not found");
            } else if (error.status === 404) {
                alert("Project not found");
            } else {
                alert(error.message);
            }
        } finally {
            setModalDeleteProject(false);
            setSelectedId("");
            setLoadDelete(false);
        }
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

            {loading || loadDelete ? (
                <View style={styles.overlay}>
                    <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Title style={styles.title}>Your Projects {projects?.length ? `(${projects?.length})` : "(0)"}</Title>

                    {emptyProjectList ? (
                        <>
                            <View style={styles.div}>
                                <Image
                                    source={require('../../assets/noproject.png')}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                                <Title style={styles.subtitle}>No project yet.</Title>
                            </View>

                        </>
                    ) : (
                        projects?.map((project) => (
                            <Card onPress={() => navigation.navigate('Task', { project: project })} key={project.id} style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.titleContainer}>
                                        <View style={styles.contentTitleLeft}>
                                            <Text style={styles.titleProject}>{project.name}</Text>
                                        </View>

                                        <View style={styles.contentTitleRight}>
                                            <IconButton onPress={() => {
                                                setModalDeleteProject(true);
                                                setSelectedId(project.id);
                                            }} icon="delete" size={25} />
                                        </View>

                                    </View>

                                    <View style={styles.descriptionContainer}>
                                        <Text>{project.description}</Text>
                                    </View>
                                    <View style={styles.footterContainer}>
                                        <Text style={styles.footterText}>{`Created At: ${formatDate(project.createdAt).substring(0,10)}`}</Text>
                                        <Text style={styles.footterTask}>5/11</Text>
                                    </View>
                                </View>
                            </Card>
                        ))
                    )}

                </ScrollView>
            )}

            <FAB
                icon="plus"
                color='white'
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            />

            <Portal>
                <Dialog visible={modalDeleteProject} onDismiss={() => setModalDeleteProject(false)}>
                    <Dialog.Icon icon="trash-can" size={35} />
                    <Dialog.Title style={styles.dialog}>Confirmation</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">After deleting a project, it can`t be undone.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setModalDeleteProject(false)}>Cancel</Button>
                        <Button onPress={handleDeleteProject}>Remove</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
                    <Title style={styles.modalTitle}>Create New Project</Title>

                    <TextInput
                        label="Project Title"
                        mode="outlined"
                        value={newTitle}
                        onChangeText={setNewTitle}
                    />

                    <TextInput
                        label="Project Description"
                        mode="outlined"
                        value={newDescription}
                        onChangeText={setNewDescription}
                        style={styles.input}
                        multiline
                    />

                    <Button mode="contained" disabled={!isFormValid} onPress={addNewProject} style={[styles.createButton, { backgroundColor: isFormValid ? "#004aad" : theme.colors.disabled }]}>
                        Create
                    </Button>
                </Modal>
            </Portal>
        </View>
    );
}