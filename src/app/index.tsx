import { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { describeWeather, getWeather, type Weather } from '../services/weather';

export default function WeatherScreen() {
  const [query, setQuery] = useState('Hanoi');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function searchCity(city = query) {
    const name = city.trim();
    if (!name) {
      setError('Nhập tên thành phố để tìm thời tiết.');
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    try {
      const result = await getWeather(name);
      setWeather(result);
      setQuery(result.city);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Đã xảy ra lỗi khi tải thời tiết.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void searchCity('Hanoi'); }, []);

  const condition = weather ? describeWeather(weather.weatherCode) : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EAF1FB" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.headingRow}>
          <View>
            <Text style={styles.kicker}>DỰ BÁO THỜI TIẾT</Text>
            <Text style={styles.title}>Weather App</Text>
          </View>
          <View style={styles.headingIcon}><Text style={styles.headingEmoji}>☁️</Text></View>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            accessibilityLabel="Tên thành phố"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => void searchCity()}
            placeholder="Nhập tên thành phố..."
            placeholderTextColor="#929BAD"
            returnKeyType="search"
            style={styles.input}
          />
          <Pressable accessibilityRole="button" accessibilityLabel="Tìm thời tiết" onPress={() => void searchCity()} style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}>
            <Text style={styles.searchIcon}>⌕</Text>
          </Pressable>
        </View>

        {error ? <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View> : null}

        {loading && !weather ? (
          <View style={styles.loading}><ActivityIndicator size="large" color="#258DEE" /><Text style={styles.loadingText}>Đang tải thời tiết...</Text></View>
        ) : weather && condition ? (
          <>
            <View style={styles.locationRow}>
              <Text style={styles.pin}>⌖</Text>
              <Text style={styles.location}>{weather.city}{weather.country ? `, ${weather.country}` : ''}</Text>
            </View>
            <View style={styles.mainCard}>
              {loading ? <View style={styles.refreshBadge}><ActivityIndicator size="small" color="#258DEE" /></View> : null}
              <Text style={styles.weatherIcon}>{condition.icon}</Text>
              <Text style={styles.description}>{condition.label}</Text>
              <Text style={styles.temperature}>{Math.round(weather.temperature)}°<Text style={styles.degree}>C</Text></Text>
              <Text style={styles.feelsLike}>Cảm giác như {Math.round(weather.feelsLike)}°</Text>
              <View style={styles.highLowRow}>
                <Text style={styles.highLow}>↑ {Math.round(weather.high)}°</Text>
                <View style={styles.highLowDivider} />
                <Text style={styles.highLow}>↓ {Math.round(weather.low)}°</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Điều kiện hiện tại</Text>
            <View style={styles.metricsRow}>
              <Metric icon="💧" label="Độ ẩm" value={`${weather.humidity}%`} />
              <Metric icon="〰️" label="Tốc độ gió" value={`${Math.round(weather.windSpeed)} km/h`} />
            </View>
          </>
        ) : null}

        <Text style={styles.attribution}>Dữ liệu thời tiết: Open-Meteo</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIcon}><Text style={styles.metricEmoji}>{icon}</Text></View>
      <View><Text style={styles.metricLabel}>{label}</Text><Text style={styles.metricValue}>{value}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EAF1FB' },
  content: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 18 },
  headingRow: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  kicker: { color: '#258DEE', fontSize: 10, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: '#1D2943', fontSize: 27, fontWeight: '800', marginTop: 3 },
  headingIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#D9E8FA', alignItems: 'center', justifyContent: 'center' },
  headingEmoji: { fontSize: 24 },
  searchRow: { width: '100%', flexDirection: 'row', gap: 10, marginBottom: 18 },
  input: { flex: 1, height: 52, borderRadius: 15, backgroundColor: '#FFFFFF', paddingHorizontal: 16, color: '#1D2943', fontSize: 14, shadowColor: '#7888A3', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 2 },
  searchButton: { width: 54, height: 52, borderRadius: 15, backgroundColor: '#258DEE', alignItems: 'center', justifyContent: 'center' },
  searchIcon: { color: '#FFFFFF', fontSize: 30, fontWeight: '600', lineHeight: 34 },
  pressed: { opacity: 0.8 },
  errorBox: { width: '100%', backgroundColor: '#FFF0F0', borderRadius: 12, padding: 12, marginBottom: 14 },
  errorText: { color: '#B94242', fontSize: 13, lineHeight: 19 },
  loading: { flex: 1, minHeight: 280, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: '#75829A', fontSize: 14 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginVertical: 2 },
  pin: { color: '#258DEE', fontSize: 23, fontWeight: '700' },
  location: { color: '#273653', fontSize: 15, fontWeight: '700' },
  mainCard: { width: '100%', minHeight: 298, backgroundColor: '#F5F8FE', borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginTop: 12, padding: 18, shadowColor: '#7484A0', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 18, elevation: 3 },
  refreshBadge: { position: 'absolute', top: 16, right: 16 },
  weatherIcon: { fontSize: 66, marginTop: 3 },
  description: { color: '#53617A', fontSize: 14, fontWeight: '600', marginTop: 3 },
  temperature: { color: '#1D2943', fontSize: 64, fontWeight: '800', lineHeight: 75, marginTop: 3 },
  degree: { fontSize: 36, fontWeight: '600' },
  feelsLike: { color: '#8290A6', fontSize: 13 },
  highLowRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 15 },
  highLow: { color: '#4C5D77', fontSize: 13, fontWeight: '700' },
  highLowDivider: { width: 1, height: 15, backgroundColor: '#D1DBE9' },
  sectionTitle: { alignSelf: 'flex-start', color: '#293651', fontSize: 16, fontWeight: '800', marginTop: 21, marginBottom: 10 },
  metricsRow: { width: '100%', flexDirection: 'row', gap: 10 },
  metricCard: { flex: 1, minHeight: 76, backgroundColor: '#FFFFFF', borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, shadowColor: '#7484A0', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 1 },
  metricIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#EAF3FF', alignItems: 'center', justifyContent: 'center' },
  metricEmoji: { fontSize: 17 },
  metricLabel: { color: '#8290A6', fontSize: 10, fontWeight: '600' },
  metricValue: { color: '#26334C', fontSize: 14, fontWeight: '800', marginTop: 3 },
  attribution: { color: '#9AA5B7', fontSize: 10, marginTop: 22 },
});
