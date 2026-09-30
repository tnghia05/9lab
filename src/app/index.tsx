import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ContactCardProps = {
  icon: string;
  label: string;
  value: string;
};

function ContactCard({ icon, label, value }: ContactCardProps) {
  return (
    <View style={styles.contactCard}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#090B14" />
      <View pointerEvents="none" style={styles.orbTop} />
      <View pointerEvents="none" style={styles.orbBottom} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.eyebrowRow}>
          <View style={styles.liveDot} />
          <Text style={styles.eyebrow}>DIGITAL PROFILE</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarOuter}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>NA</Text>
            </View>
          </View>

          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>AVAILABLE FOR WORK</Text>
          </View>

          <Text style={styles.name}>Nguyen An</Text>
          <Text style={styles.role}>SOFTWARE DEVELOPER</Text>
          <View style={styles.divider} />
          <Text style={styles.bio}>
            Building thoughtful digital experiences with code, curiosity, and a little magic.
          </Text>
        </View>

        <View style={styles.contacts}>
          <ContactCard icon={'\u260E'} label="PHONE" value="0901 234 567" />
          <ContactCard icon={'\u2709'} label="EMAIL" value="nguyenan@email.com" />
        </View>

        <Text style={styles.footer}>TAP A CARD TO CONNECT</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090B14',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 560,
    paddingHorizontal: 22,
    paddingVertical: 36,
    width: '100%',
  },
  orbTop: {
    backgroundColor: '#5D39FF',
    borderRadius: 180,
    height: 360,
    opacity: 0.32,
    position: 'absolute',
    right: -130,
    top: -140,
    width: 360,
  },
  orbBottom: {
    backgroundColor: '#00C2A8',
    borderRadius: 150,
    bottom: -120,
    height: 300,
    left: -150,
    opacity: 0.18,
    position: 'absolute',
    width: 300,
  },
  eyebrowRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  liveDot: {
    backgroundColor: '#65E6B7',
    borderRadius: 4,
    height: 8,
    shadowColor: '#65E6B7',
    shadowOpacity: 0.9,
    shadowRadius: 8,
    width: 8,
  },
  eyebrow: {
    color: '#ABB4D0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  profileCard: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(24, 29, 49, 0.82)',
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 32,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: 28,
    paddingVertical: 34,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  avatarOuter: {
    alignItems: 'center',
    backgroundColor: '#A895FF',
    borderRadius: 58,
    height: 116,
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#846CFF',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    width: 116,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#4932C7',
    borderRadius: 51,
    height: 102,
    justifyContent: 'center',
    width: 102,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  statusPill: {
    alignItems: 'center',
    backgroundColor: 'rgba(101, 230, 183, 0.13)',
    borderColor: 'rgba(101, 230, 183, 0.28)',
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statusDot: {
    backgroundColor: '#65E6B7',
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  statusText: {
    color: '#9BF3CF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  name: {
    color: '#F7F7FF',
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1.5,
    marginTop: 22,
  },
  role: {
    color: '#B5A8FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 7,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    height: 1,
    marginTop: 24,
    width: '100%',
  },
  bio: {
    color: '#B8C0D7',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 20,
    textAlign: 'center',
  },
  contacts: {
    alignSelf: 'stretch',
    gap: 14,
    marginTop: 18,
  },
  contactCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderColor: 'rgba(255, 255, 255, 0.13)',
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 16,
    padding: 17,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: 'rgba(168, 149, 255, 0.2)',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  icon: {
    color: '#C8BEFF',
    fontSize: 20,
  },
  contactLabel: {
    color: '#9DA7C4',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  contactValue: {
    color: '#F4F2FF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 3,
  },
  footer: {
    color: '#78819D',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginTop: 25,
  },
});
