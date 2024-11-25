import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, FAB, SegmentedButtons, Title } from 'react-native-paper';
import styles from '../styles/TaskStyles';
import { listTaskAproject } from '../services/auth';
import { useRoute } from '@react-navigation/native';


export default function TaskScreen() {
    const route = useRoute();
    const { project } = route.params;
    const [tasks, setTasks] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState(['To Do', 'Doing', 'Done']);

    const getAllTasks = async () => {
        try {
            const projectList = await listTaskAproject(project?.id);
            return projectList;
        } catch (error) {
            alert("Error in load projects");
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const fetchedTasks = await getAllTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Error in fetch projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const filteredTasks = tasks.filter(task =>
        selectedStatuses.includes(task.status)
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Tasks</Text>
            <SegmentedButtons
                value={selectedStatuses}
                onValueChange={setSelectedStatuses}
                buttons={[
                    { value: 'To Do', label: 'TO DO'},
                    { value: 'Doing', label: 'DOING'},
                    { value: 'Done', label: 'DONE' },
                ]}
                multiSelect
            />
            {filteredTasks.length === 0 ? (
                <View style={styles.div}>
                    <Image
                        source={require('../../assets/taskempty.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Title style={styles.noTasksText}>No project yet.</Title>
                </View>
            ) : (
                filteredTasks.map(task => (
                    <Card key={task.id} style={styles.card}>
                        <Card.Title title={task.title} subtitle={`Created on: ${task.date}`} />
                        <Card.Content>
                            <Text>Status: {task.status}</Text>
                        </Card.Content>
                    </Card>
                ))
            )}
            <FAB
                style={[styles.fab, {backgroundColor: '#004aad'}]}
                icon="plus"
                color='white'
                onPress={() => console.log('Add Task')}
            />
        </View>
    );
};
