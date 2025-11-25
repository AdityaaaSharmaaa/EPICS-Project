import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { RealmContextObj } from '../models/RealmContext';
import { useTranslation } from 'react-i18next';
import { useNetInfo } from '@react-native-community/netinfo';
import { calculateScore } from '../utils/ScoreCalculator';
import { COLORS } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const { useQuery } = RealmContextObj;

export const DashboardScreen = () => {
  const { t, i18n } = useTranslation();
  const netInfo = useNetInfo();
  
  const transactions = useQuery('Transaction');
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const totalDebt = transactions.reduce((sum: number, t: any) => 
    t.type === 'credit' ? sum + t.amount : sum, 0
  );
  
  const dynamicScore = calculateScore(transactions);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => { setKey(k => k + 1); setRefreshing(false); }, 1000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* 1. Top Bar (Brand Color) */}
      <View style={styles.topHeader}>
        <View>
            <Text style={styles.appName}>GramSevak</Text>
            <Text style={styles.greeting}>{t('welcome')}, User</Text>
        </View>
        <TouchableOpacity style={styles.langBtn} onPress={toggleLanguage}>
            <Ionicons name="language" size={20} color={COLORS.primary} />
            <Text style={styles.langText}>{i18n.language === 'en' ? 'हिंदी' : 'Eng'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {!netInfo.isConnected && (
            <View style={styles.offlineBanner}>
                <Ionicons name="cloud-offline" size={20} color="#fff" />
                <Text style={styles.offlineText}>{t('offline')}</Text>
            </View>
        )}

        {/* 2. Hero Card (Credit Score) */}
        <View style={styles.heroCard}>
            <View style={styles.scoreCircle}>
                <Text style={styles.scoreLabel}>{t('credit_score')}</Text>
                <Text style={[styles.scoreValue, { color: dynamicScore > 700 ? COLORS.success : COLORS.warning }]}>
                    {dynamicScore}
                </Text>
            </View>
            <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>Trust Level</Text>
                <Text style={styles.heroSubtitle}>
                    {dynamicScore > 700 ? "Excellent! Banks trust you." : "Keep paying on time to improve."}
                </Text>
            </View>
        </View>

        {/* 3. Stats Grid */}
        <View style={styles.gridContainer}>
            <View style={[styles.statCard, { borderLeftColor: COLORS.danger, borderLeftWidth: 5 }]}>
                <Ionicons name="trending-down" size={24} color={COLORS.danger} />
                <Text style={styles.statLabel}>{t('balance')}</Text>
                <Text style={styles.statValue}>₹ {totalDebt}</Text>
            </View>
            
            <View style={[styles.statCard, { borderLeftColor: COLORS.success, borderLeftWidth: 5 }]}>
                <Ionicons name="trending-up" size={24} color={COLORS.success} />
                <Text style={styles.statLabel}>Transactions</Text>
                <Text style={styles.statValue}>{transactions.length}</Text>
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: COLORS.background },
  topHeader: { 
      backgroundColor: COLORS.primary, 
      paddingTop: 50, 
      paddingBottom: 25, 
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  appName: { color: COLORS.accent, fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase' },
  greeting: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  langBtn: { 
      backgroundColor: '#fff', 
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 8, 
      borderRadius: 20,
      elevation: 5
  },
  langText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
  scrollContent: { padding: 16 },
  offlineBanner: { backgroundColor: COLORS.danger, padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 15 },
  offlineText: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },
  
  // Hero Card
  heroCard: { 
      backgroundColor: COLORS.card, 
      borderRadius: 15, 
      padding: 20, 
      flexDirection: 'row', 
      alignItems: 'center', 
      elevation: 4, 
      marginBottom: 20 
  },
  scoreCircle: { 
      width: 100, 
      height: 100, 
      borderRadius: 50, 
      borderWidth: 5, 
      borderColor: COLORS.background, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#FAFAFA'
  },
  scoreLabel: { fontSize: 10, color: COLORS.textLight, textTransform: 'uppercase' },
  scoreValue: { fontSize: 28, fontWeight: 'bold' },
  heroTextContainer: { flex: 1, marginLeft: 20 },
  heroTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  heroSubtitle: { fontSize: 14, color: COLORS.textLight, marginTop: 5 },

  // Stats Grid
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: { 
      backgroundColor: COLORS.card, 
      width: '48%', 
      padding: 15, 
      borderRadius: 10, 
      elevation: 2 
  },
  statLabel: { fontSize: 14, color: COLORS.textLight, marginTop: 5 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginTop: 5 }
});