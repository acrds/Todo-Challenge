import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#004aad",
        marginBottom: 10
    },
    div: {
        marginLeft: 50,
        marginTop: 40
    },
    logo: {
        width: 250,
        height: 250,
        opacity: 50
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    titleTask: {
        fontWeight: 700,
        marginLeft: 4,
        marginTop: 10
    },
    cardHeader: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    tasksText: {
        fontSize: 16,
    },
    card: {
        borderRadius: 8,
        elevation: 2,
        backgroundColor: "#d0d9e6",
        marginTop: 14
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    modal: {
        backgroundColor: "white",
        padding: 20,
        margin: 16,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: "bold",
        textAlign: 'center'
    },
    suggest: {
        margin: 0,
        padding: 0,
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
        maxHeight: 150
    },
    createButton: {
        marginTop: 20,
    },
    generateButton: {
        marginTop: 20,
    },
    containerButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    loadingIndicator: {
        marginTop: 50,
        alignSelf: "center",
    },
    noTasksText: {
        textAlign: 'center'
    },
    boldText: {
        fontWeight: "bold",
    }
});