import { Stack } from 'expo-router';

export default function TasksLayout() {
  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: '#FFF0F5' }, 
      headerTintColor: '#D81B60' 
    }}>
      <Stack.Screen name="index" options={{ title: 'My Notes' }} />
      <Stack.Screen name="noteDetail" options={{ title: 'Note Details' }} />
      <Stack.Screen name="addNote" options={{ title: 'New Note' }} />
      <Stack.Screen name="editNote" options={{ title: 'Edit Note' }} />
    </Stack>
  );
}