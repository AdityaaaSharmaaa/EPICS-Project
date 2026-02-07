import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export const FlashSaleScreen = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy'); // What user is looking for
  const [modalVisible, setModalVisible] = useState(false);
  
  // Mock Data
  const [posts, setPosts] = useState([
    { id: '1', type: 'sell', item: 'Rice Seeds', qty: '50kg', price: '2000', user: 'Ramesh Store' },
    { id: '2', type: 'buy', item: 'Wheat', qty: '100kg', price: '3000', user: 'Mandi Trader' },
  ]);

  // Form State
  const [item, setItem] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');

  const handlePost = () => {
      const newPost = { id: Date.now().toString(), type: activeTab, item, qty, price, user: 'Me' };
      setPosts([newPost, ...posts]);
      setModalVisible(false);
      Alert.alert("Success", "Your listing is live!");
  };

  // Filter: If I am on 'Buy' tab, show me 'Sell' posts (people selling things I want)
  const filteredPosts = posts.filter(p => p.type === (activeTab === 'buy' ? 'sell' : 'buy'));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('flash_sale')}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
            <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, activeTab === 'buy' && styles.activeTab]} onPress={() => setActiveTab('buy')}>
            <Text style={[styles.tabText, activeTab === 'buy' && styles.activeTabText]}>{t('fs_buy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'sell' && styles.activeTab]} onPress={() => setActiveTab('sell')}>
            <Text style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}>{t('fs_sell')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={filteredPosts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.item}</Text>
                    <Text style={styles.cardPrice}>₹{item.price}</Text>
                </View>
                <Text style={styles.cardDetail}>Qty: {item.qty}</Text>
                <Text style={styles.cardUser}>Posted by: {item.user}</Text>
                <TouchableOpacity style={styles.contactBtn} onPress={() => Alert.alert("Contact", `Calling ${item.user}...`)}>
                    <Text style={styles.contactText}>Contact</Text>
                </TouchableOpacity>
            </View>
        )}
      />

      {/* Add Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>New Listing ({activeTab.toUpperCase()})</Text>
                  <TextInput style={styles.input} placeholder={t('fs_item')} value={item} onChangeText={setItem} />
                  <TextInput style={styles.input} placeholder={t('fs_qty')} value={qty} onChangeText={setQty} />
                  <TextInput style={styles.input} placeholder={t('fs_price')} keyboardType="numeric" value={price} onChangeText={setPrice} />
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <TouchableOpacity style={[styles.modalBtn, {backgroundColor: '#ccc'}]} onPress={() => setModalVisible(false)}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalBtn, {backgroundColor: COLORS.primary}]} onPress={handlePost}>
                        <Text style={{color: '#fff'}}>{t('fs_post')}</Text>
                    </TouchableOpacity>
                  </View>
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
  addBtn: { padding: 5 },
  tabs: { flexDirection: 'row', backgroundColor: '#fff', elevation: 2 },
  tab: { flex: 1, padding: 15, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: COLORS.primary },
  tabText: { fontWeight: 'bold', color: '#888' },
  activeTabText: { color: COLORS.primary },
  card: { backgroundColor: '#fff', margin: 10, padding: 15, borderRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: 'green' },
  cardDetail: { color: '#666' },
  cardUser: { fontSize: 12, color: '#aaa', marginTop: 5 },
  contactBtn: { marginTop: 10, backgroundColor: COLORS.primary, padding: 10, borderRadius: 5, alignItems: 'center' },
  contactText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
  modalBtn: { flex: 1, padding: 15, borderRadius: 5, alignItems: 'center' }
});