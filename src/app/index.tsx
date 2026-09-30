import { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const pipPositions: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

function Die({ value }: { value: number }) {
  return (
    <View accessible accessibilityLabel={`Xúc xắc ${value} chấm`} style={styles.die}>
      {Array.from({ length: 9 }, (_, index) => (
        <View key={index} style={styles.pipCell}>
          {pipPositions[value].includes(index) ? <View style={styles.pip} /> : null}
        </View>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const [dice, setDice] = useState<[number, number]>([6, 4]);
  const [rollCount, setRollCount] = useState(0);

  function rollDice() {
    setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
    setRollCount((count) => count + 1);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <Text style={styles.title}>Dice</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.diceRow}>
          {dice.map((value, index) => <Die key={index} value={value} />)}
        </View>

        <Text style={styles.result}>Tổng điểm: {dice[0] + dice[1]}</Text>
        <Pressable accessibilityRole="button" onPress={rollDice} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>LẮC XÚC XẮC</Text>
        </Pressable>
        <Text style={styles.rollCount}>Đã lắc {rollCount} lần</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 52, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#242424', fontSize: 16, fontWeight: '500' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  diceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 34 },
  die: {
    width: 82,
    height: 82,
    borderRadius: 21,
    borderWidth: 5,
    borderColor: '#FF641F',
    backgroundColor: '#FFFDFB',
    padding: 9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    shadowColor: '#F7941D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 3,
  },
  pipCell: { width: '33.333%', height: '33.333%', alignItems: 'center', justifyContent: 'center' },
  pip: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#F35A22' },
  result: { color: '#373737', fontSize: 18, fontWeight: '600', marginTop: 42 },
  button: { backgroundColor: '#F45B25', borderRadius: 16, paddingVertical: 15, paddingHorizontal: 30, marginTop: 24, minWidth: 200, alignItems: 'center' },
  buttonPressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  rollCount: { color: '#858585', fontSize: 13, marginTop: 14 },
});
