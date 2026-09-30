import { useEffect, useRef, useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Question = { text: string; answer: boolean };

const questions: Question[] = [
  { text: 'Việt Nam có đường biên giới với Campuchia.', answer: true },
  { text: 'Mặt Trời quay quanh Trái Đất.', answer: false },
  { text: 'Nước sôi ở 100°C trong điều kiện áp suất tiêu chuẩn.', answer: true },
  { text: 'Một năm thường có 360 ngày.', answer: false },
  { text: 'Cá voi là động vật có vú.', answer: true },
  { text: 'Thủ đô của Nhật Bản là Kyoto.', answer: false },
  { text: 'Kim cương là một dạng của nguyên tố carbon.', answer: true },
  { text: 'Số 0 là số nguyên dương.', answer: false },
  { text: 'Trái Đất có một vệ tinh tự nhiên là Mặt Trăng.', answer: true },
  { text: 'Chim cánh cụt có thể bay trên trời.', answer: false },
];

export default function HomeScreen() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  function answerQuestion(value: boolean) {
    if (summary) return;

    const isCorrect = questions[questionIndex].answer === value;
    const nextResults = [...results, isCorrect];
    setResults(nextResults);

    if (questionIndex === questions.length - 1) {
      const correctCount = nextResults.filter(Boolean).length;
      setSummary(`Bạn trả lời đúng ${correctCount}/${questions.length} câu!`);
      resetTimer.current = setTimeout(() => {
        setQuestionIndex(0);
        setResults([]);
        setSummary(null);
      }, 2200);
    } else {
      setQuestionIndex((index) => index + 1);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#202124" />
      <View style={styles.container}>
        <View style={styles.progressRow}>
          <Text style={styles.progress}>CÂU {questionIndex + 1} / {questions.length}</Text>
          <Text style={styles.score}>ĐÚNG {results.filter(Boolean).length}</Text>
        </View>

        <View style={styles.questionArea}>
          <Text style={styles.question}>{summary ?? questions[questionIndex].text}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            disabled={Boolean(summary)}
            onPress={() => answerQuestion(true)}
            style={({ pressed }) => [styles.answerButton, styles.trueButton, pressed && styles.pressed]}>
            <Text style={styles.answerText}>Đúng</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            disabled={Boolean(summary)}
            onPress={() => answerQuestion(false)}
            style={({ pressed }) => [styles.answerButton, styles.falseButton, pressed && styles.pressed]}>
            <Text style={styles.answerText}>Sai</Text>
          </Pressable>
        </View>

        <View accessibilityLabel="Kết quả các câu đã trả lời" style={styles.scoreKeeper}>
          {results.map((correct, index) => (
            <Text key={`${index}-${correct}`} style={[styles.resultIcon, { color: correct ? '#4CAF50' : '#F44336' }]}>
              {correct ? '✓' : '×'}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#202124' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 14 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progress: { color: '#A8A8A8', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  score: { color: '#D4D4D4', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  questionArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
  question: { color: '#F5F5F5', fontSize: 22, fontWeight: '500', lineHeight: 32, textAlign: 'center' },
  actions: { gap: 13, paddingBottom: 18 },
  answerButton: { minHeight: 58, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  trueButton: { backgroundColor: '#4CAF50' },
  falseButton: { backgroundColor: '#F44336' },
  pressed: { opacity: 0.8, transform: [{ scale: 0.985 }] },
  answerText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  scoreKeeper: { minHeight: 30, flexDirection: 'row', alignItems: 'center', gap: 3 },
  resultIcon: { fontSize: 17, fontWeight: '800' },
});
