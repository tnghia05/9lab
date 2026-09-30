import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomButton } from '../components/BottomButton';
import { HeightSlider } from '../components/HeightSlider';
import { ReusableCard } from '../components/ReusableCard';
import { RoundIconButton } from '../components/RoundIconButton';
import { colors } from '../constants/theme';
import { calculateBmi } from '../utils/calculator';

export default function InputScreen() {
  const router = useRouter();
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState(25);

  function calculate() {
    const result = calculateBmi(weight, height);
    router.push({ pathname: '/results', params: { ...result, gender, height: String(height), weight: String(weight), age: String(age) } });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.appBar}><Text style={styles.appBarTitle}>BMI CALCULATOR</Text></View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <ReusableCard onPress={() => setGender('MALE')} selected={gender === 'MALE'} style={styles.genderCard}>
            <Text style={styles.genderIcon}>♂</Text><Text style={styles.label}>MALE</Text>
          </ReusableCard>
          <ReusableCard onPress={() => setGender('FEMALE')} selected={gender === 'FEMALE'} style={styles.genderCard}>
            <Text style={styles.genderIcon}>♀</Text><Text style={styles.label}>FEMALE</Text>
          </ReusableCard>
        </View>

        <ReusableCard style={styles.heightCard}>
          <Text style={styles.label}>HEIGHT</Text>
          <View style={styles.heightValueRow}><Text style={styles.heightValue}>{height}</Text><Text style={styles.unit}>CM</Text></View>
          <HeightSlider value={height} onValueChange={setHeight} />
          <View style={styles.rangeLabels}><Text style={styles.rangeText}>120 cm</Text><Text style={styles.rangeText}>220 cm</Text></View>
        </ReusableCard>

        <View style={styles.row}>
          <MeasureCard label="WEIGHT" value={weight} unit="KG" onDecrease={() => setWeight((v) => Math.max(20, v - 1))} onIncrease={() => setWeight((v) => Math.min(250, v + 1))} />
          <MeasureCard label="AGE" value={age} unit="YEARS" onDecrease={() => setAge((v) => Math.max(2, v - 1))} onIncrease={() => setAge((v) => Math.min(110, v + 1))} />
        </View>
      </ScrollView>
      <View style={styles.footer}><BottomButton title="CALCULATE" onPress={calculate} /></View>
    </SafeAreaView>
  );
}

function MeasureCard({ label, value, unit, onDecrease, onIncrease }: { label: string; value: number; unit: string; onDecrease: () => void; onIncrease: () => void }) {
  return (
    <ReusableCard style={styles.measureCard}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.measureValue}>{value}<Text style={styles.unit}> {unit}</Text></Text>
      <View style={styles.controls}>
        <RoundIconButton icon="−" label={`Giảm ${label.toLowerCase()}`} onPress={onDecrease} />
        <RoundIconButton icon="+" label={`Tăng ${label.toLowerCase()}`} onPress={onIncrease} />
      </View>
    </ReusableCard>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  appBar: { height: 52, justifyContent: 'center', paddingHorizontal: 18 },
  appBarTitle: { color: colors.text, fontSize: 14, fontWeight: '700', letterSpacing: 1.2 },
  content: { flexGrow: 1, paddingHorizontal: 14, paddingTop: 8, paddingBottom: 12, gap: 14 },
  row: { flexDirection: 'row', gap: 14, minHeight: 125 },
  genderCard: { gap: 4 },
  genderIcon: { color: colors.text, fontSize: 44, fontWeight: '500', lineHeight: 52 },
  label: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 0.7 },
  heightCard: { minHeight: 152, paddingHorizontal: 20, paddingVertical: 14 },
  heightValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5, marginTop: 4 },
  heightValue: { color: colors.text, fontSize: 34, fontWeight: '700' },
  unit: { color: colors.muted, fontSize: 11, fontWeight: '600' },
  rangeLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  rangeText: { color: '#777A89', fontSize: 10 },
  measureCard: { minHeight: 148, gap: 6 },
  measureValue: { color: colors.text, fontSize: 31, fontWeight: '700' },
  controls: { flexDirection: 'row', gap: 12, marginTop: 4 },
  footer: { paddingHorizontal: 14, paddingBottom: 12 },
});
