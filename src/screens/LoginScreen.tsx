import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RealmContextObj, MockRealm } from '../models/RealmContext'; // IMPORT FROM MOCK

const { useRealm } = RealmContextObj;

export const LoginScreen = ({ navigation }: any) => {
  const realm = useRealm();
  const [mobile, setMobile] = useState('');

  const handleLogin = () => {
    if (mobile.length < 10) {
      Alert.alert("Error", "Enter valid mobile number");
      return;
    }

    realm.write(() => {
      // Check if user exists in our Mock DB
      const existingUser = realm.objects('User').filtered(`mobile == "${mobile}"`)[0];
      
      if (!existingUser) {
        realm.create('User', {
          _id: new MockRealm.BSON.ObjectId(), // Use Mock ID
          mobile: mobile,
          role: mobile.startsWith('888') ? 'shopkeeper' : 'borrower',
          ccsScore: 300,
        });
      }
    });

    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GramSevak Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number (e.g. 9876543210)"
        keyboardType="numeric"
        value={mobile}
        onChangeText={setMobile}
      />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login / Register</Text>
      </TouchableOpacity>
      <Text style={styles.hint}>Hint: Use 888... for Shopkeeper</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#000' },
  input: { borderWidth: 2, borderColor: '#000', padding: 15, fontSize: 18, marginBottom: 20, borderRadius: 8 },
  btn: { backgroundColor: '#000', padding: 15, alignItems: 'center', borderRadius: 8 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  hint: { marginTop: 20, color: '#666', textAlign: 'center' }
});