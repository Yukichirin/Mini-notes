import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { initDatabase } from '../lib/database';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("Database Error", "Failed to initialize database");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Notes App</Text>
      
      <Pressable style={styles.button} onPress={() => router.push('/notes')}>
        <Text style={styles.buttonText}>Open Notes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#FFF0F5'
  },
  title: { 
    fontSize: 34, 
    fontWeight: '700', 
    marginBottom: 5,
    color: '#D81B60'
  },
  subtitle: { 
    fontSize: 16, 
    marginBottom: 20, 
    color: '#888' 
  },
  button: { 
    backgroundColor: '#F06292',
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    borderRadius: 25, 
    elevation: 3 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 16
  }
});