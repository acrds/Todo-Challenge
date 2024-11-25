import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createComment, listTaskAproject, updateStatus} from '../services/auth';
import { Card, Title, Text, FAB, Menu, Portal, Modal, TextInput, Button, useTheme, Divider, Paragraph, ActivityIndicator } from "react-native-paper";
import styles from '../styles/TaskDetailStyles';

export default function TaskDetailScreen() {
    const theme = useTheme();
    const route = useRoute();
    const { task: initialTask, project } = route.params;
    const [task, setTask] = useState(initialTask);
    const [modalVisible, setModalVisible] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const getAllTasks = async () => {
        try {
            const taskList = await listTaskAproject(project?.id);
            return taskList.find((t) => t.id === task.id);
        } catch (error) {
            alert("Error in load tasks");
        }
    };

    useEffect(() => {
        const isValid =
            newComment.trim().length > 0;
        setIsFormValid(isValid);
    }, [newComment]);

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

    const status = [
        { id: 1, name: 'To Do' },
        { id: 2, name: 'Doing' },
        { id: 3, name: 'Done' },
    ];

    const handleStatusChange = async (statusId) => {
        try {
            setLoading(true);
            await updateStatus({ taskId: task.id, stateId: statusId});
            const fetchTask = await getAllTasks();
            setTask(fetchTask);
            const updatedStatus = status.find((st) => statusId === st.id);
            alert(`Status changed to ${updatedStatus.name}`);
        } catch (error) {
            console.log("errror ", error)
            alert("Failed to update status. Please try again.");
        } finally {
            setLoading(false);
            closeMenu();
        }
    };

    const addNewComment = async () => {
        try {
            setLoading(true);
            if (newComment.trim() && task?.id) {
                const addComment = {
                    taskId: task.id,
                    text: newComment,
                };
                await createComment(addComment);
                const fetchTask = await getAllTasks();
                setTask(fetchTask);
                alert("Comment created successfully");
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
            setNewComment("");
            setLoading(false);
            setModalVisible(false);
        }
    };

    var emptyCommentList = task?.comments?.length == 0;

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
                    <View style={styles.cardHeader}>
                        <Image
                            source={require('../../assets/task-list.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Button icon="chevron-down" mode="contained" onPress={openMenu} >
                            Change status
                        </Button>

                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <Button style={styles.status} onPress={openMenu}>
                                    Current status: {task?.currentState?.state?.name}
                                </Button>
                            }
                        >
                            {status.map((status) => (
                                <Menu.Item
                                    key={status.id}
                                    onPress={() => {console.log(status);handleStatusChange(status.id)}}
                                    title={status.name}
                                    disabled={status.id === task?.currentState?.state?.id} 
                                />
                            ))}
                        </Menu>

                    </View>
                    <Title style={styles.titleTask}>{task.name}</Title>
                    <Card>
                        <Text style={styles.subtitle}>Description:</Text>
                        <Card.Content>
                            <Text variant="bodyMedium">{task.description}</Text>
                        </Card.Content>
                    </Card>

                    {emptyCommentList ? (
                        <Text>No comments yet for this task</Text>
                    ) : (
                        task.comments?.map(comment => (
                            <Card key={comment.id} style={styles.card}>
                                <Card.Content>
                                    <Paragraph style={styles.headerComment}>Modified at: {formatDate(comment.updatedAt)}</Paragraph>
                                    <Divider />
                                    <Paragraph>{comment.text}</Paragraph>
                                    <Card.Actions>
                                        <Button>Edit</Button>
                                        <Button>Cancel</Button>
                                    </Card.Actions>
                                </Card.Content>
                            </Card>
                        ))
                    )}
                </ScrollView>
            )}
            <FAB
                icon="comment"
                color='white'
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            />
            <Portal>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
                    <Title style={styles.modalTitle}>Add Comment</Title>

                    <TextInput
                        label="Comment"
                        mode="outlined"
                        value={newComment}
                        onChangeText={setNewComment}
                        style={styles.input}
                        multiline
                    />

                    <Button mode="contained" disabled={!isFormValid} onPress={addNewComment} style={[styles.createButton, { backgroundColor: isFormValid ? "#004aad" : theme.colors.disabled }]}>
                        Comment
                    </Button>
                </Modal>
            </Portal>
        </View >
    );
}