import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 10
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#004aad",
        marginBottom: 10, 
        marginVertical: 20,
    },
    div: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80
    },
    noTasksText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    logo: {
        width: 180,
        height: 180,
        marginLeft: 35
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    statusIcon: {
        marginBottom: -2,
        margin: 0
    },
    statusComment: {
        marginRight: 0
    },
    statusTask: {
        fontSize: 12,
        marginBotton: 10,
        fontWeight: 'bold', 
        lineHeight:0
    },
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    commentRect:{
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    commentText: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingRight: 10,
    },
    titleTask: {
        fontSize: 14,
        paddingTop: 10,
        fontWeight: 'bold',
        // color: '#004aad',
        textAlign: 'left',
        width: '100%',
        paddingLeft: 8,
        maxHeight: '60',
        paddingRight: 10,
        lineHeight: 0
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    tasksText: {
        fontSize: 16,
    },
    statusContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'column',
        flex: 5,
    },
    card: {
        borderRadius: 12,
        backgroundColor: "#e0defd",
        marginBottom: 12,
    },
    segmentButton: {
        marginBottom: 12
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
        maxHeight: 150,
        height: 140
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
    boldText: {
        fontWeight: "bold",
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});