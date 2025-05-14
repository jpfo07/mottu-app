import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mottu</Text>

            <View style={styles.messageBox}>
                <Text style={styles.message}>
                    Comece agora e tenha suas motos sempre sob seu comando.
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('./login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('./cadastro')}>
                <Text style={styles.buttonText}>Cadastro</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#005C39', // Verde escuro
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    messageBox: {
        backgroundColor: '#2E7B5B', // Verde médio transparente
        padding: 20,
        borderRadius: 10,
        marginBottom: 40,
    },
    message: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#00B260', // Verde claro
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
