import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../src/context/ThemeContext';
import { UserContext } from '../../src/context/UserContext';

export default function Home() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

  // Carregar foto específica do usuário
  useEffect(() => {
    const carregarFoto = async () => {
      if (!user) return;

      try {
        const foto = await AsyncStorage.getItem(`fotoPerfil_${user.cpf}`);
        if (foto) setFotoPerfil(foto);
      } catch (error) {
        console.error('Erro ao carregar foto do usuário', error);
      }
    };
    carregarFoto();
  }, [user]);

  // Cards de Pátios e Motos
  const cards = [
    {
      id: 'patios',
      titulo: 'Pátios',
      descricao: 'Gerencie os pátios',
      onCreate: () => router.push('/Patios/form'),
      onList: () => router.push('/Patios'),
    },
    {
      id: 'motos',
      titulo: 'Motos',
      descricao: 'Gerencie as motos',
      onCreate: () => router.push('/Motos/form'),
      onList: () => router.push('/Motos/motos'),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <Text style={styles.logo}>Mottu</Text>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* SubHeader */}
      <View style={styles.subHeader}>
        <Text style={[styles.title, { color: theme.text }]}>Dashboard</Text>
        {fotoPerfil && (
          <TouchableOpacity onPress={() => router.push('/Perfil/perfil')}>
            <Image source={{ uri: fotoPerfil }} style={styles.fotoPerfil} />
          </TouchableOpacity>
        )}
      </View>

      {/* Dropdown do menu */}
      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => { setMenuVisible(false); router.push('/Perfil/perfil'); }}>
            <Text style={styles.dropdownItem}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setMenuVisible(false); router.push('/Home/alertas'); }}>
            <Text style={styles.dropdownItem}>Alertas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setMenuVisible(false); router.push('/Patios'); }}>
            <Text style={styles.dropdownItem}>Controle do Pátio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setMenuVisible(false); router.push('/Motos/motos'); }}>
            <Text style={styles.dropdownItem}>Controle de Motos</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Cards */}
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{item.titulo}</Text>
            <Text style={[styles.cardDesc, { color: theme.text }]}>{item.descricao}</Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.primary }]}
                onPress={item.onCreate}
              >
                <Text style={{ color: theme.text }}>Criar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.primary }]}
                onPress={item.onList}
              >
                <Text style={{ color: theme.text }}>Ver Lista</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, position: 'relative' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center', zIndex: 1 },
  logo: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  menu: { color: 'white', fontSize: 24 },
  subHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 12, marginBottom: 8 },
  fotoPerfil: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 22, fontWeight: 'bold' },
  dropdown: { position: 'absolute', top: 100, right: 16, backgroundColor: 'white', borderRadius: 8, elevation: 8, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, zIndex: 999, padding: 8, width: 180 },
  dropdownItem: { padding: 12, fontSize: 16, color: '#005C39', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  list: { paddingHorizontal: 16 },
  card: { padding: 16, borderRadius: 10, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  cardDesc: { fontSize: 14, marginBottom: 8 },
  cardButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { padding: 10, borderRadius: 8, alignItems: 'center', minWidth: 100 },
});
