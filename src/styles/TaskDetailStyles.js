import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    loadingIndicator: {
        marginTop: 50,
        alignSelf: "center",
    },
    logo: {
        width: 150,
        height: 150,
        paddingHorizontal: 16,
    },
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
    subtitle: {
        fontSize: 12,
        fontWeight: "bold",
        marginVertical: 20,
        paddingLeft: 12
    },
    titleTask: {
        fontWeight: 700,
        fontSize: 22,
        marginVertical: 20,
        textAlign: 'center'
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
        backgroundColor: "#d0d9e6",
        maxHeight: 150
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 30
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
    headerComment:{
        fontSize: 10
    },
    dialog:{
        textAlign: 'center'
    },
    noTextComment: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 18
    }

});