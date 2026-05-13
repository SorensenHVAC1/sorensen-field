import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030810' },
  content: { padding: 16 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  date: { fontSize: 14, color: '#a0a0a0' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { flex: 1, minWidth: '45%', backgroundColor: '#1a1a1a', padding: 16, borderRadius: 8 },
  cardNumber: { fontSize: 28, fontWeight: 'bold', color: '#FF8C00', marginBottom: 4 },
  cardLabel: { fontSize: 12, color: '#a0a0a0', textTransform: 'uppercase' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 12 },
  listItem: { backgroundColor: '#1a1a1a', padding: 12, borderRadius: 6, marginBottom: 8 },
  listText: { color: '#ffffff', fontSize: 14, marginBottom: 4 },
  badge: { fontSize: 11, color: '#20B2AA', fontWeight: '600' },
});

export default function DashboardScreen() {
  const { user } = useAuth();
  const [workOrders, setWorkOrders] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      // Load work orders assigned to this tech
      const { data: orders } = await supabase
        .from('master_jobs')
        .select('*')
        .eq('assigned_to', user?.full_name)
        .in('status', ['new', 'in_progress'])
        .limit(5);

      // Load invoices
      const { data: invs } = await supabase
        .from('invoices')
        .select('*')
        .limit(5);

      setWorkOrders(orders || []);
      setInvoices(invs || []);
    } catch (err) {
      console.error('Load error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
        setRefreshing(true);
        loadData();
      }} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {user?.full_name || 'Tech'}!</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{workOrders.length}</Text>
          <Text style={styles.cardLabel}>Open Orders</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{invoices.length}</Text>
          <Text style={styles.cardLabel}>Invoices</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Work Orders</Text>
        {workOrders.map(order => (
          <View key={order.id} style={styles.listItem}>
            <Text style={styles.listText}>{order.customer_name}</Text>
            <Text style={styles.badge}>{order.status.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
