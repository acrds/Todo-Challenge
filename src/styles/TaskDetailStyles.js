import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    loadingIndicator: {
        marginTop: 50,
        alignSelf: "center",
    },
    logo: {
        width: 150,
        height: 150,
        width: '100%',
        textAlign: 'right', 
        transform: [{ rotate: '20deg'}]
    },
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 8
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    loadingIndicator: {
        marginTop: 50,
        alignSelf: "center",
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "bold",
        marginVertical: 20,
        paddingLeft: 12
    },
    titleTask: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 20,
        marginBottom: 16,
        color: "#004aad",
    },
    div: {
        marginLeft: 50,
        marginTop: 40
    },
    card: {
        marginTop: 16,
        marginLeft: 40,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: "#c2c2c2",
        maxHeight: 150
    },
    cardHeader: {
        flexDirection: "row",
        flex: 1,
        marginBottom: 6
    },
    containerHeaderLeft: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingTop: 6,
        paddingBottom: 6

    },
    containerHeaderRight: {
        flex: 1,
    },
    viewButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        textAlign: 'stretch',
    },
    modalCommentaries: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'flex-start'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#004aad",
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
    input: {
        marginBottom: 16,
        maxHeight: 150
    },
    createButton: {
        marginTop: 20,
    },
    status: {
        marginStart: 190,
    },
    headerComment: {
        fontSize: 10,
        paddingLeft: 4,
    },
    dialog: {
        textAlign: 'center'
    },
    noTextComment: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 18
    },
    desc: {
        fontSize: 12
    },
    buttonEditRemove: {
        color: 'white'
    },
    dates: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'left',
        margin: 6,
        paddingLeft: 4,
        color: "gray"
    }, 
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',    
    },
});