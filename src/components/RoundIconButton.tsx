import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';

export function RoundIconButton({ icon, onPress, label }: { icon: string; onPress: () => void; label: string }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.icon}>{icon}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#393C51', alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.7 },
  icon: { color: colors.text, fontSize: 25, fontWeight: '500', lineHeight: 28 },
});
