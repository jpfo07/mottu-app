import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState('');
    const [tentouLogin, setTentouLogin] = useState(false); // pra ativar erro visual só depois do submit

    const handleLogin = async () => {
        setTentouLogin(true);
        setErroLogin('');

        if (!email || !senha) {
            setErroLogin('Preencha todos os campos.');
            return;
        }

        try {
            const userData = await AsyncStorage.getItem('usuario');

            if (userData) {
                const usuario = JSON.parse(userData);

                if (email === usuario.email && senha === usuario.senha) {
                    setErroLogin('');
                    router.replace('/home');
                } else {
                    setErroLogin('Email ou senha incorretos.');
                }
            } else {
                setErroLogin('Nenhum usuário encontrado. Crie uma conta.');
            }
        } catch (error) {
            setErroLogin('Erro ao verificar os dados.');
        }
    };

    const inputStyle = (campo: string) => [
        styles.input,
        tentouLogin && (!campo || erroLogin) && styles.inputErro,
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOGIN</Text>

            {erroLogin !== '' && <Text style={styles.erro}>{erroLogin}</Text>}

            <TextInput
                style={inputStyle(email)}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={inputStyle(senha)}
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
    erro: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 12,
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#F4F4F4',
    },
    inputErro: {
        borderColor: 'red',
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
