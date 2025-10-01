import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../src/context/ThemeContext';
import { UserContext } from '../../src/context/UserContext';
import { deletePatio, getPatios } from '../../src/services/patiosServices';

export default function PatiosList() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [patios, setPatios] = useState([]);
  const [filtro, setFiltro] = useState('');

  const carregarPatios = async () => {
  try {
    const data = await getPatios(); // sem argumentos
    setPatios(data);
  } catch (error: any) {
    console.error('Erro ao carregar pátios:', error.response?.data || error.message);
  }
};


  useEffect(() => {
    carregarPatios();
  }, []);

  const patiosFiltrados = patios.filter((p: any) =>
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    await deletePatio(id);
    carregarPatios();
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.itemContainer, { backgroundColor: theme.card }]}>
      <TouchableOpacity
        onPress={() => router.push(`./Patios/detalhes-patio?id=${item.id}`)}
      >
        <Text style={{ color: theme.text, fontSize: 16 }}>{item.nome}</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => router.push(`./Patios/form?id=${item.id}`)}
        >
          <Text style={{ color: theme.primary, marginRight: 12 }}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={{ color: 'red' }}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        placeholder="Filtrar por nome"
        placeholderTextColor="#888"
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
        value={filtro}
        onChangeText={setFiltro}
      />

      <FlatList
        data={patiosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => router.push('/Patios/form')}
      >
        <Text style={{ color: theme.text, fontWeight: 'bold' }}>Adicionar Pátio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  itemContainer: { padding: 12, borderRadius: 8, marginBottom: 8 },
  actions: { flexDirection: 'row', marginTop: 4 },
  button: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
});
