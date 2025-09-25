import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { createPatio, getPatios, updatePatio } from '../../services/patiosServices';

export default function PatioForm() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const patioId = Array.isArray(id) ? id[0] : id;

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    const carregarPatio = async () => {
      if (!user || !patioId) return;

      const patiosData = await getPatios(user.id);
      const patioSelecionado = patiosData.find((p: any) => p.id === patioId);
      if (patioSelecionado) {
        setNome(patioSelecionado.nome);
        setEndereco(patioSelecionado.endereco);
      }
    };
    carregarPatio();
  }, [patioId, user]);

  const handleSave = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não logado.');
      return;
    }
    if (!nome) {
      Alert.alert('Erro', 'Preencha o nome do pátio.');
      return;
    }

    try {
      if (patioId) {
        await updatePatio(patioId, { nome, endereco });
      } else {
        await createPatio({ nome, endereco }, user.id);
      }
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o pátio.');
      console.error(error);
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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSave}
      >
        <Text style={{ color: theme.text, fontWeight: 'bold' }}>
          {patioId ? 'Atualizar' : 'Adicionar'} Pátio
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  button: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
});
