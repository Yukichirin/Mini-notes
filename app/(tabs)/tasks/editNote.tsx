import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { updateNote } from '../../../lib/database';

export default function EditNote() {
  const router = useRouter();
  
  const params = useLocalSearchParams<{ 
    id: string, 
    title: string, 
    description: string, 
    status: string 
  }>();

  const [title, setTitle] = useState(params.title || '');
  const [description, setDescription] = useState(params.description || '');
  const [status, setStatus] = useState(params.status || 'Pending'); 

  const statusOptions = ['Pending', 'Ongoing', 'Finished'];

  const handleUpdate = () => {
    try {
      if (title.trim().length === 0) {
        throw new Error("Title is required!");
      }
      
      updateNote(Number(params.id), title, description, status);
      Alert.alert("Success", "Task updated successfully!");
      
      router.replace('../tasks');
      
    } catch (error: any) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Edit Task</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput 
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline={true}
        textAlignVertical="top"
      />

      <Text style={styles.label}>Select Status</Text>
      <View style={styles.statusContainer}>
        {statusOptions.map((option) => (
          <Pressable 
            key={option}
            style={status === option ? styles.statusButtonActive : styles.statusButton}
            onPress={() => setStatus(option)}
          >
            <Text style={status === option ? styles.statusTextActive : styles.statusText}>
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>Update Task</Text>
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
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#D81B60'
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 10,
    color: '#555'
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#F8BBD0', 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 20 
  },
  textArea: { 
    height: 100 
  },
  statusContainer: { 
    flexDirection: 'row', 
    gap: 10, 
    marginBottom: 30, 
    flexWrap: 'wrap' 
  },
  statusButton: { 
    borderWidth: 1, 
    borderColor: '#F06292', 
    paddingVertical: 10, 
    paddingHorizontal: 14, 
    borderRadius: 20, 
    backgroundColor: '#FFF0F5' 
  },
  statusButtonActive: { 
    borderWidth: 1, 
    borderColor: '#F06292', 
    paddingVertical: 10, 
    paddingHorizontal: 14, 
    borderRadius: 20, 
    backgroundColor: '#F06292' 
  },
  statusText: { 
    color: '#F06292', 
    fontWeight: '600' 
  },
  statusTextActive: { 
    color: 'white', 
    fontWeight: '600' 
  },
  saveButton: { 
    backgroundColor: '#F06292', 
    padding: 16, 
    borderRadius: 12,
    elevation: 2
  },
  saveButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16
  }
});