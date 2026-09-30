import { useRef, useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class Story {
  constructor(
    public readonly title: string,
    public readonly choice1: string,
    public readonly nextStory1: number | null,
    public readonly choice2: string,
    public readonly nextStory2: number | null,
  ) {}

  get isEnding() {
    return this.nextStory1 === null && this.nextStory2 === null;
  }
}

class StoryBrain {
  private currentIndex = 0;

  private readonly storyData: Story[] = [
    new Story(
      'Xe của bạn bị xẹp lốp trên con đường vắng. Bạn quyết định đi nhờ xe. Một chiếc xe tải màu gỉ sét dừng lại bên cạnh bạn. Một người đàn ông với đôi mắt to bất thường mở cửa xe và hỏi: “Cần đi nhờ không?”',
      'Đồng ý đi nhờ. Cảm ơn vì sự giúp đỡ!', 1,
      'Khoan đã, tốt hơn là tôi nên hỏi anh ta trước xem anh ta có phải là kẻ giết người không?', 2,
    ),
    new Story(
      'Người tài xế mỉm cười, đưa bạn đến trạm sửa xe gần nhất. Lốp xe được thay nhanh chóng và trời vẫn còn sáng.',
      'Mời bác ấy một ly cà phê để cảm ơn.', 3,
      'Cảm ơn rồi gọi cho bạn bè đến đón.', 4,
    ),
    new Story(
      'Bạn giữ khoảng cách và gọi cứu hộ. Một lúc sau, xe hỗ trợ đến nơi. Hóa ra người tài xế chỉ đang muốn giúp.',
      'Xin lỗi và cảm ơn anh ấy.', 3,
      'Đợi cứu hộ rồi tiếp tục hành trình.', 4,
    ),
    new Story(
      'Hai người trò chuyện vui vẻ bên tách cà phê. Một tình bạn mới bắt đầu từ chuyến đi bất ngờ này.',
      '', null, '', null,
    ),
    new Story(
      'Bạn về nhà an toàn và kể lại câu chuyện cho mọi người. Lần sau, bạn sẽ chuẩn bị lốp dự phòng tốt hơn.',
      '', null, '', null,
    ),
  ];

  get currentStory() {
    return this.storyData[this.currentIndex];
  }

  choose(choice: 1 | 2) {
    const nextIndex = choice === 1 ? this.currentStory.nextStory1 : this.currentStory.nextStory2;
    if (nextIndex !== null) this.currentIndex = nextIndex;
  }

  restart() {
    this.currentIndex = 0;
  }
}

const stars = Array.from({ length: 38 }, (_, index) => ({
  left: `${(index * 47 + 9) % 100}%` as `${number}%`,
  top: `${(index * 73 + 5) % 100}%` as `${number}%`,
  size: index % 7 === 0 ? 3 : 2,
  opacity: 0.28 + (index % 5) * 0.12,
}));

export default function HomeScreen() {
  const storyBrain = useRef(new StoryBrain()).current;
  const [, refresh] = useState(0);
  const story = storyBrain.currentStory;

  function choose(choice: 1 | 2) {
    storyBrain.choose(choice);
    refresh((value) => value + 1);
  }

  function restart() {
    storyBrain.restart();
    refresh((value) => value + 1);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#04294D" />
      <View style={styles.background}>
        <View pointerEvents="none" style={styles.glowOne} />
        <View pointerEvents="none" style={styles.glowTwo} />
        {stars.map((star, index) => <View key={index} pointerEvents="none" style={[styles.star, star]} />)}
        <View style={styles.content}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}><Text style={styles.brandMarkText}>✦</Text></View>
            <Text style={styles.brand}>DESTINI</Text>
          </View>

          <View style={styles.storyPanel}>
            <Text style={styles.chapter}>{story.isEnding ? 'KẾT THÚC' : 'CÂU CHUYỆN CỦA BẠN'}</Text>
            <Text style={styles.storyText}>{story.title}</Text>
          </View>

          {story.isEnding ? (
            <Pressable accessibilityRole="button" onPress={restart} style={({ pressed }) => [styles.choiceButton, styles.restartButton, pressed && styles.pressed]}>
              <Text style={styles.choiceText}>Bắt đầu lại</Text>
            </Pressable>
          ) : (
            <View style={styles.choices}>
              <Pressable accessibilityRole="button" onPress={() => choose(1)} style={({ pressed }) => [styles.choiceButton, styles.choiceOne, pressed && styles.pressed]}>
                <Text style={styles.choiceText}>{story.choice1}</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={() => choose(2)} style={({ pressed }) => [styles.choiceButton, styles.choiceTwo, pressed && styles.pressed]}>
                <Text style={styles.choiceText}>{story.choice2}</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#04294D' },
  background: { flex: 1, backgroundColor: '#063A66', overflow: 'hidden' },
  glowOne: { position: 'absolute', width: 360, height: 360, borderRadius: 180, backgroundColor: '#078BAA', opacity: 0.28, top: '35%', left: '-25%' },
  glowTwo: { position: 'absolute', width: 280, height: 280, borderRadius: 140, backgroundColor: '#1249A0', opacity: 0.32, top: '-5%', right: '-20%' },
  star: { position: 'absolute', width: 3, height: 3, borderRadius: 2, backgroundColor: '#D4F4FF' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 22 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 18 },
  brandMark: { width: 27, height: 27, borderRadius: 14, backgroundColor: 'rgba(101, 217, 255, 0.2)', alignItems: 'center', justifyContent: 'center' },
  brandMarkText: { color: '#9DEBFF', fontSize: 17 },
  brand: { color: '#C3F4FF', fontSize: 12, fontWeight: '800', letterSpacing: 2.5 },
  storyPanel: { flex: 1, justifyContent: 'center', paddingHorizontal: 2 },
  chapter: { color: '#8BDDED', fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 16 },
  storyText: { color: '#FFFFFF', fontSize: 20, fontWeight: '500', lineHeight: 30, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  choices: { gap: 10 },
  choiceButton: { minHeight: 56, borderRadius: 30, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 12, shadowColor: '#00172A', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.24, shadowRadius: 9, elevation: 4 },
  choiceOne: { backgroundColor: '#F44336' },
  choiceTwo: { backgroundColor: '#168FE0' },
  restartButton: { backgroundColor: '#168FE0' },
  choiceText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', textAlign: 'center', lineHeight: 21 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
});
