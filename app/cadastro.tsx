import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Cadastro() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleCadastro = async () => {
        if (!nome || !email || !cpf || !senha || !confirmarSenha) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        const usuario = {
            nome,
            email,
            cpf,
            senha,
        };

        try {
            await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            router.replace('./home');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar os dados.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput
                placeholder="Nome"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
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
            <TextInput
                placeholder="Senha"
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <TextInput
                placeholder="Confirmar Senha"
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
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
