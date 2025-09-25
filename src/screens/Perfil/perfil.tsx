import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { User, UserContext } from '../../context/UserContext';

export default function Perfil() {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const [foto, setFoto] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      if (!user) return;

      setNovoNome(user.nome);
      setNovoEmail(user.email);

      const fotoSalva = await AsyncStorage.getItem(`fotoPerfil_${user.cpf}`);
      if (fotoSalva) setFoto(fotoSalva);
    };
    carregarDados();
  }, [user]);

  // Selecionar foto da galeria
  const escolherFoto = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      alert('Permissão para acessar a galeria é necessária.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0 && user) {
      const uri = resultado.assets[0].uri;
      setFoto(uri);
      await AsyncStorage.setItem(`fotoPerfil_${user.cpf}`, uri);
    }
  };

  const salvarEdicao = async () => {
    if (!user) return;

    const usuarioAtualizado: User = {
      ...user,
      nome: novoNome,
      email: novoEmail,
    };

    setUser(usuarioAtualizado);
    await AsyncStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
    setModalVisible(false);
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.loading, { color: theme.text }]}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('../home')}>
          <Text style={[styles.arrow, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <TouchableOpacity onPress={escolherFoto} style={styles.fotoContainer}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.foto} />
          ) : (
            <View style={styles.fotoPlaceholder}>
              <Text style={{ color: '#888' }}>Selecionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={escolherFoto}
          style={[styles.botaoAlterar, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.textoBotaoAlterar}>Alterar Foto</Text>
        </TouchableOpacity>

        <View style={[styles.infoBox, { backgroundColor: theme.card }]}>
          <Text style={styles.label}>Nome</Text>
          <Text style={[styles.value, { color: theme.text }]}>{user.nome}</Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: theme.card }]}>
          <Text style={styles.label}>Email</Text>
          <Text style={[styles.value, { color: theme.text }]}>{user.email}</Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: theme.card }]}>
          <Text style={styles.label}>CPF</Text>
          <Text style={[styles.value, { color: theme.text }]}>{user.cpf}</Text>
        </View>

        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: theme.primary }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Editar Perfil</Text>

            <TextInput
              style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
              placeholder="Nome"
              placeholderTextColor="#888"
              value={novoNome}
              onChangeText={setNovoNome}
            />
            <TextInput
              style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
              placeholder="Email"
              placeholderTextColor="#888"
              value={novoEmail}
              onChangeText={setNovoEmail}
              keyboardType="email-address"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={salvarEdicao} style={styles.saveButton}>
                <Text style={styles.saveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  arrow: { fontSize: 24, marginRight: 10 },
  title: { fontSize: 28, fontWeight: 'bold' },
  fotoContainer: { alignSelf: 'center', marginBottom: 10 },
  foto: { width: 120, height: 120, borderRadius: 60 },
  fotoPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  botaoAlterar: { marginTop: 10, alignSelf: 'center', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 6 },
  textoBotaoAlterar: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  infoBox: { marginBottom: 24, padding: 16, borderRadius: 10 },
  label: { fontSize: 16, color: '#777' },
  value: { fontSize: 18, fontWeight: 'bold' },
  loading: { fontSize: 18, color: '#999', textAlign: 'center', marginTop: 50 },
  editButton: { padding: 14, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  editButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, backgroundColor: '#00000088', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { padding: 10, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ccc' },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  cancelButton: { padding: 10 },
  cancelText: { color: '#888' },
  saveButton: { padding: 10 },
  saveText: { color: '#005C39', fontWeight: 'bold' },
});
