import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function NoteDetail() {
  const router = useRouter();
  
  // Retrieve the parameters passed from the list screen
  const { id, title, description, status } = useLocalSearchParams<{ 
    id: string; 
    title: string; 
    description: string; 
    status: string; 
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task ID: {id}</Text>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.status}>Status: {status}</Text>
      
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.description}>{description}</Text>

      <Pressable 
        style={styles.editButton}
        onPress={() => router.push({
          pathname: '../tasks/editNote',
          params: { id, title, description, status } 
        })}
      >
        <Text style={styles.editButtonText}>Edit Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#FFF0F5'
  },
  label: { 
    fontSize: 16, 
    color: '#888', 
    marginBottom: 5, 
    marginTop: 10 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '700', 
    marginBottom: 5,
    color: '#D81B60'
  },
  status: { 
    fontSize: 18, 
    color: '#F06292', 
    fontWeight: '700', 
    marginBottom: 20,
    backgroundColor: '#FCE4EC', 
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  description: { 
    fontSize: 16, 
    color: '#444', 
    marginBottom: 40,
    lineHeight: 24 
  },
  editButton: { 
    backgroundColor: '#F06292', 
    padding: 16, 
    borderRadius: 12, 
    marginTop: 16,
    elevation: 2
  },
  editButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: '700', 
    fontSize: 16 
  }
});