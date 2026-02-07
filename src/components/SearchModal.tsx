import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

// Mock Data
const CONTACTS = [
  { id: '1', name: "Mandi Trader", phone: "98765...", type: "trader", buying: "Wheat" },
  { id: '2', name: "Ramesh Store", phone: "91234...", type: "merchant" },
  { id: '3', name: "Amit Farmer", phone: "99887...", type: "personal" },
];

export const SearchModal = ({ visible, onClose, navigation }: any) => {
  const [query, setQuery] = useState('');

  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  const handlePay = () => {
    onClose();
    navigation.navigate('Pay');
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}><Feather name="arrow-left" size={24} color="#666" /></TouchableOpacity>
          <TextInput 
            style={styles.input} 
            placeholder="Search contacts..." 
            autoFocus 
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* List */}
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={handlePay}>
              <View style={[styles.avatar, { backgroundColor: item.type === 'trader' ? COLORS.accent : COLORS.primary }]}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
              </View>
              {item.buying ? (
                <View style={styles.flashTag}>
                  <Feather name="zap" size={12} color="green" />
                  <Text style={styles.flashText}>Buying</Text>
                </View>
              ) : (
                <View style={styles.payBtn}>
                    <Text style={styles.payText}>Pay</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', gap: 15, marginTop: 30 },
  input: { flex: 1, fontSize: 18 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f9f9f9', gap: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  phone: { fontSize: 12, color: '#888' },
  flashTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', padding: 5, borderRadius: 8, gap: 4 },
  flashText: { color: 'green', fontSize: 10, fontWeight: 'bold' },
  payBtn: { backgroundColor: '#E3F2FD', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  payText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 12 }
});