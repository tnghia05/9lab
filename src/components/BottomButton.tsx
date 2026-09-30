import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';

export function BottomButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 58, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', borderRadius: 14 },
  pressed: { opacity: 0.82 },
  title: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 1.1 },
});
