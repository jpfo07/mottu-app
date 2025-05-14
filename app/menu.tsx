import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Menu() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Cabeçalho com seta e título */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.arrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Menu</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/perfil')}>
                <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/patio')}>
                <Text style={styles.buttonText}>Pátio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/alertas')}>
                <Text style={styles.buttonText}>Alertas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
                <Text style={styles.buttonText}>Voltar para Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    arrow: {
        fontSize: 24,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#005C39',
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
