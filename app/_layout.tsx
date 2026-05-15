import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#f4511e' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="index" options={{ title: 'Welcome' }} />
      <Stack.Screen name="notes" options={{ title: 'My Notes' }} />
      <Stack.Screen name="noteDetail" options={{ title: 'Note Details' }} />
      <Stack.Screen name="addNote" options={{ title: 'New Note' }} />
    </Stack>
  );
}