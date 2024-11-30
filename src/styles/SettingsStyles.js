import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#f5f5f5",
      paddingHorizontal: 16,

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        color: "#004aad"
    },
    avatar: {
      backgroundColor: '#0056d2',
      marginBottom: 16,
      alignSelf: 'center'
    },
    subtitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 32,
      textAlign: 'center'
    },
    section: {
      width: '100%',
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#0056d2',
      marginBottom: 16,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    optionText: {
      fontSize: 16,
    },
  });