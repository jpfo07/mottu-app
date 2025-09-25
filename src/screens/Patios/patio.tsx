import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';


const motos = [
    { id: '101', status: 'Disponível' },
    { id: '102', status: 'Em manutenção' },
    { id: '103', status: 'Sem operações' },
    { id: '104', status: 'Disponível' },
    { id: '105', status: 'Em manutenção' },
    { id: '106', status: 'Sem operações' },
    { id: '107', status: 'Disponível' },
    { id: '108', status: 'Disponível' },
];

export default function Patio() {
    const router = useRouter();

    const getColor = (status: string) => {
        switch (status) {
            case 'Disponível':
                return '#00B260';
            case 'Em manutenção':
                return '#FFC107';
            case 'Sem operações':
                return '#D32F2F';
            default:
                return '#CCC';
        }
    };

    const renderItem = ({ item }: { item: { id: string; status: string } }) => (
        <TouchableOpacity
            style={[styles.motoBox, { backgroundColor: getColor(item.status) }]}
            onPress={() => router.push(`./detalhes-moto?id=${item.id}`)}
        >
            <Text style={styles.motoText}>{item.id}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/home')}>
                    <Ionicons name="arrow-back" size={30} color="#005C39" />
                </TouchableOpacity>
                <Text style={styles.title}>Pátio de Motos</Text>
            </View>
            <FlatList
                data={motos}
                numColumns={3}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.grid}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#005C39',
        flex: 1,
        textAlign: 'center',
    },
    grid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    motoBox: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    motoText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
