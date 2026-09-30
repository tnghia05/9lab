import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#F57C00' },
        headerTintColor: '#111111',
        headerTitleStyle: { fontWeight: '500', fontSize: 14 },
        headerShadowVisible: false,
      }}>
      <Stack.Screen name="index" options={{ title: 'I Am Rich' }} />
    </Stack>
  );
}
