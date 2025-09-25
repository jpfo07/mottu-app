import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { createMoto, getMotos, updateMoto } from '../../services/motosServices';

export default function MotoForm() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Converte id para string se vier como array
  const motoId = Array.isArray(id) ? id[0] : id;

  const [numero, setNumero] = useState('');
  const [status, setStatus] = useState('');
  const [patioId, setPatioId] = useState('');

  // Carregar dados da moto se estiver editando
  useEffect(() => {
    const carregarMoto = async () => {
      if (!user || !motoId) return;

      if (motoId) {
        const data = await getMotos(user.id);
        const motoSelecionada = data.find((m: any) => m.id === motoId);
        if (motoSelecionada) {
          setNumero(motoSelecionada.numero);
          setStatus(motoSelecionada.status);
          setPatioId(motoSelecionada.patio.id);
        }
      }
    };
    carregarMoto();
  }, [motoId, user]);

  const handleSave = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não logado.');
      return;
    }

    if (!numero || !status || !patioId) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      if (motoId) {
        await updateMoto(motoId, { numero, status, patio: { id: patioId } });
      } else {
        await createMoto({ numero, status, patio: { id: patioId } }, user.id);
      }
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a moto.');
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        placeholder="Número da moto"
        placeholderTextColor="#888"
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
        value={numero}
        onChangeText={setNumero}
      />
      <TextInput
        placeholder="Status"
        placeholderTextColor="#888"
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
        value={status}
        onChangeText={setStatus}
      />
      <TextInput
        placeholder="ID do Pátio"
        placeholderTextColor="#888"
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
        value={patioId}
        onChangeText={setPatioId}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSave}
      >
        <Text style={{ color: theme.text, fontWeight: 'bold' }}>
          {motoId ? 'Atualizar' : 'Adicionar'} Moto
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
