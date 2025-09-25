import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { deleteMoto, getMotos } from '../../services/motosServices';

export default function MotosScreen() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const [motos, setMotos] = useState([]);

  const carregarMotos = async () => {
    if (user) {
      const data = await getMotos(user.id);
      setMotos(data);
    }
  };

  useEffect(() => {
    carregarMotos();
  }, [user]);

  const handleDelete = async (id: string) => {
    await deleteMoto(id);
    carregarMotos();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Minhas Motos</Text>

      <FlatList
        data={motos}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.text }}>{item.modelo}</Text>
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
