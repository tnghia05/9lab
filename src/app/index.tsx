import { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const answers = [
  'Chắc chắn rồi',
  'Điều đó là chắc chắn',
  'Không nghi ngờ gì',
  'Có vẻ rất tốt',
  'Bạn có thể tin vào điều đó',
  'Theo mình là có',
  'Khả năng cao',
  'Triển vọng tốt',
  'Có lẽ vậy',
  'Hãy hỏi lại sau nhé',
  'Bây giờ chưa thể nói',
  'Tập trung rồi hỏi lại',
  'Đừng trông chờ vào điều đó',
  'Câu trả lời là không',
  'Khả năng không cao',
  'Mọi thứ chưa rõ ràng',
  'Dấu hiệu chưa tốt',
  'Không thể dự đoán lúc này',
  'Hãy kiên nhẫn thêm',
  'Vũ trụ đang cân nhắc',
];

export default function HomeScreen() {
  const [answer, setAnswer] = useState('HÃY HỎI MÌNH');
  const [questionCount, setQuestionCount] = useState(0);

  function askAgain() {
    let nextAnswer = answers[Math.floor(Math.random() * answers.length)];
    if (answers.length > 1 && nextAnswer === answer) {
      nextAnswer = answers[(answers.indexOf(nextAnswer) + 1) % answers.length];
    }
    setAnswer(nextAnswer.toLocaleUpperCase('vi-VN'));
    setQuestionCount((count) => count + 1);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#D4C3FF" />
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Ask Me Anything</Text>
      </View>

      <View style={styles.content}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Lắc quả cầu để nhận câu trả lời"
          onPress={askAgain}
          style={({ pressed }) => [styles.ball, pressed && styles.ballPressed]}>
          <View style={styles.gloss} />
          <View style={styles.windowOuter}>
            <View style={styles.windowInner}>
              <Text adjustsFontSizeToFit numberOfLines={4} style={styles.answer}>
                {answer}
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.shadow} />
        <Text style={styles.prompt}>Hãy nghĩ một câu hỏi trong đầu</Text>

        <Pressable accessibilityRole="button" onPress={askAgain} style={({ pressed }) => [styles.askButton, pressed && styles.askButtonPressed]}>
          <Text style={styles.askButtonText}>HỎI QUẢ CẦU</Text>
        </Pressable>
        <Text style={styles.count}>Đã hỏi {questionCount} lần</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF9FF' },
  appBar: { height: 56, backgroundColor: '#D4C3FF', justifyContent: 'center', paddingHorizontal: 18 },
  appBarTitle: { color: '#292333', fontSize: 18, fontWeight: '500' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  ball: {
    width: 242,
    height: 242,
    borderRadius: 121,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A181B',
    borderWidth: 3,
    borderColor: '#403D3F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  ballPressed: { transform: [{ scale: 0.97 }] },
  gloss: {
    position: 'absolute',
    top: 22,
    left: 30,
    width: 88,
    height: 34,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.13)',
    transform: [{ rotate: '-48deg' }],
  },
  windowOuter: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#08090D',
    borderColor: '#77777B',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  windowInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#07528A',
    borderColor: '#1476B5',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  answer: { color: '#9DE6FF', fontSize: 10, fontWeight: '800', letterSpacing: 0.4, lineHeight: 13, textAlign: 'center' },
  shadow: { width: 260, height: 16, borderRadius: 100, marginTop: 2, backgroundColor: 'rgba(63, 47, 71, 0.10)' },
  prompt: { color: '#77717E', fontSize: 14, marginTop: 32, textAlign: 'center' },
  askButton: { backgroundColor: '#7250B5', borderRadius: 16, paddingHorizontal: 30, paddingVertical: 15, marginTop: 20, minWidth: 205, alignItems: 'center' },
  askButtonPressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  askButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  count: { color: '#99929D', fontSize: 12, marginTop: 14 },
});
