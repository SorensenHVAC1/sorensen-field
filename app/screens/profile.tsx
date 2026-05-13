import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030810', padding: 16 },
  header: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 8, marginBottom: 24, alignItems: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  email: { fontSize: 14, color: '#a0a0a0', marginBottom: 8 },
  role: { fontSize: 12, color: '#20B2AA', fontWeight: '600', textTransform: 'uppercase' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#ffffff', marginBottom: 8, textTransform: 'uppercase', color: '#FF8C00' },
  item: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#1a1a1a', borderRadius: 6, marginBottom: 8 },
  itemText: { marginLeft: 12, color: '#ffffff', fontSize: 14 },
  button: { backgroundColor: '#dc2626', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="person-circle" size={60} color="#FF8C00" />
        <Text style={styles.name}>{user?.full_name || 'Field Tech'}</Text>
        <Text style={styles.email}>{user?.email || 'tech@sorensenhvac.com'}</Text>
        <Text style={styles.role}>{user?.role || 'Technician'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.item}>
          <MaterialIcons name="email" size={20} color="#FF8C00" />
          <Text style={styles.itemText}>{user?.email}</Text>
        </View>
        <View style={styles.item}>
          <MaterialIcons name="badge" size={20} color="#FF8C00" />
          <Text style={styles.itemText}>{user?.role}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
