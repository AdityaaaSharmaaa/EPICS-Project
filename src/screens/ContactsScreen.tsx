import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const CONTACTS = [
    { id: '1', name: 'Ramesh Store', phone: '+91 98765 11111' },
    { id: '2', name: 'Suresh Kirana', phone: '+91 98765 22222' },
    { id: '3', name: 'Mandi Trader', phone: '+91 98765 33333' },
    { id: '4', name: 'Amit Farmer', phone: '+91 98765 44444' },
];

export const ContactsScreen = ({ navigation }: any) => {
  const handlePay = (name: string) => {
      Alert.alert("Pay", `Paying ${name}`);
      navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Contact</Text>
      <FlatList
        data={CONTACTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handlePay(item.name)}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.phone}>{item.phone}</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#ccc" style={{marginLeft: 'auto'}} />
            </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 20, marginTop: 20 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  phone: { fontSize: 14, color: '#888' }
});