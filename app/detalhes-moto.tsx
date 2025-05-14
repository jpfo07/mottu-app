import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const mockMotos: Record<string, { statusAtual: string; historico: string[] }> = {
    '101': {
        statusAtual: 'Disponível',
        historico: ['Em manutenção', 'Aguardando retirada'],
    },
    '102': {
        statusAtual: 'Em manutenção',
        historico: ['Disponível', 'Aguardando retirada'],
    },
    '103': {
        statusAtual: 'Aguardando retirada',
        historico: ['Em manutenção', 'Disponível'],
    },
    '104': {
        statusAtual: 'Disponível',
        historico: ['Em manutenção'],
    },
    '105': {
        statusAtual: 'Em manutenção',
        historico: ['Disponível'],
    },
};

export default function DetalhesMoto() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const moto = mockMotos[id as string] || {
        statusAtual: 'Desconhecido',
        historico: [],
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.back}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Moto {id}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Status Atual</Text>
                <Text style={styles.statusAtual}>{moto.statusAtual}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Histórico de Status</Text>
                <FlatList
                    data={moto.historico}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                        <Text style={styles.historicoItem}>• {item}</Text>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    back: {
        fontSize: 16,
        color: '#00B260',
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#005C39',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    statusAtual: {
        fontSize: 16,
        backgroundColor: '#DFF5EC',
        padding: 10,
        borderRadius: 8,
        color: '#005C39',
    },
    historicoItem: {
        fontSize: 16,
        marginBottom: 6,
        color: '#444',
    },
});
