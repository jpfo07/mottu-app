import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../src/context/ThemeContext';
import { UserContext } from '../../src/context/UserContext';

// Tipos
type ErrorKeys = 'email' | 'senha';

type FormErrors = {
  email: string;
  senha: string;
};

export default function LoginScreen() {
  const { setUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroLogin, setErroLogin] = useState('');
  const [tentouLogin, setTentouLogin] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({ email: '', senha: '' });

  const validar = () => {
    const novosErros: FormErrors = { email: '', senha: '' };
    if (!email.trim()) novosErros.email = 'Preencha o email';
    if (!senha.trim()) novosErros.senha = 'Preencha a senha';
    setErrors(novosErros);
    return Object.values(novosErros).every(err => err === '');
  };

  const handleLogin = async () => {
    setTentouLogin(true);
    setErroLogin('');
    if (!validar()) return;

    try {
      const userData = await AsyncStorage.getItem('usuario');
      if (userData) {
        const usuario = JSON.parse(userData);
        if (email === usuario.email && senha === usuario.senha) {
          setUser(usuario);
          router.push('../Home/home'); // ← Navega para a Home
        } else {
          setErroLogin('Email ou senha incorretos.');
        }
      } else {
        setErroLogin('Nenhum usuário encontrado. Crie uma conta.');
      }
    } catch {
      setErroLogin('Erro ao verificar os dados.');
    }
  };

  const inputStyle = (campo: ErrorKeys) => [
    styles.input,
    { backgroundColor: theme.card, color: theme.text, borderColor: theme.card },
    tentouLogin && (errors[campo] || erroLogin) && { borderColor: '#FF5C5C' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>LOGIN</Text>

      {erroLogin !== '' && <Text style={styles.erro}>{erroLogin}</Text>}

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#888"
        style={inputStyle('email')}
        value={email}
        onChangeText={(text) => { setEmail(text); if (errors.email) setErrors({ ...errors, email: '' }); }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.erro}>{errors.email}</Text>}

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
      {errors.senha && <Text style={styles.erro}>{errors.senha}</Text>}

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleLogin}>
        <Text style={[styles.buttonText, { color: theme.text }]}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
  senhaContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, marginBottom: 16, backgroundColor: '#fff' },
  senhaInput: { flex: 1, borderWidth: 0, padding: 12 },
  eyeIcon: { paddingHorizontal: 14, fontSize: 18, color: '#555' },
  button: { padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
  erro: { color: '#FF5C5C', textAlign: 'center', marginBottom: 12 },
});