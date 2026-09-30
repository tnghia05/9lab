import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomButton } from '../components/BottomButton';
import { colors } from '../constants/theme';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ bmi?: string; category?: string; advice?: string; color?: string; height?: string; weight?: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.appBar}><Text style={styles.appBarTitle}>‹    BMI CALCULATOR RESULTS</Text></View>
      <View style={styles.content}>
        <Text style={styles.heading}>Your Result</Text>
        <View style={styles.resultCard}>
          <Text style={[styles.category, { color: params.color ?? colors.green }]}>{params.category ?? 'BMI RESULT'}</Text>
          <Text style={styles.bmi}>{params.bmi ?? '—'}</Text>
          <Text style={styles.details}>{params.weight} kg  ·  {params.height} cm</Text>
          <Text style={styles.advice}>{params.advice ?? 'Hãy tiếp tục chăm sóc sức khỏe của bạn.'}</Text>
        </View>
      </View>
      <View style={styles.footer}><BottomButton title="RE-CALCULATE" onPress={() => router.back()} /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  appBar: { height: 52, justifyContent: 'center', paddingHorizontal: 18 },
  appBarTitle: { color: colors.text, fontSize: 13, fontWeight: '700', letterSpacing: 0.8 },
  content: { flex: 1, padding: 16 },
  heading: { color: colors.text, fontSize: 26, fontWeight: '800', marginBottom: 16 },
  resultCard: { flex: 1, backgroundColor: colors.card, borderRadius: 16, alignItems: 'center', justifyContent: 'space-evenly', padding: 24 },
  category: { fontSize: 15, fontWeight: '800', letterSpacing: 1 },
  bmi: { color: colors.text, fontSize: 76, fontWeight: '700' },
  details: { color: colors.muted, fontSize: 14 },
  advice: { color: colors.text, fontSize: 16, lineHeight: 25, textAlign: 'center' },
  footer: { paddingHorizontal: 14, paddingBottom: 12 },
});
