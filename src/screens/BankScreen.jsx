import React, { useState } from 'react';
import { Surface, Text, Button } from 'react-native-paper';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth'; 
import app from '../config/firebase'; 

const auth = getAuth(app); 

export default function BankScreen({ navigation }) {
  const [balance, setBalance] = useState(1356.00); 
  const [creditCardBalance, setCreditCardBalance] = useState(1094.80); 
  const [creditCardLimit, setCreditCardLimit] = useState(730.00); 
  const [depositAmount, setDepositAmount] = useState(''); 
  const [withdrawAmount, setWithdrawAmount] = useState(''); 

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      setBalance(balance + amount);
      setDepositAmount('');
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      setWithdrawAmount('');
    }
  };

  return (
    <Surface style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi,</Text>
          <Text style={styles.balance}>R$ {balance.toFixed(2)}</Text>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <TouchableOpacity style={styles.sendButton}>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
          </TouchableOpacity>
        </View>


        {/* Botões de Ação */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("PixScreen")}>
            <MaterialCommunityIcons name="bank-transfer" size={28} color="#fff" />
            <Text style={styles.actionButtonLabel}>Área Pix</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("ScannerScreen")}>
            <MaterialCommunityIcons name="barcode" size={28} color="#fff" />
            <Text style={styles.actionButtonLabel}>Pagar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("TransferirScreen")}>
            <MaterialCommunityIcons name="arrow-right-bold" size={28} color="#fff" />
            <Text style={styles.actionButtonLabel}>Transferir</Text>
          </TouchableOpacity>
        </View>

        {/* Cartão de Crédito */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardLabel}>Cartão de crédito</Text>
          <Text style={styles.cardBalance}>Fatura atual</Text>
          <Text style={styles.cardAmount}>R$ {creditCardBalance.toFixed(2)}</Text>
          <Text style={styles.cardLimit}>Limite disponível: R$ {creditCardLimit.toFixed(2)}</Text>
        </View>
      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Button
          onPress={() => navigation.navigate("EventsScreen")}
          mode="contained"
          style={styles.footerButton}
        >
          <MaterialCommunityIcons name="calendar" size={24} color="#8a2be2" />
        </Button>

        <Button
          onPress={() => navigation.navigate("HomeScreen")}
          mode="contained"
          style={styles.footerButton}
        >
          <MaterialCommunityIcons name="home" size={24} color="#8a2be2" />
        </Button>

        <Button
          onPress={() => navigation.navigate("BankScreen")}
          mode="contained"
          style={styles.footerButton}
        >
          <MaterialCommunityIcons name="bank" size={24} color="#8a2be2" />
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#a767c6',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
  },
  greeting: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  balance: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  balanceLabel: {
    color: '#e0e0e0',
    fontSize: 14,
  },
  sendButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#a767c6',
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: '#a767c6',
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  cardContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardLabel: {
    color: '#444',
    fontSize: 16,
    marginBottom: 5,
  },
  cardBalance: {
    color: '#444',
    fontSize: 14,
  },
  cardAmount: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardLimit: {
    color: '#444',
    fontSize: 14,
    marginTop: 5,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  footerButton: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flex: 1,
    marginHorizontal: 5,
  },
});
