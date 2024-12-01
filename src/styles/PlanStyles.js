import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 10
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        color: "#004aad",
        textAlign: 'left'
    },
    loadingIndicator: {
        marginTop: 50,
        alignSelf: "center",
        color: "#004aad"
    },
    div: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    logo: {
        width: 180,
        height: 180,
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
        zIndex: 5
    },
    taskName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#004aad',
        flex: 5, 
        paddingBottom: 2
    },
    subtitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 16,
        paddingTop: 18
    },
    descriptionDay: {
        textAlign: 'left',
        fontSize: 14,
        paddingHorizontal: 16,
    },
    areaCard: {
        flexDirection: 'row',
        padding: 2,
        alignItems: 'baseline'
    },
    card: {
        margin: 8,
        backgroundColor: '#f0f0f0'
    },
    iconTask: {
        flex: 1
    },
    descriptionScreen: {
        paddingBottom: 8
    },
    loadingText: {
        color: '#004aad',
        fontWeight: 'bold',
        zIndex: 6,
    },

});