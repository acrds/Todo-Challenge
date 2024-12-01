import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Title, List, Text, ActivityIndicator, IconButton, Card } from 'react-native-paper';
import styles from '../styles/PlanStyles';
import { getProposePlan, listTaskAproject } from '../services/routes';
import { useNavigation } from '@react-navigation/native';
import { useProjectStore } from '../store/projectStore';

const PlanScreen = () => {
    const navigation = useNavigation();
    const globalProject = useProjectStore((state) => state.globalProject);
    const [proposedPlan, setProposedPlan] = useState({});
    const [loading, setLoading] = useState(false);
    const [emptyProjectList, setEmptyProjectList] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(false);
    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

    const getTaskByID = async (taskId) => {
        try {
            const taskList = await listTaskAproject(selectedProjectId);
            const res = taskList.find((t) => {
                return t.id == taskId
            });
            return res;
        } catch (error) {
            alert("Error in load task by id");
        }
    };

    const generatePlan = async (projectId) => {
        try {
            setLoading(true);
            setSelectedProjectId(projectId)
            const planGenerated = await getProposePlan(projectId);
            setProposedPlan(planGenerated);
            alert("Generated plan successfully");
        } catch (error) {
            if (error.status === 400) {
                alert("You need to create a task first");
            } else {
                alert("Error in generate plan");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setEmptyProjectList(globalProject?.length === 0);
    }, [globalProject]);

    const handlePress = () => {
        setProposedPlan({});
        setIsAccordionExpanded(!isAccordionExpanded);
    };


    return (
        <View style={styles.container}>
            {loading &&
                <View style={styles.overlay}>
                    <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />
                    <Text style={styles.loadingText}>Generating plan...</Text>
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
                            expanded={isAccordionExpanded}
                            onPress={handlePress}
                            left={props => <List.Icon {...props}
                                icon="notebook" />}>
                            {globalProject?.map((project) => (
                                <List.Item key={project.id} title={project.name} onPress={() => {
                                    generatePlan(project.id);
                                    setIsAccordionExpanded(false);
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
                                                const selected = globalProject.find((elem)=>elem.id=selectedProjectId)
                                                navigation.navigate('TaskDetail', { 
                                                    task: taskData,
                                                    project: selected
                                                })
                                            })
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