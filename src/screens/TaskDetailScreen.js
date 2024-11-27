import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { createComment, deleteComment, listTaskAproject, updateComment, updateStatus, updateTask, deleteTask } from '../services/routes';
import { Card, Title, Text, FAB, Menu, Portal, Modal, TextInput, Button, useTheme, Dialog, Paragraph, ActivityIndicator, Icon } from "react-native-paper";
import styles from '../styles/TaskDetailStyles';
import Markdown from 'react-native-markdown-display';
import { CommonActions } from '@react-navigation/native';

export default function TaskDetailScreen() {
    const theme = useTheme();
    const route = useRoute();
    const navigation = useNavigation();
    const { task: initialTask, project } = route.params;
    const [task, setTask] = useState(initialTask);
    const [modalVisible, setModalVisible] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedComment, setSelectedComment] = useState("");
    const [modalComment, setModalComment] = useState(false);
    const [modalDeleteComment, setModalDeleteComment] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [modalEditTask, setModalEditTask] = useState(false);
    const [modalDeleteTask, setModalDeleteTask] = useState(false);

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
            await updateStatus({ taskId: task.id, stateId: statusId });
            const fetchTask = await getAllTasks();
            setTask(fetchTask);
            const updatedStatus = status.find((st) => statusId === st.id);
            alert(`Status changed to ${updatedStatus.name}`);
        } catch (error) {
            alert("Failed to update status. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async () => {
        try {
            setLoading(true);
            await deleteComment(selectedId);
            const fetchTask = await getAllTasks();
            setTask(fetchTask);
            alert('Comment deleted successfully');
        } catch (error) {
            if (error.status === 500) {
                alert("Error internal. Try later");
            } else if (error.status === 401) {
                alert("User not found");
            } else if (error.status === 404) {
                alert("Comment not found");
            } else {
                alert(error.message);
            }
        } finally {
            setModalDeleteComment(false);
            setSelectedId("");
            setLoading(false);
        }
    };

    const handleUpdateComment = async () => {
        try {
            setLoading(true);
            await updateComment({ text: selectedComment }, selectedId);
            const fetchTask = await getAllTasks();
            setTask(fetchTask);
            alert('Comment updated successfully');
        } catch (error) {
            if (error.status === 500) {
                alert("Error internal. Try later");
            } else if (error.status === 401) {
                alert("User not found");
            } else if (error.status === 404) {
                alert("Comment not found");
            } else {
                alert(error.message);
            }
        } finally {
            setSelectedComment("");
            setSelectedId("");
            setModalComment(false);
            setLoading(false);
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

    const handleEditTask = async () => {
        try {
            setLoading(true);
            await updateTask({ taskName: selectedTitle, taskDescription: selectedDescription }, selectedId);
            const fetchTask = await getAllTasks();
            setTask(fetchTask);
            alert('Task updated successfully');
        } catch (error) {
            if (error.status === 500) {
                alert("Error internal. Try later");
            } else if (error.status === 401) {
                alert("User not found");
            } else if (error.status === 404) {
                alert("Task not found");
            } else {
                alert(error.message);
            }
        } finally {
            setSelectedDescription("");
            setSelectedTitle("");
            setSelectedId("");
            setModalEditTask(false);
            setLoading(false);
        }
    };

    const handleDeleteTask = async () => {
        try {
            setLoading(true);
            await deleteTask(selectedId);
            const fetchTask = await getAllTasks();
            navigation.dispatch(CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Projects' },
                    { name: 'Task', params: { project: { ...project, task: fetchTask } } }
                ]
            })
            );
            alert('Task deleted successfully');
        } catch (error) {
            if (error.status === 500) {
                alert("Error internal. Try later");
            } else if (error.status === 401) {
                alert("User not found");
            } else if (error.status === 404) {
                alert("Task not found");
            } else {
                alert(error.message);
            }
        } finally {
            setModalDeleteTask(false);
            setSelectedId("");
            setLoading(false);
        }
    };
    var emptyCommentList = task?.comments?.length == 0;

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.overlay}>
                    <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Title style={styles.titleTask}>{task.name}</Title>
                    <View style={styles.cardHeader}>
                        <View style={styles.containerHeaderLeft}>
                            <View style={styles.viewButtons}>
                                <Button
                                    icon={"lead-pencil"}
                                    mode="contained"
                                    onPress={() => {
                                        setModalEditTask(true);
                                        setSelectedTitle(task.name);
                                        setSelectedDescription(task.description);
                                        setSelectedId(task.id);
                                    }}
                                    style={[{ backgroundColor: '#d4c3f1' }]}>Edit</Button>
                                <Button
                                    icon={"trash-can"}
                                    mode="contained"
                                    onPress={() => {
                                        setModalDeleteTask(true);
                                        setSelectedId(task.id);
                                    }}
                                    style={[{ backgroundColor: "#f14434" }]}>Remove</Button>
                            </View>
                            <Text style={styles.dates}>Created at: {formatDate(task.createdAt).substring(0, 10)}</Text>
                            <Text style={styles.dates}>Updated at: {formatDate(task.updatedAt).substring(0, 10)}</Text>
                            <Button icon="chevron-down" mode="contained" onPress={openMenu} >
                                {task?.currentState?.state?.name}
                            </Button>
                            <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={
                                    <Button style={styles.status} onPress={openMenu} />
                                }
                            >
                                {status.map((status) => (
                                    <Menu.Item
                                        key={status.id}
                                        onPress={() => handleStatusChange(status.id)}
                                        title={status.name}
                                        disabled={status.id === task?.currentState?.state?.id}
                                    />
                                ))}
                            </Menu>
                        </View>
                        <View style={styles.containerHeaderRight}>
                            <Image
                                source={require('../../assets/to-do-list.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>

                    </View>
                    <Card>
                        <Text style={styles.subtitle}>Description:</Text>
                        <Card.Content>
                            <Markdown>
                                {task.description}
                            </Markdown>
                        </Card.Content>
                    </Card>

                    {emptyCommentList ? (
                        <Text style={styles.noTextComment}>No comments yet for this task</Text>
                    ) : (
                        task.comments?.map(comment => (
                            <Card key={comment.id} style={styles.card}>
                                <Card.Content>
                                    <View style={styles.modalCommentaries}>
                                        <Icon source="comment"
                                            color={'white'}
                                            size={18} />
                                        <Paragraph style={styles.headerComment}>{`${formatDate(comment.updatedAt).substring(0, 16)} by ${task.comments?.user?.name}`}</Paragraph>
                                    </View>
                                    <Paragraph>{comment.text}</Paragraph>
                                    <Card.Actions style={styles.commentModal}>
                                        <Button onPress={() => {
                                            setModalComment(true);
                                            setSelectedComment(comment.text);
                                            setSelectedId(comment.id);
                                        }}>Edit</Button>
                                        <Button onPress={() => {
                                            setModalDeleteComment(true);
                                            setSelectedId(comment.id);
                                        }}>Remove</Button>
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
                <Modal visible={modalComment} onDismiss={() => setModalComment(false)} contentContainerStyle={styles.modal}>
                    <Title style={styles.modalTitle}>Edit Comment</Title>

                    <TextInput
                        label="Update Comment"
                        mode="outlined"
                        value={selectedComment}
                        onChangeText={setSelectedComment}
                        style={styles.input}
                        multiline
                    />

                    <Button mode="contained" onPress={handleUpdateComment} style={[styles.createButton, { backgroundColor: "#004aad" }]}>
                        Update Comment
                    </Button>
                </Modal>
            </Portal>

            <Portal>
                <Modal visible={modalEditTask} onDismiss={() => setModalEditTask(false)} contentContainerStyle={styles.modal}>
                    <Title style={styles.modalTitle}>Edit Task</Title>

                    <TextInput
                        label="Update Name Task"
                        mode="outlined"
                        value={selectedTitle}
                        onChangeText={setSelectedTitle}
                    />

                    <TextInput
                        label="Update Description Task"
                        mode="outlined"
                        value={selectedDescription}
                        onChangeText={setSelectedDescription}
                        style={styles.input}
                        multiline
                    />

                    <Button mode="contained" onPress={handleEditTask} style={[styles.createButton, { backgroundColor: "#004aad" }]}>
                        Update Task
                    </Button>
                </Modal>
            </Portal>

            <Portal>
                <Dialog visible={modalDeleteComment} onDismiss={() => setModalDeleteComment(false)}>
                    <Dialog.Icon icon="trash-can" size={35} />
                    <Dialog.Title style={styles.dialog}>Confirmation</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">After deleting a comment, it can`t be undone.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setModalDeleteComment(false)}>Cancel</Button>
                        <Button onPress={handleDeleteComment}>Remove</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Portal>
                <Dialog visible={modalDeleteTask} onDismiss={() => setModalDeleteTask(false)}>
                    <Dialog.Icon icon="trash-can" size={35} />
                    <Dialog.Title style={styles.dialog}>Confirmation</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">After deleting a task, it can`t be undone.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setModalDeleteTask(false)}>Cancel</Button>
                        <Button onPress={handleDeleteTask}>Remove</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

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