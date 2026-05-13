import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 },
  scanFrame: { width: 250, height: 250, borderWidth: 2, borderColor: '#FF8C00', borderRadius: 8, opacity: 0.5 },
  result: { position: 'absolute', bottom: 80, left: 20, right: 20, backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: 16, borderRadius: 8 },
  resultText: { color: '#20B2AA', fontSize: 16, fontWeight: 'bold' },
  button: { backgroundColor: '#FF8C00', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 6, marginTop: 16 },
  buttonText: { color: '#000', fontWeight: 'bold' },
  noPermissionText: { color: '#ffffff', textAlign: 'center', marginTop: 40 },
});

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState('');
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPermissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPermissionText}>Camera permission denied</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(data);
    Alert.alert('Scanned', `SKU: ${data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} onBarcodeScanned={handleBarCodeScanned}>
        <View style={styles.overlay}>
          <View style={styles.scanFrame} />
        </View>
      </CameraView>
      {scanned && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Scanned: {scanned}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setScanned('')}>
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
