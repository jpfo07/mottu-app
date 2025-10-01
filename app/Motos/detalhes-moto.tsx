import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../src/context/ThemeContext';
import { getMotos } from '../../src/services/motosServices';

export default function DetalhesMoto() {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [moto, setMoto] = useState<any>(null);

  useEffect(() => {
    const carregarMoto = async () => {
      if (!id) return;

      try {
        const data = await getMotos(); // sem user.id
        const motoSelecionada = data.find((m: any) => m.id === id);
        setMoto(motoSelecionada);
      } catch (error: any) {
        console.error('Erro ao carregar moto:', error.response?.data || error.message);
      }
    };

    carregarMoto();
  }, [id]);

  if (!moto) return <Text>Carregando...</Text>;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: theme.primary, marginBottom: 10 }}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Moto {moto.numero}</Text>
      <Text style={{ color: theme.text, marginBottom: 8 }}>Status: {moto.status}</Text>

      <TouchableOpacity onPress={() => router.push(`/Patios/detalhes-patio?id=${moto.patio.id}`)}>
        <Text style={{ color: theme.primary }}>Ver Pátio: {moto.patio.nome}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
