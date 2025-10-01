import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../src/context/ThemeContext';
import { getMotos } from '../../src/services/motosServices';
import { getPatios } from '../../src/services/patiosServices';

export default function DetalhesPatio() {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const patioId = Array.isArray(id) ? id[0] : id;

  const [patio, setPatio] = useState<any>(null);
  const [motos, setMotos] = useState<any[]>([]);

  useEffect(() => {
    const carregarPatio = async () => {
      if (!patioId) return;

      try {
        // Busca todos os pátios e seleciona pelo id
        const patiosData = await getPatios();
        const patioSelecionado = patiosData.find((p: any) => p.id === patioId);
        setPatio(patioSelecionado);

        // Busca todas as motos e filtra pelo pátio
        const motosData = await getMotos();
        const motosDoPatio = motosData.filter((m: any) => m.patio.id === patioId);
        setMotos(motosDoPatio);
      } catch (error: any) {
        console.error('Erro ao carregar pátio ou motos:', error.response?.data || error.message);
      }
    };

    carregarPatio();
  }, [patioId]);

  if (!patio) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text, textAlign: 'center', marginTop: 50 }}>
          Carregando pátio...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: theme.primary, marginBottom: 10 }}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>{patio.nome}</Text>

      <Text style={{ color: theme.text, marginBottom: 12 }}>
        Endereço: {patio.endereco || 'N/A'}
      </Text>

      <Text style={[styles.subtitle, { color: theme.text }]}>Motos no pátio:</Text>

      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/Motos/detalhes-moto?id=${item.id}`)}
          >
            <Text style={{ color: theme.primary, fontSize: 16 }}>
              {item.numero} - {item.status}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
});
