import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://tlzgryqkxmqrscztkxjf.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsemdyeXFreG1xcnNjenRreGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4MzAxNDAsImV4cCI6MjAyNjQzMDE0MH0.0jH80s6UtDq4iB3p3qKqZqDV7OHqH3UpMhZXFfGlQzc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
