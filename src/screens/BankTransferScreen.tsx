import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export const BankTransferScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [accNum, setAccNum] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [name, setName] = useState('');

  const handleTransfer = () => {
    if (!accNum || !ifsc || !name) {
        Alert.alert("Error", "Please fill all details");
        return;
    }
    Alert.alert("Success", `Transfer initiated to ${name}`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{t('bank_transfer')}</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>{t('bank_acc')}</Text>
        <TextInput 
            style={styles.input} 
            placeholder="XXXX XXXX XXXX" 
            keyboardType="numeric"
            value={accNum}
            onChangeText={setAccNum}
        />

        <Text style={styles.label}>{t('bank_ifsc')}</Text>
        <TextInput 
            style={styles.input} 
            placeholder="SBIN000XXXX" 
            autoCapitalize="characters"
            value={ifsc}
            onChangeText={setIfsc}
        />

        <Text style={styles.label}>{t('bank_name')}</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Name on Passbook" 
            value={name}
            onChangeText={setName}
        />

        <TouchableOpacity style={styles.btn} onPress={handleTransfer}>
            <Text style={styles.btnText}>{t('send_money')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F7', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 20, marginTop: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 2 },
  label: { fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 16 },
  btn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});