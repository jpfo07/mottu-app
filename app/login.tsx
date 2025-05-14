import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        try {
            const userData = await AsyncStorage.getItem('usuario');

            if (userData) {
                const usuario = JSON.parse(userData);

                if (email === usuario.email && senha === usuario.senha) {
                    Alert.alert('Sucesso', 'Login realizado!');
                    router.replace('/home');
                } else {
                    Alert.alert('Erro', 'Email ou senha incorretos.');
                }
            } else {
                Alert.alert('Erro', 'Nenhum usuário encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao verificar os dados.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOGIN</Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('./cadastro')}>
                <Text style={styles.link}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 32,
        color: '#002C1B',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#F4F4F4',
    },
    button: {
        backgroundColor: '#005C39',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        color: '#005C39',
        textAlign: 'center',
        marginTop: 10,
    },
});
