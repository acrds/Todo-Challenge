import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 10
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    loadingIndicator: {
        marginTop: 50,
        alignSelf: "center",
        color: "#004aad"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        color: "#004aad"
    },
    titleProject: {
        fontWeight: 'bold',
        fontSize: 16
    },
    div: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    logo: {
        width: 180,
        height: 180,
    },
    card: {
        borderRadius: 12,
        backgroundColor: "#e0defd",
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: 'column',
    },
    titleContainer: {
        flexDirection: 'row',
    },
    contentTitleLeft: {
        flex: 5,
        justifyContent: 'center',
        padding: 10
    },
    contentTitleRight: {
        flex: 1,
        alignItems: "center",
    },
    descriptionContainer: {
        flexDirection: 'row',
        padding: 10,
        height: 60
    },
    footterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 8
    },
    itensHeader: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
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
        height: 140
    },
    createButton: {
        marginTop: 20,
    },
    dialog: {
        textAlign: 'center',
    },
    footterText: {
        fontWeight: 'bold', 
        fontSize: 10
    },
    footterTask:{
        fontWeight: 'bold', 
        fontSize: 14, 
        paddingBottom: 8,
        paddingRight: 8
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
