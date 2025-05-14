import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Cadastro() {
    const router = useRouter();

    const [apelido, setApelido] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');

    const handleCadastro = async () => {
        if (!apelido || !email || !cpf) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const dadosUsuario = {
            apelido,
            email,
            cpf,
        };

        try {
            await AsyncStorage.setItem('usuario', JSON.stringify(dadosUsuario));
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            router.replace('./home'); // Redireciona para a home
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar os dados.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput
                placeholder="Apelido"
                style={styles.input}
                value={apelido}
                onChangeText={setApelido}
            />

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder="CPF"
                style={styles.input}
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#005C39',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 14,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00B260',
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
