import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { listProjects, createProject } from '../services/auth';
import { Card, Title, Paragraph, FAB, IconButton, ActivityIndicator, Portal, Modal, TextInput, Button, useTheme } from "react-native-paper";
import styles from '../styles/HomeStyles';

export default function HomeScreen() {
    const navigation = useNavigation();
    const theme = useTheme();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

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
    }, []);

    const addNewProject = async () => {
        try {
            if (newTitle.trim() && newDescription.trim()) {
                const newProject = {
                    name: newTitle,
                    description: newDescription,
                };
                await createProject(newProject);
                setProjects([...projects, newProject]);
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
            }else {
                alert(error.message);
            }
        } finally {
            setModalVisible(false);
        }
    };

    var emptyProjectList = projects.length == 0;

    return (
        <View style={styles.container}>

            {loading ? (
                <ActivityIndicator
                    animating={true}
                    size="large"
                    style={styles.loadingIndicator}
                />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Title style={styles.title}>Your Projects</Title>

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
                            <Card key={project.id} style={styles.card}>
                                <Card.Content>
                                    <View style={styles.cardHeader}>
                                        <Title style={styles.titleProject}>{project.name}</Title>
                                        <IconButton icon="calendar" size={24} />
                                    </View>
                                    <Paragraph>{project.description}</Paragraph>
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