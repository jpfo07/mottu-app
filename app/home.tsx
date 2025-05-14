// app/home.tsx

import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const motos = [
    { id: '101', status1: 'Disponível', status2: 'Em manutenção' },
    { id: '102', status1: 'Em manutenção', status2: 'Aguardando retirada' },
    { id: '103', status1: 'Disponível', status2: 'Em manutenção' },
    { id: '104', status1: 'Aguardando retirada', status2: 'Aguardando retirada' },
    { id: '105', status1: 'Disponível', status2: 'Em manutenção' },
];

export default function Home() {
    const router = useRouter();

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
                {/* Ícone de menu hamburguer */}
                <TouchableOpacity onPress={() => router.push('/menu')}>
                    <Text style={styles.menu}>☰</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Dashboard</Text>

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
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
    header: {
        backgroundColor: '#005C39',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        alignItems: 'center',
    },
    logo: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    menu: { color: 'white', fontSize: 24 },
    title: { fontSize: 22, fontWeight: 'bold', padding: 16 },
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
