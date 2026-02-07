import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export const SahayataScreen = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  
  const [requests, setRequests] = useState([
    { id: '1', user: 'Amit Farmer', amount: '10000', reason: 'Buy Seeds', interest: true },
    { id: '2', user: 'Vijay Villager', amount: '5000', reason: 'Medical', interest: false },
  ]);

  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleRequest = () => {
      const newReq = { id: Date.now().toString(), user: 'Me', amount, reason, interest: false };
      setRequests([newReq, ...requests]);
      setModalVisible(false);
      Alert.alert("Success", "Request posted to community.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('sahayata')}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.addText}>+ {t('sahayata_req')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={requests}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.avatar}><Text style={{color:'#fff', fontWeight:'bold'}}>{item.user.charAt(0)}</Text></View>
                    <View>
                        <Text style={styles.userName}>{item.user}</Text>
                        <Text style={styles.reason}>{item.reason}</Text>
                    </View>
                    <Text style={styles.amount}>₹{item.amount}</Text>
                </View>
                {item.interest && <Text style={styles.badge}>Interest Willing</Text>}
                <TouchableOpacity style={styles.helpBtn} onPress={() => Alert.alert("Connect", "Connecting with borrower...")}>
                    <Text style={styles.helpText}>{t('sahayata_lend')}</Text>
                </TouchableOpacity>
            </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Request Help</Text>
                  <TextInput style={styles.input} placeholder={t('sahayata_amt')} keyboardType="numeric" value={amount} onChangeText={setAmount} />
                  <TextInput style={styles.input} placeholder={t('sahayata_reason')} value={reason} onChangeText={setReason} />
                  <TouchableOpacity style={[styles.modalBtn, {backgroundColor: COLORS.primary}]} onPress={handleRequest}>
                      <Text style={{color: '#fff'}}>Post Request</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginTop: 15, alignSelf: 'center'}} onPress={() => setModalVisible(false)}>
                      <Text style={{color: '#666'}}>Cancel</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, paddingTop: 50, backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  addBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  addText: { fontWeight: 'bold', color: '#333', fontSize: 12 },
  card: { backgroundColor: '#fff', margin: 10, padding: 15, borderRadius: 10, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  userName: { fontWeight: 'bold', fontSize: 16 },
  reason: { color: '#666', fontSize: 12 },
  amount: { marginLeft: 'auto', fontSize: 18, fontWeight: 'bold', color: COLORS.danger },
  badge: { backgroundColor: '#E8F5E9', color: 'green', padding: 5, fontSize: 10, alignSelf: 'flex-start', borderRadius: 5, marginBottom: 10 },
  helpBtn: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 8, alignItems: 'center' },
  helpText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
  modalBtn: { padding: 15, borderRadius: 5, alignItems: 'center' }
});