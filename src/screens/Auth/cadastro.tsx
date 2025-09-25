import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function Cadastro() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [errors, setErrors] = useState({
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        confirmarSenha: '',
    });

    const formatarCPF = (texto: string) => {
        const numeros = texto.replace(/\D/g, '').slice(0, 11);
        let cpfFormatado = numeros;

        if (numeros.length > 3) cpfFormatado = numeros.slice(0, 3) + '.' + numeros.slice(3);
        if (numeros.length > 6) cpfFormatado = cpfFormatado.slice(0, 7) + '.' + numeros.slice(6);
        if (numeros.length > 9) cpfFormatado = cpfFormatado.slice(0, 11) + '-' + numeros.slice(9);

        return cpfFormatado;
    };

    const validar = () => {
        const novosErros = {
            nome: '',
            email: '',
            cpf: '',
            senha: '',
            confirmarSenha: '',
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const senhaRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
        const cpfNumeros = cpf.replace(/\D/g, '');

        if (!nome.trim()) novosErros.nome = 'Preencha o nome';
        if (!emailRegex.test(email)) novosErros.email = 'Email inválido';
        if (cpfNumeros.length !== 11) novosErros.cpf = 'CPF deve ter 11 números';
        if (!senhaRegex.test(senha)) novosErros.senha = 'Senha fraca (mín. 6, 1 maiúscula, 1 especial)';
        if (senha !== confirmarSenha) novosErros.confirmarSenha = 'As senhas não coincidem';

        setErrors(novosErros);
        return Object.values(novosErros).every(err => err === '');
    };

    const handleCadastro = async () => {
        if (!validar()) return;

        const usuario = {
            nome,
            email,
            cpf: formatarCPF(cpf),
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
                style={[styles.input, errors.nome && styles.inputError]}
                value={nome}
                onChangeText={(text) => {
                    setNome(text);
                    if (errors.nome) setErrors({ ...errors, nome: '' });
                }}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

            <TextInput
                placeholder="Email"
                style={[styles.input, errors.email && styles.inputError]}
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: '' });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
                placeholder="CPF"
                style={[styles.input, errors.cpf && styles.inputError]}
                value={formatarCPF(cpf)}
                onChangeText={(text) => {
                    setCpf(text);
                    if (errors.cpf) setErrors({ ...errors, cpf: '' });
                }}
                keyboardType="numeric"
                maxLength={14}
            />
            {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

            {/* SENHA */}
            <View style={styles.senhaContainer}>
                <TextInput
                    placeholder="Senha"
                    style={[styles.input, styles.senhaInput, errors.senha && styles.inputError]}
                    value={senha}
                    onChangeText={(text) => {
                        setSenha(text);
                        if (errors.senha) setErrors({ ...errors, senha: '' });
                    }}
                    secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                    <Text style={styles.eyeIcon}>{mostrarSenha ? '🚫' : '👁️'}</Text>
                </TouchableOpacity>
            </View>
            {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

            {/* CONFIRMAR SENHA */}
            <View style={styles.senhaContainer}>
                <TextInput
                    placeholder="Confirmar Senha"
                    style={[styles.input, styles.senhaInput, errors.confirmarSenha && styles.inputError]}
                    value={confirmarSenha}
                    onChangeText={(text) => {
                        setConfirmarSenha(text);
                        if (errors.confirmarSenha) setErrors({ ...errors, confirmarSenha: '' });
                    }}
                    secureTextEntry={!mostrarSenha}
                />
            </View>
            {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}

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
        marginBottom: 5,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    senhaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    senhaInput: {
        flex: 1,
        borderWidth: 0,
        marginBottom: 0,
    },
    eyeIcon: {
        paddingHorizontal: 14,
        fontSize: 18,
        color: '#555',
    },
    inputError: {
        borderColor: '#FF5C5C',
    },
    errorText: {
        color: '#FFBABA',
        alignSelf: 'flex-start',
        marginBottom: 10,
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
