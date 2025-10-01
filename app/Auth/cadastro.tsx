import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';
import { ThemeContext } from '../../src/context/ThemeContext';
import { UserContext } from '../../src/context/UserContext';

// Tipos
type ErrorKeys = 'nome' | 'email' | 'cpf' | 'senha' | 'confirmarSenha';

type FormErrors = {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  confirmarSenha: string;
};

export default function CadastroScreen() {
  const { setUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({
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
    const novosErros: FormErrors = { nome: '', email: '', cpf: '', senha: '', confirmarSenha: '' };
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
      id: uuid.v4().toString(),
      nome: nome,
      email,
      cpf: formatarCPF(cpf),
      senha,
    };

    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
      setUser(usuario);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.push('./login'); // Navega para login após cadastro
    } catch {
      Alert.alert('Erro', 'Erro ao salvar os dados.');
    }
  };

  const inputStyle = (campo: ErrorKeys) => [
    styles.input,
    { backgroundColor: theme.card, color: theme.text, borderColor: theme.card },
    errors[campo] && { borderColor: '#FF5C5C' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Cadastro</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#888"
        style={inputStyle('nome')}
        value={nome}
        onChangeText={(text) => { setNome(text); if (errors.nome) setErrors({ ...errors, nome: '' }); }}
      />
      {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={inputStyle('email')}
        value={email}
        onChangeText={(text) => { setEmail(text); if (errors.email) setErrors({ ...errors, email: '' }); }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="CPF"
        placeholderTextColor="#888"
        style={inputStyle('cpf')}
        value={formatarCPF(cpf)}
        onChangeText={(text) => { setCpf(text); if (errors.cpf) setErrors({ ...errors, cpf: '' }); }}
        keyboardType="numeric"
        maxLength={14}
      />
      {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          style={[inputStyle('senha'), styles.senhaInput]}
          value={senha}
          onChangeText={(text) => { setSenha(text); if (errors.senha) setErrors({ ...errors, senha: '' }); }}
          secureTextEntry={!mostrarSenha}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Text style={styles.eyeIcon}>{mostrarSenha ? '🚫' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Confirmar Senha"
          placeholderTextColor="#888"
          style={[inputStyle('confirmarSenha'), styles.senhaInput]}
          value={confirmarSenha}
          onChangeText={(text) => { setConfirmarSenha(text); if (errors.confirmarSenha) setErrors({ ...errors, confirmarSenha: '' }); }}
          secureTextEntry={!mostrarSenha}
        />
      </View>
      {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleCadastro}>
        <Text style={[styles.buttonText, { color: theme.text }]}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30 },
  input: { width: '100%', padding: 14, borderRadius: 8, marginBottom: 5, borderWidth: 1 },
  senhaContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', borderRadius: 8, marginBottom: 5, borderWidth: 1 },
  senhaInput: { flex: 1, borderWidth: 0, marginBottom: 0, padding: 14 },
  eyeIcon: { paddingHorizontal: 14, fontSize: 18, color: '#555' },
  errorText: { color: '#FF5C5C', alignSelf: 'flex-start', marginBottom: 10 },
  button: { paddingVertical: 14, paddingHorizontal: 50, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
});
