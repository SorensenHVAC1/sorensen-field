import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030810', padding: 16 },
  listItem: { backgroundColor: '#1a1a1a', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  info: { flex: 1 },
  customer: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  details: { fontSize: 12, color: '#a0a0a0' },
  amount: { fontSize: 18, fontWeight: 'bold', color: '#20B2AA' },
  empty: { textAlign: 'center', color: '#a0a0a0', marginTop: 40 },
});

export default function InvoicesScreen() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      const { data } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });
      setInvoices(data || []);
      setLoading(false);
    };
    loadInvoices();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#FF8C00" style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <FlatList
      style={styles.container}
      data={invoices}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.info}>
            <Text style={styles.customer}>{item.customer_name || 'Invoice'}</Text>
            <Text style={styles.details}>ID: {item.id.slice(0, 8)}</Text>
          </View>
          <Text style={styles.amount}>${item.total?.toFixed(2)}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text style={styles.empty}>No invoices</Text>}
    />
  );
}
