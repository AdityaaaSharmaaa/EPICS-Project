import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RealmContextObj } from '../models/RealmContext';

const { useQuery } = RealmContextObj;

export const MFIScreen = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [borrower, setBorrower] = useState<any>(null);
  
  // Get all transactions to simulate fetching history
  const allTransactions = useQuery('Transaction');

  const handleSearch = () => {
    // 1. Simulate searching for a user (In a real app, this queries the backend)
    if (search.length < 10) {
      Alert.alert("Error", "Enter a valid 10-digit mobile number");
      return;
    }

    // 2. Find transactions for this specific mobile number (Simulated ID '1')
    // In this demo, we assume the searched user has ID '1' for testing purposes
    const userTx = allTransactions.filter((t: any) => t.borrowerId === '1');

    if (userTx.length === 0) {
      Alert.alert("Not Found", "No financial history found for this user.");
      setBorrower(null);
      return;
    }

    // 3. Calculate Statistics
    const totalDebt = userTx.reduce((acc: number, t: any) => t.type === 'credit' ? acc + t.amount : acc, 0);
    const score = 750; // Mock CCS Score

    setBorrower({
      mobile: search,
      score: score,
      totalDebt: totalDebt,
      history: userTx
    });
  };

  const handleOfferLoan = () => {
    Alert.alert("Loan Offer Sent", `A loan proposal of ₹50,000 has been sent to ${borrower.mobile}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('mfi_portal')}</Text>
        <Text style={styles.subtitle}>Lender Vetting Interface</Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput 
          style={styles.input} 
          placeholder={t('search_placeholder')} 
          keyboardType="numeric"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>

      {borrower && (
        <View style={styles.resultContainer}>
          {/* Credit Score Card */}
          <View style={styles.card}>
            <Text style={styles.label}>Community Credit Score</Text>
            <Text style={[styles.bigScore, { color: borrower.score > 700 ? 'green' : 'orange' }]}>
              {borrower.score}
            </Text>
            <Text style={styles.tag}>{borrower.score > 700 ? 'Low Risk' : 'Medium Risk'}</Text>
          </View>

          {/* Sanitized History (Privacy Mode) */}
          <View style={styles.card}>
            <Text style={styles.label}>Sanitized Ledger</Text>
            <Text style={styles.info}>Total Current Debt: ₹{borrower.totalDebt}</Text>
            
            <View style={styles.divider} />
            
            {borrower.history.map((tx: any, index: number) => (
              <View key={index} style={styles.historyRow}>
                <Text style={styles.date}>{new Date(tx.date).toLocaleDateString()}</Text>
                {/* PRIVACY FEATURE: We do NOT show tx.description here */}
                <Text style={styles.sanitizedText}>
                    {tx.type === 'credit' ? 'Credit Taken' : 'Payment Made'}
                </Text>
                <Text style={{fontWeight: 'bold'}}>₹{tx.amount}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.loanBtn} onPress={handleOfferLoan}>
            <Text style={styles.btnText}>Offer Micro-Loan</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  subtitle: { fontSize: 14, color: '#666' },
  searchBox: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 8, marginRight: 10, elevation: 2 },
  searchBtn: { backgroundColor: '#000', padding: 15, borderRadius: 8, justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  resultContainer: { flex: 1 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 15, elevation: 3 },
  label: { fontSize: 16, color: '#666', marginBottom: 5 },
  bigScore: { fontSize: 40, fontWeight: 'bold' },
  tag: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  info: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  date: { color: '#888', fontSize: 12 },
  sanitizedText: { fontStyle: 'italic', color: '#555' },
  loanBtn: { backgroundColor: 'green', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 }
});