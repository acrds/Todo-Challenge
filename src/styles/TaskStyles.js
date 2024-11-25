import { StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
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
    titleTask: {
        fontWeight: 700,
    },
    tasksText: {
      fontSize: 16,
    },
    card: {
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: "#8bbaf8",
        marginTop: 14
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        padding:0,
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
    },
    createButton: {
        marginTop: 20,
    },
    generateButton:{
        marginTop: 20,
    },
    containerButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
  });