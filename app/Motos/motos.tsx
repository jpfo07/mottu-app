import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../src/context/ThemeContext';
import { deleteMoto, getMotos } from '../../src/services/motosServices';

export default function MotosScreen() {
  const { theme } = useContext(ThemeContext);
  const [motos, setMotos] = useState([]);

  const carregarMotos = async () => {
    try {
      const data = await getMotos(); // sem user.id
      setMotos(data);
    } catch (error: any) {
      console.error('Erro ao carregar motos:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    carregarMotos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteMoto(id);
      carregarMotos();
    } catch (error: any) {
      console.error('Erro ao deletar moto:', error.response?.data || error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Minhas Motos</Text>

      <FlatList
        data={motos}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.text }}>{item.numero}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{ color: 'red' }}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 12, borderRadius: 8, marginBottom: 8 },
});
