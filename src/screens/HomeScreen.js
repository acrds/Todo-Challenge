import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { listProjects, createProject, deleteProject } from '../services/auth';
import { Card, Title, Paragraph, FAB, IconButton, ActivityIndicator, Portal, Modal, TextInput, Button, useTheme, Dialog, Text } from "react-native-paper";
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
            setProjects(fetchProject);
            alert('Project deleted successfully');
        } catch (error) {
            console.log("erro function: ", JSON.stringify(error))
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

    var emptyProjectList = projects?.length == 0;

    return (
        <View style={styles.container}>

            {loading || loadDelete ? (
                <ActivityIndicator
                    animating={true}
                    size="large"
                    style={styles.loadingIndicator}
                />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Title style={styles.title}>Your Projects {projects?.length ? `(${projects?.length})` : "(0)"}</Title>

                    {emptyProjectList ? (
                        <>
                            <View style={styles.div}>
                                <Image
                                    source={require('../../assets/investigation.png')}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                                <Title style={styles.subtitle}>No project yet.</Title>
                            </View>

                        </>
                    ) : (
                        projects?.map((project) => (
                            <Card onPress={() => navigation.navigate('Task', { project: project })} key={project.id} style={styles.card}>
                                <Card.Content>
                                    <View style={styles.cardHeader}>
                                        <View>
                                            <Title style={styles.titleProject}>{project.name}</Title>
                                            <Paragraph>{project.description}</Paragraph>
                                        </View>
                                        <View style={styles.itensHeader}>
                                            <IconButton icon="bookmark-multiple" size={30} />
                                            <IconButton onPress={() => {
                                                setModalDeleteProject(true);
                                                setSelectedId(project.id);
                                            }} icon="delete" size={30} />
                                        </View>

                                    </View>

                                </Card.Content>
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
                    <Dialog.Title style={styles.dialog}>Attention</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Are you sure to remove this project?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setModalDeleteProject(false)}>Cancel</Button>
                        <Button onPress={handleDeleteProject}>Yes</Button>
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
                        style={styles.input}
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