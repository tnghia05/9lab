import { StatusBar, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Polygon, Stop } from 'react-native-svg';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#2c2015" />
      <Svg
        accessibilityLabel="Blue diamond"
        width={280}
        height={190}
        viewBox="0 0 280 190"
        style={styles.diamond}>
        <Defs>
          <LinearGradient id="leftFace" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#0B5FBA" />
            <Stop offset="1" stopColor="#79D9FF" />
          </LinearGradient>
          <LinearGradient id="rightFace" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#F5FEFF" />
            <Stop offset="1" stopColor="#1F8FE5" />
          </LinearGradient>
        </Defs>

        <Polygon points="20,80 69,37 211,37 260,80 140,166" fill="#168BDE" />
        <Polygon points="20,80 69,37 93,80" fill="#0C5EAF" />
        <Polygon points="69,37 117,80 93,80" fill="#A7E9FF" />
        <Polygon points="69,37 140,20 117,80" fill="#E3F9FF" />
        <Polygon points="140,20 211,37 164,80" fill="#A7E9FF" />
        <Polygon points="211,37 260,80 187,80" fill="#0B5EAF" />
        <Polygon points="211,37 187,80 164,80" fill="#D9F7FF" />
        <Polygon points="93,80 117,80 140,166" fill="url(#leftFace)" />
        <Polygon points="117,80 140,20 164,80" fill="#F8FEFF" />
        <Polygon points="117,80 164,80 140,166" fill="#93E5FF" />
        <Polygon points="164,80 187,80 140,166" fill="url(#rightFace)" />
        <Polygon points="20,80 93,80 140,166" fill="#0D6FC4" opacity={0.72} />
        <Polygon points="187,80 260,80 140,166" fill="#0A61B6" opacity={0.8} />
        <Polygon points="31,78 72,43 60,80" fill="#FFFFFF" opacity={0.72} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7FF',
  },
  diamond: {
    marginTop: -40,
  },
});
