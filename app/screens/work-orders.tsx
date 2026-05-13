import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030810', padding: 16 },
  listItem: { backgroundColor: '#1a1a1a', padding: 16, borderRadius: 8, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#FF8C00' },
  customer: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  details: { fontSize: 12, color: '#a0a0a0', marginBottom: 8 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, backgroundColor: '#20B2AA' },
  statusText: { color: '#000', fontSize: 11, fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#a0a0a0', marginTop: 40 },
});

export default function WorkOrdersScreen() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const { data } = await supabase
        .from('master_jobs')
        .select('*')
        .eq('assigned_to', user?.full_name)
        .order('created_at', { ascending: false });
      setOrders(data || []);
      setLoading(false);
    };
    loadOrders();
  }, [user]);

  if (loading) return <ActivityIndicator size="large" color="#FF8C00" style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <FlatList
      style={styles.container}
      data={orders}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.customer}>{item.customer_name}</Text>
          <Text style={styles.details}>{item.job_address}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text style={styles.empty}>No work orders assigned</Text>}
    />
  );
}
