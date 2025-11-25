import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Share } from 'react-native';
import { RealmContextObj, MockRealm } from '../models/RealmContext';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const { useRealm, useQuery } = RealmContextObj;

export const LedgerScreen = () => {
  const { t } = useTranslation();
  const realm = useRealm();
  const [refresh, setRefresh] = useState(0); 
  const transactions = useQuery('Transaction').sorted('date', true);
  
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');

  const addTransaction = (type: 'credit' | 'debit') => {
    if (!amount) return;
    realm.write(() => {
      realm.create('Transaction', {
        _id: new MockRealm.BSON.ObjectId(),
        borrowerId: '1', 
        shopkeeperId: '2',
        amount: parseFloat(amount),
        type: type,
        description: desc,
        date: new Date(),
        isDisputed: false
      });
    });
    setAmount('');
    setDesc('');
  };

  const handleLongPress = (item: any) => {
    Alert.alert(t('dispute'), t('dispute_msg'), [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Flag", 
          style: 'destructive',
          onPress: () => {
            realm.write(() => { item.isDisputed = true; });
            setRefresh(prev => prev + 1);
          }
        }
      ]
    );
  };

  const shareStatement = async () => {
    let message = `*GramSevak Ledger Statement*\n\n`;
    transactions.forEach((t: any) => {
        const symbol = t.type === 'credit' ? '🔴' : '🟢';
        message += `${symbol} ₹${t.amount} - ${t.description || 'Item'} (${new Date(t.date).toLocaleDateString()})\n`;
    });
    try { await Share.share({ message }); } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {/* 1. Header */}
      <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('ledger')}</Text>
          <TouchableOpacity onPress={shareStatement} style={styles.iconBtn}>
              <Ionicons name="share-social" size={24} color={COLORS.primary} />
          </TouchableOpacity>
      </View>

      {/* 2. Input Form */}
      <View style={styles.formCard}>
        <View style={styles.inputRow}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput 
              style={styles.amountInput} 
              placeholder="0" 
              keyboardType="numeric" 
              value={amount}
              onChangeText={setAmount}
            />
        </View>
        <TextInput 
          style={styles.descInput} 
          placeholder="Item Name (e.g. Rice, Seeds)" 
          value={desc}
          onChangeText={setDesc}
        />
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.btn, {backgroundColor: COLORS.danger}]} onPress={() => addTransaction('credit')}>
            <Ionicons name="arrow-up-circle" size={24} color="#fff" />
            <Text style={styles.btnText}>{t('give')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, {backgroundColor: COLORS.success}]} onPress={() => addTransaction('debit')}>
            <Ionicons name="arrow-down-circle" size={24} color="#fff" />
            <Text style={styles.btnText}>{t('receive')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Transaction List */}
      <FlatList
        data={transactions}
        extraData={refresh}
        contentContainerStyle={{ padding: 16 }}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item)} delayLongPress={500} activeOpacity={0.8}>
            <View style={[styles.txCard, item.isDisputed && styles.disputedCard]}>
              <View style={styles.txIconBox}>
                  <Ionicons 
                    name={item.type === 'credit' ? "cart" : "cash"} 
                    size={24} 
                    color={item.type === 'credit' ? COLORS.danger : COLORS.success} 
                  />
              </View>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={styles.txDesc}>{item.description || "Unknown Item"}</Text>
                <Text style={styles.txDate}>{new Date(item.date).toLocaleDateString()}</Text>
                {item.isDisputed && <Text style={styles.disputeTag}>⚠️ {t('flagged')}</Text>}
              </View>
              <Text style={[styles.txAmt, { color: item.type === 'credit' ? COLORS.danger : COLORS.success }]}>
                {item.type === 'credit' ? '-' : '+'} ₹{item.amount}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
      padding: 20, 
      backgroundColor: '#fff', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  iconBtn: { padding: 5 },
  
  // Form Styles
  formCard: { margin: 16, padding: 20, backgroundColor: COLORS.card, borderRadius: 12, elevation: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.border, marginBottom: 15 },
  currencySymbol: { fontSize: 30, color: COLORS.text, fontWeight: 'bold' },
  amountInput: { flex: 1, fontSize: 32, fontWeight: 'bold', color: COLORS.primary, marginLeft: 10 },
  descInput: { fontSize: 16, backgroundColor: COLORS.background, padding: 12, borderRadius: 8, marginBottom: 15 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { flex: 1, flexDirection: 'row', padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginHorizontal: 5 },
  btnText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },

  // List Styles
  txCard: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 15, 
      backgroundColor: COLORS.card, 
      borderRadius: 10, 
      marginBottom: 10,
      elevation: 2 
  },
  disputedCard: { backgroundColor: '#FFEBEE', borderWidth: 1, borderColor: COLORS.danger },
  txIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  txDesc: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  txDate: { color: COLORS.textLight, fontSize: 12 },
  txAmt: { fontSize: 18, fontWeight: 'bold' },
  disputeTag: { color: COLORS.danger, fontWeight: 'bold', fontSize: 12, marginTop: 4 }
});