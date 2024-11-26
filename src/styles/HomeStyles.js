import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    loadingIndicator: {
        marginTop: 50,
        alignSelf: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
    },
    titleProject: {
        fontWeight: 700
    },
    div: {
        marginLeft: 50,
        marginTop: 40
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center'
    },
    logo: {
        width: 200,
        height: 200,
    },
    card: {
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: "#d0d9e6"
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itensHeader:{
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
    },
    createButton: {
        marginTop: 20,
    },
});