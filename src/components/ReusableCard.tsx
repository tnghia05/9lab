import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';

type Props = { children: ReactNode; onPress?: () => void; selected?: boolean; style?: object };

export function ReusableCard({ children, onPress, selected = false, style }: Props) {
  const content = <View style={[styles.card, selected && styles.selected, style]}>{children}</View>;
  return onPress ? <Pressable onPress={onPress} style={styles.wrapper}>{content}</Pressable> : content;
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  card: { flex: 1, backgroundColor: colors.card, borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 14 },
  selected: { backgroundColor: colors.cardSelected, borderWidth: 1, borderColor: colors.accent },
});
