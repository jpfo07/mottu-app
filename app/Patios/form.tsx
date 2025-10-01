import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemeContext } from '../../src/context/ThemeContext';
import { createPatio } from '../../src/services/patiosServices';

export default function PatioForm() {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false); // para evitar múltiplos cliques

  const handleSave = async () => {
    if (!nome) {
      Alert.alert('Erro', 'Preencha o nome do pátio.');
      return;
    }

    try {
      setLoading(true);
      const result = await createPatio({ nome, endereco });
      console.log('Pátio criado:', result);
      Alert.alert('Sucesso', 'Pátio criado com sucesso!');
      router.push('/Patios'); // navega para a lista de pátios
    } catch (error: any) {
      console.error('Erro ao criar pátio:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível criar o pátio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        placeholder="Nome do pátio"
        placeholderTextColor="#888"
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Endereço (opcional)"
        placeholderTextColor="#888"
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
        value={endereco}
        onChangeText={setEndereco}
      />

      <Pressable
        onPress={handleSave}
        disabled={loading}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#004D29' : theme.primary },
        ]}
      >
        <Text style={{ color: theme.text, fontWeight: 'bold', textAlign: 'center' }}>
          {loading ? 'Salvando...' : 'Adicionar Pátio'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  button: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
});