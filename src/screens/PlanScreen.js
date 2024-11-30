import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Title, List, Text, ActivityIndicator, Checkbox, Divider, IconButton, Card } from 'react-native-paper';
import styles from '../styles/PlanStyles';
import { listProjects, getProposePlan, listTaskAproject } from '../services/routes';
import { useNavigation } from '@react-navigation/native';

const PlanScreen = () => {
    const navigation = useNavigation();
    const [projects, setProjects] = useState([]);
    const [proposedPlan, setProposedPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [emptyProjectList, setEmptyProjectList] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(false);

    const getTaskByID = async (taskId) => {
        try {
            console.log("projectId", selectedProjectId);
            const taskList = await listTaskAproject(selectedProjectId);
            const res = taskList.find((t) => {
                return t.id == taskId
            });
            return res;
        } catch (error) {
            alert("Error in load task by id");
        }
    };
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
        getAllProjects();
    }, [])

    const generatePlan = async (projectId) => {
        try {
            setLoading(true);
            setSelectedProjectId(projectId)
            const planGenerated = await getProposePlan(projectId);
            setProposedPlan(planGenerated);
            alert("Generated plan successfully");
        } catch (error) {
            alert("Error in generate plan");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProjects();
    }, [])

    useEffect(() => {
        setEmptyProjectList(projects?.length === 0);
    }, [projects]);

    return (
        <View style={styles.container}>
            {loading &&
                <View style={styles.overlay}>
                    <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            }
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Title style={styles.title}>Plan</Title>

                {emptyProjectList ? (
                    <>
                        <View style={styles.div}>
                            <Image
                                source={require('../../assets/noproject.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Title style={styles.subtitle}>No project found. Create some to generate a personalized plan.</Title>
                        </View>

                    </>

                ) : (
                    <>
                        <Text style={styles.descriptionScreen}> Choose a project and we can create a personalized plan suggestion, tailored to your needs.</Text>
                        <List.Accordion
                            title="Select a project"
                            left={props => <List.Icon {...props} icon="notebook" />}>
                            {projects?.map((project) => (
                                <List.Item title={project.name} key={project.id} onPress={() => {
                                    generatePlan(project.id);
                                }
                                } />
                            ))}
                        </List.Accordion>
                    </>
                )}
                {Object.keys(proposedPlan).length !== 0 &&
                    <>
                        <Text style={styles.subtitle}>{proposedPlan.dayTitle}</Text>
                        <Text style={styles.descriptionDay}>{proposedPlan.daySummary}</Text>
                        {proposedPlan.tasks.map((task) => (
                            <>
                                <View key={task.id}>
                                    <Card style={styles.card}
                                        onPress={() => {
                                            getTaskByID(task.id).then((taskData) => {
                                                navigation.navigate('TaskDetail', { task: taskData, project: projects })
                                            });
                                        }}>
                                        <View style={styles.areaCard}>
                                            <IconButton style={styles.iconTask} icon={'book-check'} />
                                            <Text key={task.id} style={styles.taskName}>{task.name}</Text>
                                        </View>

                                    </Card>
                                </View>
                            </>

                        ))}

                    </>
                }

            </ScrollView>
        </View>
    );
};

export default PlanScreen;