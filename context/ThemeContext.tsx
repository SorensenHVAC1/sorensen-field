import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';
export type TextSize = 'small' | 'medium' | 'large';

interface ThemeContextType {
  theme: Theme;
  textSize: TextSize;
  zoom: number;
  enable3D: boolean;
  setTheme: (theme: Theme) => void;
  setTextSize: (size: TextSize) => void;
  setZoom: (zoom: number) => void;
  setEnable3D: (enabled: boolean) => void;
  colors: {
    bg: string;
    bgSecondary: string;
    text: string;
    textSecondary: string;
    accent: string;
    border: string;
  };
  fontSize: {
    small: number;
    medium: number;
    large: number;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
  bg: '#ffffff',
  bgSecondary: '#f5f5f5',
  text: '#000000',
  textSecondary: '#666666',
  accent: '#FF8C00',
  border: '#e0e0e0',
};

const darkColors = {
  bg: '#030810',
  bgSecondary: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  accent: '#FF8C00',
  border: '#333333',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [textSize, setTextSize] = useState<TextSize>('medium');
  const [zoom, setZoom] = useState(1);
  const [enable3D, setEnable3D] = useState(true); // ON for Brian's iPhone

  useEffect(() => {
    const loadSettings = async () => {
      const saved = await AsyncStorage.getItem('appSettings');
      if (saved) {
        const { theme: t, textSize: ts, zoom: z, enable3D: e3d } = JSON.parse(saved);
        if (t) setTheme(t);
        if (ts) setTextSize(ts);
        if (z) setZoom(z);
        if (e3d !== undefined) setEnable3D(e3d);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      await AsyncStorage.setItem(
        'appSettings',
        JSON.stringify({ theme, textSize, zoom, enable3D })
      );
    };
    saveSettings();
  }, [theme, textSize, zoom, enable3D]);

  const colors = theme === 'dark' ? darkColors : lightColors;
  const baseFontSizes = { small: 12, medium: 14, large: 16 };
  const fontSize = {
    small: baseFontSizes.small * (textSize === 'small' ? 1 : textSize === 'large' ? 1.4 : 1.2),
    medium: baseFontSizes.medium * (textSize === 'small' ? 1 : textSize === 'large' ? 1.4 : 1.2),
    large: baseFontSizes.large * (textSize === 'small' ? 1 : textSize === 'large' ? 1.4 : 1.2),
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        textSize,
        zoom,
        enable3D,
        setTheme,
        setTextSize,
        setZoom,
        setEnable3D,
        colors,
        fontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
