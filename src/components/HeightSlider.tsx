import { useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';

const MIN_HEIGHT = 120;
const MAX_HEIGHT = 220;

export function HeightSlider({ value, onValueChange }: { value: number; onValueChange: (value: number) => void }) {
  const trackRef = useRef<View>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackLeft, setTrackLeft] = useState(0);
  const valueChangeRef = useRef(onValueChange);
  valueChangeRef.current = onValueChange;

  const update = (pageX: number) => {
    if (!trackWidth) return;
    const ratio = Math.max(0, Math.min(1, (pageX - trackLeft) / trackWidth));
    valueChangeRef.current(Math.round(MIN_HEIGHT + ratio * (MAX_HEIGHT - MIN_HEIGHT)));
  };

  const responder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => update(event.nativeEvent.pageX),
    onPanResponderMove: (event) => update(event.nativeEvent.pageX),
  }), [trackWidth, trackLeft]);

  const ratio = (value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT);
  return (
    <View
      ref={trackRef}
      onLayout={(event) => {
        setTrackWidth(event.nativeEvent.layout.width);
        trackRef.current?.measureInWindow((x) => setTrackLeft(x));
      }}
      {...responder.panHandlers}
      style={styles.touchArea}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
        <View style={[styles.thumb, { left: `${ratio * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  touchArea: { height: 44, width: '100%', justifyContent: 'center', paddingHorizontal: 5 },
  track: { height: 3, width: '100%', backgroundColor: '#777A89', justifyContent: 'center' },
  fill: { height: 3, backgroundColor: colors.text },
  thumb: { position: 'absolute', marginLeft: -8, width: 16, height: 16, borderRadius: 8, backgroundColor: colors.accent },
});
