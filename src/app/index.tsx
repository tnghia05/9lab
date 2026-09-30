import { useAudioPlayer } from 'expo-audio';
import { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const notes = [
  { name: 'Đô', color: '#F44336', sound: require('../../assets/sounds/note-1.wav') },
  { name: 'Rê', color: '#FF9800', sound: require('../../assets/sounds/note-2.wav') },
  { name: 'Mi', color: '#FFEB3B', sound: require('../../assets/sounds/note-3.wav') },
  { name: 'Fa', color: '#4CAF50', sound: require('../../assets/sounds/note-4.wav') },
  { name: 'Sol', color: '#009688', sound: require('../../assets/sounds/note-5.wav') },
  { name: 'La', color: '#2196F3', sound: require('../../assets/sounds/note-6.wav') },
  { name: 'Si', color: '#9C27B0', sound: require('../../assets/sounds/note-7.wav') },
];

export default function HomeScreen() {
  const player1 = useAudioPlayer(notes[0].sound);
  const player2 = useAudioPlayer(notes[1].sound);
  const player3 = useAudioPlayer(notes[2].sound);
  const player4 = useAudioPlayer(notes[3].sound);
  const player5 = useAudioPlayer(notes[4].sound);
  const player6 = useAudioPlayer(notes[5].sound);
  const player7 = useAudioPlayer(notes[6].sound);
  const players = [player1, player2, player3, player4, player5, player6, player7];
  const [activeNote, setActiveNote] = useState<number | null>(null);

  function playNote(index: number) {
    const player = players[index];
    player.seekTo(0);
    player.play();
    setActiveNote(index);
    setTimeout(() => setActiveNote((current) => current === index ? null : current), 150);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.header}>
        <Text style={styles.title}>XYLOPHONE</Text>
        <Text style={styles.subtitle}>Chạm vào phím để chơi nhạc</Text>
      </View>

      <View style={styles.keys}>
        {notes.map((note, index) => (
          <Pressable
            key={note.name}
            accessibilityRole="button"
            accessibilityLabel={`Phím ${note.name}`}
            onPress={() => playNote(index)}
            style={({ pressed }) => [
              styles.key,
              { backgroundColor: note.color },
              pressed && styles.keyPressed,
              activeNote === index && styles.keyActive,
            ]}>
            <Text style={styles.keyLabel}>{note.name}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.footer}>C  ·  D  ·  E  ·  F  ·  G  ·  A  ·  B</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000000', paddingHorizontal: 14 },
  header: { alignItems: 'center', paddingTop: 18, paddingBottom: 18 },
  title: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: 3 },
  subtitle: { color: '#9B9B9B', fontSize: 12, marginTop: 6 },
  keys: { flex: 1, justifyContent: 'center', gap: 7, paddingBottom: 10 },
  key: {
    flex: 1,
    maxHeight: 78,
    minHeight: 48,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  keyPressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  keyActive: { borderWidth: 3, borderColor: '#FFFFFF' },
  keyLabel: { color: 'rgba(0,0,0,0.55)', fontSize: 15, fontWeight: '800' },
  footer: { color: '#777777', fontSize: 11, letterSpacing: 2, textAlign: 'center', paddingBottom: 14 },
});
