import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export const PinScreen = ({ navigation }: any) => {
  const [pin, setPin] = useState(['', '', '', '']);

  const handlePress = (num: string) => {
    const nextIndex = pin.findIndex(p => p === '');
    if (nextIndex !== -1) {
      const newPin = [...pin];
      newPin[nextIndex] = num;
      setPin(newPin);
      
      // Auto navigate when full
      if (nextIndex === 3) {
        setTimeout(() => navigation.replace('Dashboard'), 300);
      }
    }
  };

  const handleClear = () => setPin(['', '', '', '']);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.iconCircle}>
          <Feather name="lock" size={24} color="#fff" />
        </View>
        <Text style={styles.title}>Enter PIN</Text>
        <View style={styles.dotsContainer}>
          {pin.map((p, i) => (
            <View key={i} style={[styles.dot, p ? styles.dotFilled : null]} />
          ))}
        </View>
      </View>

      <View style={styles.numpad}>
        <View style={styles.row}>
          {[1, 2, 3].map(n => (
            <TouchableOpacity key={n} style={styles.numBtn} onPress={() => handlePress(n.toString())}>
              <Text style={styles.numText}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map(n => (
            <TouchableOpacity key={n} style={styles.numBtn} onPress={() => handlePress(n.toString())}>
              <Text style={styles.numText}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map(n => (
            <TouchableOpacity key={n} style={styles.numBtn} onPress={() => handlePress(n.toString())}>
              <Text style={styles.numText}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.numBtn} onPress={handleClear}><Text style={styles.clearText}>CLR</Text></TouchableOpacity>
          <TouchableOpacity style={styles.numBtn} onPress={() => handlePress('0')}><Text style={styles.numText}>0</Text></TouchableOpacity>
          <View style={styles.numBtn} /> 
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  topSection: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconCircle: { width: 60, height: 60, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  dotsContainer: { flexDirection: 'row', gap: 15 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#fff' },
  dotFilled: { backgroundColor: '#fff' },
  numpad: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, paddingBottom: 50 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  numBtn: { width: 70, height: 70, alignItems: 'center', justifyContent: 'center', borderRadius: 35 },
  numText: { fontSize: 28, color: COLORS.primary, fontWeight: 'bold' },
  clearText: { color: COLORS.danger, fontWeight: 'bold' }
});