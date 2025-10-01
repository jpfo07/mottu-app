import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../src/context/ThemeContext';
import { createMoto, getMotos, updateMoto } from '../../src/services/motosServices';
import { getPatios } from '../../src/services/patiosServices';

export default function MotoForm() {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const motoId = Array.isArray(id) ? id[0] : id;

  const [numero, setNumero] = useState('');
  const [status, setStatus] = useState('');
  const [patioId, setPatioId] = useState<number | undefined>(undefined);
  const [patios, setPatios] = useState<{ id: number; nome: string }[]>([]);

  // Carrega a lista de pátios para o dropdown
  useEffect(() => {
    const carregarPatios = async () => {
      try {
        const patiosData = await getPatios();
        setPatios(patiosData);
      } catch (error: any) {
        console.error('Erro ao carregar pátios:', error.response?.data || error.message);
      }
    };
    carregarPatios();
  }, []);

  // Carrega dados da moto se estiver editando
  useEffect(() => {
    const carregarMoto = async () => {
      if (!motoId) return;

      try {
        const data = await getMotos();
        const motoSelecionada = data.find((m: any) => m.id === motoId);
        if (motoSelecionada) {
          setNumero(motoSelecionada.numero);
          setStatus(motoSelecionada.status);
          setPatioId(Number(motoSelecionada.patio.id));
        }
      } catch (error: any) {
        console.error('Erro ao carregar moto:', error.response?.data || error.message);
      }
    };
    carregarMoto();
  }, [motoId]);

  const handleSave = async () => {
    if (!numero || !status || patioId === undefined) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const payload = {
        numero,
        status,
        patio: { id: patioId.toString() }, // converte number para string
      };
      if (motoId) {
        await updateMoto(motoId, payload);
      } else {
        await createMoto(payload);
      }
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível salvar a moto.');
      console.error(error.response?.data || error.message);
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

      {/* Dropdown de pátios */}
      <View style={[styles.input, { backgroundColor: theme.card, justifyContent: 'center' }]}>
        {Platform.OS === 'ios' ? (
          <Text style={{ color: theme.text }}>
            {patioId ? patios.find(p => p.id === patioId)?.nome : 'Selecione o Pátio'}
          </Text>
        ) : (
          <Picker
            selectedValue={patioId}
            onValueChange={(itemValue: number | undefined) => setPatioId(itemValue)}
            style={{ color: theme.text }}
          >
            <Picker.Item label="Selecione o Pátio" value={undefined} />
            {patios.map((p) => (
              <Picker.Item key={p.id} label={p.nome} value={p.id} />
            ))}
          </Picker>
        )}
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSave}>
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
