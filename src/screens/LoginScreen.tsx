import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export const LoginScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const [inputMode, setInputMode] = useState<'none' | 'phone'>('none');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        navigation.replace('Pin');
    }, 1500);
  };

  const handlePhoneLogin = () => {
    if (inputMode === 'none') {
        setInputMode('phone');
    } else {
        if(phone.length < 10) {
            Alert.alert("Error", "Please enter a valid number");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace('Pin'); // Go to PIN after "OTP"
        }, 1500);
    }
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  if (loading) {
      return (
          <View style={styles.containerCenter}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={{marginTop: 10}}>Verifying Securely...</Text>
          </View>
      );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.langBtn} onPress={toggleLang}>
        <Feather name="globe" size={14} color={COLORS.primary} />
        <Text style={styles.langText}>{i18n.language === 'en' ? 'Eng' : 'हिंदी'}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Feather name="shield" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>{t('welcome')}</Text>
        <Text style={styles.subtitle}>Your Digital Financial Companion</Text>

        <View style={styles.btnContainer}>
          {inputMode === 'none' && (
             <TouchableOpacity style={[styles.btn, styles.googleBtn]} onPress={handleGoogleLogin}>
                <View style={styles.gIcon}><Text style={styles.gText}>G</Text></View>
                <Text style={styles.btnTextGoogle}>Continue with Google</Text>
             </TouchableOpacity>
          )}

          {inputMode === 'phone' && (
             <TextInput 
                style={styles.input}
                placeholder="Enter Mobile Number"
                keyboardType="numeric"
                value={phone}
                onChangeText={setPhone}
                autoFocus
             />
          )}

          <TouchableOpacity style={[styles.btn, styles.phoneBtn]} onPress={handlePhoneLogin}>
            <Feather name="smartphone" size={20} color="#fff" />
            <Text style={styles.btnTextPhone}>
                {inputMode === 'none' ? "Use Mobile Number" : "Send OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  containerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  langBtn: { position: 'absolute', top: 50, right: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 8, borderRadius: 20, zIndex: 10 },
  langText: { marginLeft: 5, color: COLORS.primary, fontWeight: 'bold', fontSize: 12 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconCircle: { width: 80, height: 80, backgroundColor: '#E8EAF6', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 40, textAlign: 'center' },
  btnContainer: { width: '100%', gap: 15 },
  btn: { padding: 16, borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  googleBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
  phoneBtn: { backgroundColor: COLORS.primary, elevation: 3 },
  gIcon: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#DB4437', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  gText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  btnTextGoogle: { color: '#333', fontWeight: 'bold', fontSize: 16 },
  btnTextPhone: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, fontSize: 18, marginBottom: 10 }
});