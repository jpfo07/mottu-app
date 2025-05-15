import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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

type Usuario = {
    nome: string;
    email: string;
    cpf: string;
    senha: string;
};

export default function Perfil() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [foto, setFoto] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [novoNome, setNovoNome] = useState('');
    const [novoEmail, setNovoEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        const carregarDados = async () => {
            const dados = await AsyncStorage.getItem('usuario');
            if (dados) {
                const parsed: Usuario = JSON.parse(dados);
                setUsuario(parsed);
                setNovoNome(parsed.nome);
                setNovoEmail(parsed.email);

                // Carregar foto específica pelo CPF
                const fotoSalva = await AsyncStorage.getItem(`fotoPerfil_${parsed.cpf}`);
                if (fotoSalva) setFoto(fotoSalva);
            }
        };
        carregarDados();
    }, []);

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

        if (!resultado.canceled && resultado.assets.length > 0 && usuario) {
            const uri = resultado.assets[0].uri;
            setFoto(uri);
            // Salvar foto com chave pelo CPF
            await AsyncStorage.setItem(`fotoPerfil_${usuario.cpf}`, uri);
        }
    };

    const salvarEdicao = async () => {
        if (!usuario) return;

        const usuarioAtualizado = {
            ...usuario,
            nome: novoNome,
            email: novoEmail,
        };

        setUsuario(usuarioAtualizado);
        await AsyncStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));

        setModalVisible(false);
    };

    if (!usuario) {
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/home')}>
                    <Text style={styles.arrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Perfil</Text>
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

                <TouchableOpacity onPress={escolherFoto} style={styles.botaoAlterar}>
                    <Text style={styles.textoBotaoAlterar}>Alterar Foto</Text>
                </TouchableOpacity>

                <View style={styles.infoBox}>
                    <Text style={styles.label}>Nome</Text>
                    <Text style={styles.value}>{usuario.nome}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{usuario.email}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.label}>CPF</Text>
                    <Text style={styles.value}>{usuario.cpf}</Text>
                </View>

                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.editButtonText}>Editar Perfil</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Perfil</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={novoNome}
                            onChangeText={setNovoNome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
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
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    arrow: {
        fontSize: 24,
        marginRight: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#005C39',
    },
    fotoContainer: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    foto: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    fotoPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoAlterar: {
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: '#005C39',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    textoBotaoAlterar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    infoBox: {
        marginBottom: 24,
        backgroundColor: '#F0F0F0',
        padding: 16,
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        color: '#777',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loading: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
        marginTop: 50,
    },
    editButton: {
        backgroundColor: '#005C39',
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '85%',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#005C39',
    },
    input: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    cancelButton: {
        padding: 10,
    },
    cancelText: {
        color: '#888',
    },
    saveButton: {
        padding: 10,
    },
    saveText: {
        color: '#005C39',
        fontWeight: 'bold',
    },
});
