import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Share } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export const ProfileModal = ({ visible, onClose, navigation }: any) => {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  const handleLogout = () => {
    onClose();
    navigation.replace('Login');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>My Profile</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
              <Feather name="log-out" size={20} color={COLORS.danger} />
            </TouchableOpacity>
          </View>

          {/* User Details */}
          <View style={styles.profileSection}>
            <View style={styles.qrContainer}>
              <Ionicons name="qr-code-outline" size={100} color={COLORS.primary} />
              <Text style={styles.qrText}>BHIM UPI</Text>
            </View>
            <Text style={styles.name}>User Name</Text>
            <TouchableOpacity style={styles.upiTag} onPress={() => setCopied(true)}>
              <Text style={styles.upiText}>user@gramsevak</Text>
              <Feather name={copied ? "check" : "copy"} size={14} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Menu */}
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={toggleLang}>
              <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
                <Feather name="globe" size={20} color={COLORS.accent} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.menuText}>Change Language</Text>
                <Text style={styles.menuSub}>{i18n.language === 'en' ? 'English' : 'हिंदी'}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={[styles.iconBox, { backgroundColor: '#E0F2F1' }]}>
                <Feather name="help-circle" size={20} color="teal" />
              </View>
              <Text style={styles.menuText}>Get Help</Text>
              <Feather name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  card: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, height: '85%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  closeBtn: { padding: 5, backgroundColor: '#f5f5f5', borderRadius: 20 },
  logoutBtn: { padding: 5, backgroundColor: '#FFEBEE', borderRadius: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  profileSection: { alignItems: 'center', marginBottom: 30 },
  qrContainer: { width: 180, height: 180, borderWidth: 2, borderColor: COLORS.primary, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 15, borderStyle: 'dashed' },
  qrText: { fontSize: 10, fontWeight: 'bold', marginTop: 5, color: '#aaa' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  upiTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 15, marginTop: 5, gap: 5 },
  upiText: { color: '#666', fontSize: 14 },
  menu: { gap: 15 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FAFAFA', borderRadius: 15, gap: 15 },
  iconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  menuText: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1 },
  menuSub: { fontSize: 12, color: '#888' }
});