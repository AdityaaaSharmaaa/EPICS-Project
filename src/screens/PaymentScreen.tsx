import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../theme/colors';

export const PaymentScreen = ({ route }: any) => {
  const { t } = useTranslation();
  // Read params to determine which tab to open first
  const initialMode = route.params?.mode || 'scan';
  const [mode, setMode] = useState<'scan' | 'code'>(initialMode);
  
  const [offlineCode, setOfflineCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setMode(initialMode);
  }, [initialMode]);

  const generateCode = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const code = `OFF-${random}-PAY`;
    setOfflineCode(code);
  };

  const simulateScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Payment of ₹500 Verified!");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.tab, mode === 'scan' && styles.activeTab]} onPress={() => setMode('scan')}>
          <Text style={[styles.tabText, mode === 'scan' && styles.activeTabText]}>{t('scan_qr')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, mode === 'code' && styles.activeTab]} onPress={() => setMode('code')}>
          <Text style={[styles.tabText, mode === 'code' && styles.activeTabText]}>{t('offline_code')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {mode === 'scan' ? (
          <View style={styles.scannerBox}>
            <View style={styles.cameraPlaceholder}>
                {loading ? <ActivityIndicator size="large" color="#00ff00" /> : <Text style={{fontSize: 50}}>📷</Text>}
                <Text style={{marginTop: 20, color: '#fff'}}>Align QR Code</Text>
            </View>
            <TouchableOpacity style={styles.actionBtn} onPress={simulateScan}>
                <Text style={styles.btnText}>Simulate Scan</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.codeBox}>
            <Text style={styles.label}>No Internet?</Text>
            <Text style={styles.subLabel}>Show this code to shopkeeper</Text>
            {offlineCode ? <Text style={styles.generatedCode}>{offlineCode}</Text> : <View style={styles.placeholderCode} />}
            <TouchableOpacity style={[styles.actionBtn, {backgroundColor: COLORS.danger}]} onPress={generateCode}>
                <Text style={styles.btnText}>Generate Secure Code</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', backgroundColor: '#fff', elevation: 2, paddingTop: 40 },
  tab: { flex: 1, padding: 15, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: COLORS.primary },
  tabText: { fontSize: 16, color: '#666', fontWeight: 'bold' },
  activeTabText: { color: COLORS.primary },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  scannerBox: { alignItems: 'center' },
  cameraPlaceholder: { width: 300, height: 300, backgroundColor: '#333', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  actionBtn: { backgroundColor: COLORS.primary, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  codeBox: { alignItems: 'center', backgroundColor: '#fff', padding: 30, borderRadius: 20, elevation: 3 },
  label: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subLabel: { color: '#666', marginBottom: 30, textAlign: 'center' },
  generatedCode: { fontSize: 32, fontWeight: 'bold', letterSpacing: 2, color: COLORS.danger, marginBottom: 30, padding: 10, borderWidth: 2, borderColor: COLORS.danger, borderStyle: 'dashed', borderRadius: 10 },
  placeholderCode: { height: 60, marginBottom: 30 }
});