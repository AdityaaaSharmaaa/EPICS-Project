import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    // Wait 2.5 seconds then go to Login
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Feather name="home" size={48} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>GramSevak</Text>
      <Text style={styles.subtitle}>Empowering Villages</Text>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  iconBox: { width: 100, height: 100, backgroundColor: '#fff', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },
  subtitle: { color: '#E0E0E0', marginTop: 5, textTransform: 'uppercase', letterSpacing: 1 },
  loader: { position: 'absolute', bottom: 50 }
});