import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const motos = [
    { id: '101', status1: 'Disponível', status2: 'Em manutenção' },
    { id: '102', status1: 'Em manutenção', status2: 'Aguardando retirada' },
    { id: '103', status1: 'Disponível', status2: 'Em manutenção' },
    { id: '104', status1: 'Aguardando retirada', status2: 'Aguardando retirada' },
    { id: '105', status1: 'Disponível', status2: 'Em manutenção' },
];

export default function Home() {
    const router = useRouter();
    const [menuVisible, setMenuVisible] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

    useEffect(() => {
        const carregarFoto = async () => {
            const foto = await AsyncStorage.getItem('fotoPerfil');
            if (foto) setFotoPerfil(foto);
        };
        carregarFoto();
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`./detalhes-moto?id=${item.id}`)}
        >
            <Text style={styles.motoTitle}>Moto {item.id}</Text>
            <View style={styles.statusWrapper}>
                <Text style={styles.statusText}>{item.status1}</Text>
                <Text style={styles.arrow}>›</Text>
            </View>
            <Text style={styles.statusSub}>{item.status2}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Mottu</Text>
                <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                    <Text style={styles.menu}>☰</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.subHeader}>
                <Text style={styles.title}>Dashboard</Text>
                {fotoPerfil && (
                    <TouchableOpacity onPress={() => router.push('./perfil')}>
                        <Image source={{ uri: fotoPerfil }} style={styles.fotoPerfil} />
                    </TouchableOpacity>
                )}
            </View>
            {menuVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity
                        onPress={() => {
                            setMenuVisible(false);
                            router.push('./perfil');
                        }}
                    >
                        <Text style={styles.dropdownItem}>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setMenuVisible(false);
                            router.push('./alertas');
                        }}
                    >
                        <Text style={styles.dropdownItem}>Alertas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setMenuVisible(false);
                            router.push('./patio');
                        }}
                    >
                        <Text style={styles.dropdownItem}>Controle do Pátio</Text>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
                data={motos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        position: 'relative',
    },
    header: {
        backgroundColor: '#005C39',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        alignItems: 'center',
        zIndex: 1,
    },
    logo: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    menu: { color: 'white', fontSize: 24 },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 12,
        marginBottom: 8,
    },
    fotoPerfil: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dropdown: {
        position: 'absolute',
        top: 100,
        right: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        zIndex: 999,
        padding: 8,
        width: 180,
    },
    dropdownItem: {
        padding: 12,
        fontSize: 16,
        color: '#005C39',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: { fontSize: 22, fontWeight: 'bold' },
    list: { paddingHorizontal: 16 },
    card: {
        backgroundColor: '#F4F4F4',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
    },
    motoTitle: { fontSize: 18, fontWeight: '600' },
    statusWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    statusText: { color: '#555' },
    arrow: { fontSize: 20, color: '#888' },
    statusSub: { color: '#888', marginTop: 2 },
});
