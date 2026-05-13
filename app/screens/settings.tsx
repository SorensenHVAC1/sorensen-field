import React from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const { theme, setTheme, textSize, setTextSize, zoom, setZoom, enable3D, setEnable3D, colors, fontSize } = useTheme();

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: fontSize.large * 1.2, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
    item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
    itemLabel: { fontSize: fontSize.medium, color: colors.text },
    buttonGroup: { flexDirection: 'row', gap: 8, marginTop: 8 },
    button: { flex: 1, padding: 10, borderRadius: 6, alignItems: 'center', borderWidth: 1 },
    buttonActive: { backgroundColor: colors.accent, borderColor: colors.accent },
    buttonText: { fontSize: fontSize.small, fontWeight: '600' },
    sliderContainer: { marginTop: 12 },
    sliderLabel: { fontSize: fontSize.small, color: colors.textSecondary },
  });

  return (
    <ScrollView style={styles.container}>
      {/* Theme Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Dark Mode</Text>
          <Switch value={theme === 'dark'} onValueChange={(v) => setTheme(v ? 'dark' : 'light')} />
        </View>
      </View>

      {/* Text Size */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Size</Text>
        <View style={styles.buttonGroup}>
          {['small', 'medium', 'large'].map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.button, textSize === size && styles.buttonActive]}
              onPress={() => setTextSize(size as any)}
            >
              <Text style={[styles.buttonText, { color: textSize === size ? '#000' : colors.text }]}>
                {size === 'small' ? 'A' : size === 'medium' ? 'AA' : 'AAA'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Zoom */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Zoom Level</Text>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Current: {(zoom * 100).toFixed(0)}%</Text>
        </View>
        <View style={styles.buttonGroup}>
          {[0.8, 1.0, 1.2, 1.4].map((z) => (
            <TouchableOpacity
              key={z}
              style={[styles.button, zoom === z && styles.buttonActive]}
              onPress={() => setZoom(z)}
            >
              <Text style={[styles.buttonText, { color: zoom === z ? '#000' : colors.text }]}>
                {(z * 100).toFixed(0)}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 3D Parallax */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>3D Head-Tracking</Text>
          <Switch value={enable3D} onValueChange={setEnable3D} />
        </View>
      </View>
    </ScrollView>
  );
}
