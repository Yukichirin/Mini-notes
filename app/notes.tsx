import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { deleteNote, getNotes, Note } from '../lib/database';

export default function Notes() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = () => {
    try {
      const data = getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Failed to load tasks");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleDelete = (id: number) => {
    deleteNote(id);
    loadNotes(); 
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.addButton} onPress={() => router.push('/addNote')}>
        <Text style={styles.addButtonText}>Add New Task</Text>
      </Pressable>
      
      {notes.length === 0 ? (
        <Text style={styles.emptyText}>No tasks yet</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteDescription}>{item.description}</Text>
                <Text style={styles.noteStatus}>Status: {item.status}</Text>
              </View>
              
              <View style={styles.actions}>
                <Pressable 
                  style={styles.detailButton} 
                  onPress={() => router.push({
                    pathname: '/noteDetail',
                    params: { id: item.id, title: item.title, description: item.description, status: item.status }
                  })}
                >
                  <Text style={styles.detailButtonText}>View Details</Text>
                </Pressable>

                <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#FFF0F5' 
  },
  addButton: { 
    backgroundColor: '#F06292', 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 20,
    elevation: 2
  },
  addButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16
  },
  emptyText: { 
    textAlign: 'center', 
    fontSize: 16, 
    color: '#F06292', 
    marginTop: 20,
    fontStyle: 'italic'
  },
  card: { 
    padding: 16, 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: '#F8BBD0', 
    elevation: 1
  },
  noteTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 4,
    color: '#333'
  },
  noteDescription: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 4 
  },
  noteStatus: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#D81B60', 
    marginBottom: 12 
  },
  actions: { 
    flexDirection: 'row', 
    gap: 10 
  },
  detailButton: { 
    backgroundColor: '#F48FB1', 
    padding: 10, 
    borderRadius: 8,
    flex: 1, 
    alignItems: 'center'
  },
  detailButtonText: { 
    color: 'white', 
    fontWeight: '600' 
  },
  deleteButton: { 
    backgroundColor: '#E53935', 
    padding: 10, 
    borderRadius: 8,
    flex: 1,
    alignItems: 'center'
  },
  deleteButtonText: { 
    color: 'white', 
    fontWeight: '600' 
  }
});