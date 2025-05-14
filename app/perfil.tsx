import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Usuario = {
    apelido: string;
    email: string;
    cpf: string;
};

export default function Perfil() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const carregarDados = async () => {
            const dados = await AsyncStorage.getItem('usuario');
            if (dados) {
                setUsuario(JSON.parse(dados));
            }
        };
        carregarDados();
    }, []);

    if (!usuario) {
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Nome</Text>
                <Text style={styles.value}>{usuario.apelido}</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{usuario.email}</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>CPF</Text>
                <Text style={styles.value}>{usuario.cpf}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#005C39',
        marginBottom: 30,
        textAlign: 'center',
    },
    infoBox: {
        marginBottom: 24,
        backgroundColor: '#F0F0F0',
        padding: 16,
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        color: '#777',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    loading: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 100,
    },
});
