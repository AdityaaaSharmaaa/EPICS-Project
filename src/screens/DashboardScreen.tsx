import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useTranslation } from 'react-i18next';
import { RealmContextObj } from '../models/RealmContext';
import { calculateScore } from '../utils/ScoreCalculator';
import { ProfileModal } from '../components/ProfileModal';
import { SearchModal } from '../components/SearchModal';

const { useQuery } = RealmContextObj;

export const DashboardScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const transactions = useQuery('Transaction');
  const [refreshing, setRefreshing] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const score = calculateScore(transactions);

  const onRefresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); };

  // --- NAVIGATION MAP ---
  const gotoScan = () => navigation.navigate('Pay', { mode: 'scan' }); // Only Scan
  const gotoOffline = () => navigation.navigate('Pay', { mode: 'code' }); // Only Code
  const gotoContacts = () => navigation.navigate('Contacts'); // New: Pay Phone
  const gotoBank = () => navigation.navigate('BankTransfer'); // New: Bank Form
  const gotoLedger = () => navigation.navigate('Ledger');
  const gotoMFI = () => navigation.navigate('MFI');
  const gotoFlashSale = () => navigation.navigate('FlashSale');
  const gotoSahayata = () => navigation.navigate('Sahayata');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchBar} onPress={() => setSearchVisible(true)}>
          <Feather name="search" size={20} color="#999" />
          <Text style={styles.searchText}>{t('search_placeholder')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBtn} onPress={() => setProfileVisible(true)}>
          <Text style={styles.profileInitials}>U</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.heroSection}>
          <Text style={styles.greeting}>Welcome, User</Text>
          <View style={styles.scoreCard}>
             <View style={styles.scoreCircle}><Text style={styles.scoreVal}>{score}</Text></View>
             <View style={{flex: 1}}>
               <Text style={styles.scoreLabel}>{t('credit_score')}</Text>
               <Text style={styles.scoreMsg}>{score > 700 ? "Excellent Score" : "Keep improving"}</Text>
             </View>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.gridContainer}>
           <TouchableOpacity style={styles.actionBtn} onPress={gotoScan}>
              <View style={styles.iconBox}><Ionicons name="qr-code" size={24} color={COLORS.primary} /></View>
              <Text style={styles.actionText}>{t('scan_qr')}</Text>
           </TouchableOpacity>
           
           <TouchableOpacity style={styles.actionBtn} onPress={gotoContacts}>
              <View style={styles.iconBox}><Feather name="smartphone" size={24} color={COLORS.primary} /></View>
              <Text style={styles.actionText}>{t('pay_phone')}</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.actionBtn} onPress={gotoOffline}>
              <View style={[styles.iconBox, {backgroundColor: '#FFEBEE', borderColor: '#FFCDD2'}]}>
                <Feather name="wifi-off" size={24} color={COLORS.danger} />
              </View>
              <Text style={styles.actionText}>{t('offline_code')}</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.actionBtn} onPress={gotoBank}>
              <View style={styles.iconBox}><Feather name="home" size={24} color={COLORS.primary} /></View>
              <Text style={styles.actionText}>{t('bank_transfer')}</Text>
           </TouchableOpacity>
        </View>

        {/* MARKETPLACE SECTION */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Marketplace</Text>
            <View style={{flexDirection: 'row', gap: 15}}>
                <TouchableOpacity style={[styles.marketCard, {backgroundColor: '#E3F2FD'}]} onPress={gotoFlashSale}>
                    <Feather name="zap" size={24} color={COLORS.primary} />
                    <Text style={styles.marketTitle}>{t('flash_sale')}</Text>
                    <Text style={styles.marketSub}>Buy & Sell Crops</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.marketCard, {backgroundColor: '#FFF3E0'}]} onPress={gotoSahayata}>
                    <Feather name="users" size={24} color={COLORS.accent} />
                    <Text style={styles.marketTitle}>{t('sahayata')}</Text>
                    <Text style={styles.marketSub}>Community Help</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* LEDGER PREVIEW */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>{t('ledger')}</Text>
           <View style={styles.ledgerCard}>
              {transactions.slice(0, 2).map((tx: any) => (
                <View key={tx._id.toString()} style={styles.txItem}>
                   <View style={[styles.txAvatar, { backgroundColor: tx.type === 'credit' ? COLORS.danger : COLORS.success }]}>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>{tx.type === 'credit' ? 'G' : 'R'}</Text>
                   </View>
                   <View style={{flex: 1, marginLeft: 10}}>
                      <Text style={styles.txDesc}>{tx.description || "Unknown"}</Text>
                      <Text style={styles.txDate}>{new Date(tx.date).toLocaleDateString()}</Text>
                   </View>
                   <Text style={[styles.txAmt, { color: tx.type === 'credit' ? COLORS.danger : COLORS.success }]}>
                      ₹{tx.amount}
                   </Text>
                </View>
              ))}
              <TouchableOpacity style={styles.showAllBtn} onPress={gotoLedger}>
                 <Text style={styles.showAllText}>Show History</Text>
                 <Feather name="chevron-right" size={16} color={COLORS.primary} />
              </TouchableOpacity>
           </View>
        </View>

        {/* OFFERS */}
        <View style={[styles.section, {marginBottom: 100}]}>
           <Text style={styles.sectionTitle}>{t('mfi_title')}</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 15, paddingRight: 20}}>
              <TouchableOpacity style={styles.offerCard} onPress={gotoMFI}>
                 <View style={styles.offerIcon}><Feather name="dollar-sign" size={20} color="#fff" /></View>
                 <View><Text style={styles.offerTitle}>₹50,000 Loan</Text><Text style={styles.offerSub}>Pre-approved</Text></View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.offerCard, {backgroundColor: '#FFF8E1', borderColor: '#FFE082'}]} onPress={gotoMFI}>
                 <View style={[styles.offerIcon, {backgroundColor: COLORS.accent}]}><Feather name="trending-up" size={20} color="#fff" /></View>
                 <View><Text style={[styles.offerTitle, {color: '#F57F17'}]}>Kisan Credit</Text><Text style={[styles.offerSub, {color: '#8D6E63'}]}>Apply Now</Text></View>
              </TouchableOpacity>
           </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={gotoScan}>
         <Feather name="plus" size={24} color="#fff" />
         <Text style={styles.fabText}>{t('new_payment')}</Text>
      </TouchableOpacity>

      <ProfileModal visible={profileVisible} onClose={() => setProfileVisible(false)} navigation={navigation} />
      <SearchModal visible={searchVisible} onClose={() => setSearchVisible(false)} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 15, alignItems: 'center', gap: 10, elevation: 2, backgroundColor: '#fff' },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 10, borderRadius: 25, gap: 10, borderWidth: 1, borderColor: '#E0E0E0' },
  searchText: { color: '#999' },
  profileBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  profileInitials: { color: '#fff', fontWeight: 'bold' },
  scrollContent: { paddingBottom: 20 },
  heroSection: { padding: 20, backgroundColor: '#E8EAF6' },
  greeting: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, marginBottom: 15 },
  scoreCard: { backgroundColor: COLORS.primary, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 20, elevation: 5 },
  scoreCircle: { width: 70, height: 70, borderRadius: 35, borderWidth: 4, borderColor: COLORS.accent, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  scoreVal: { color: '#fff', fontWeight: 'bold', fontSize: 24 },
  scoreLabel: { color: '#BBDEFB', textTransform: 'uppercase', fontSize: 10, fontWeight: 'bold' },
  scoreMsg: { color: '#fff', fontSize: 13, marginTop: 4, flexWrap: 'wrap' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 20, justifyContent: 'space-between' },
  actionBtn: { width: '22%', alignItems: 'center', gap: 8 },
  iconBox: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E3F2FD', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#BBDEFB' },
  actionText: { fontSize: 10, color: '#333', textAlign: 'center', fontWeight: '600' },
  section: { paddingHorizontal: 20, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  ledgerCard: { backgroundColor: '#fff', borderRadius: 15, borderWidth: 1, borderColor: '#eee' },
  txItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  txAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  txDesc: { fontWeight: 'bold', color: '#333' },
  txDate: { fontSize: 10, color: '#888' },
  txAmt: { fontWeight: 'bold' },
  showAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, gap: 5 },
  showAllText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 12 },
  marketCard: { flex: 1, padding: 20, borderRadius: 15, alignItems: 'center', gap: 5 },
  marketTitle: { fontWeight: 'bold', fontSize: 16, marginTop: 5 },
  marketSub: { fontSize: 10, color: '#666' },
  offerCard: { width: 150, height: 110, backgroundColor: '#E8F5E9', borderRadius: 15, padding: 15, justifyContent: 'space-between', borderWidth: 1, borderColor: '#C8E6C9' },
  offerIcon: { width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.success, alignItems: 'center', justifyContent: 'center' },
  offerTitle: { fontWeight: 'bold', color: COLORS.success, fontSize: 14 },
  offerSub: { fontSize: 10, color: 'green' },
  fab: { position: 'absolute', bottom: 30, right: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, elevation: 6, gap: 10 },
  fabText: { color: '#fff', fontWeight: 'bold' }
});