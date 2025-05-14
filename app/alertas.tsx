import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AlertasScreen = () => {
    const navigation = useNavigation();

    // Exemplo de dados das motos
    const motos = [
        { numero: 101, status: 'disponivel' },
        { numero: 102, status: 'em manutencao' },
        { numero: 103, status: 'fora de operacao' },
    ];

    // Função para definir a cor do status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'disponivel':
                return 'green';
            case 'em manutencao':
                return 'yellow';
            case 'fora de operacao':
                return 'red';
            default:
                return 'gray';
        }
    };

    // Função para definir a legenda com base no status
    const getStatusText = (status: string) => {
        switch (status) {
            case 'disponivel':
                return 'Está disponível!';
            case 'em manutencao':
                return 'Em manutenção';
            case 'fora de operacao':
                return 'Fora de operação';
            default:
                return '';
        }
    };

    return (
        <View style={styles.container}>
            {/* Título e seta */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.arrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Alertas</Text>
            </View>

            {/* Lista de alertas */}
            <ScrollView style={styles.alertsContainer}>
                {motos.map((moto) => (
                    <View key={moto.numero} style={styles.alert}>
                        <View style={[styles.statusCircle, { backgroundColor: getStatusColor(moto.status) }]} />
                        <Text style={styles.alertText}>
                            Moto {moto.numero} - {getStatusText(moto.status)}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    arrow: {
        fontSize: 24,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    alertsContainer: {
        flex: 1,
    },
    alert: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    statusCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    alertText: {
        fontSize: 16,
    },
});

export default AlertasScreen;
