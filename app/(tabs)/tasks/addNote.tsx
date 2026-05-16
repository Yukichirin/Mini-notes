import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { addNote } from '../../../lib/database';

export default function AddNote() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');

  const statusOptions = ['Pending', 'Ongoing', 'Finished'];

  const handleSave = () => {
    try {
      if (title.trim().length === 0) {
        throw new Error("Title is required!");
      }
      
      addNote(title, description, status);
      Alert.alert("Success", "Task added successfully!");
      router.replace('/tasks');
      
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
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

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
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