import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { useUser } from '@/context/UserContext'; // Importar el contexto
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CardInfo = () => {
  const { user } = useUser(); // Obtener el usuario del contexto
  const router = useRouter();
  const [cardStates, setCardStates] = useState([
    { id: 1, type: 'Physical Card', cardNumber: '4741 7429 6255 3585', name: `${user.firstName} ${user.lastName}`, expiry: '02/26', blocked: false },
    { id: 2, type: 'Virtual Card', cardNumber: '4741 7429 7757 3354', name: `${user.firstName} ${user.lastName}`, expiry: '02/27', blocked: false },
  ]);

  const handleBlockToggle = (id: number) => {
    setCardStates((prevStates) => {
      return prevStates.map((card) => {
        if (card.id === id) {
          const newBlockedState = !card.blocked;
          Alert.alert(newBlockedState ? 'Tarjeta bloqueada' : 'Tarjeta desbloqueada');
          return { ...card, blocked: newBlockedState };
        }
        return card;
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.dark} />
      </TouchableOpacity>
      <Text style={styles.header}>Debit Cards</Text>
      <Text style={styles.description}>View your available cards. Make purchases with your cards in physical or online stores.</Text>
      {cardStates.map((card) => (
        <View key={card.id} style={styles.cardContainer}>
          <Text style={styles.cardType}>{card.type}</Text>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>{card.cardNumber}</Text>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardExpiry}>Vence {card.expiry}</Text>
          </View>

        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  cardType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    padding: 20,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardExpiry: {
    fontSize: 16,
  },
  blockButton: {
    marginTop: 10,
  },
  blockButtonText: {
    color: Colors.primary,
  },
});

export default CardInfo;
