import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

type Props = { prices: number[] };

export default function PriceHistogram({ prices }: Props) {
  const { colors } = useTheme();
  const bins = useMemo(() => {
    if (!prices.length) return [];
    const min = Math.min(...prices),
      max = Math.max(...prices),
      buckets = 20,
      step = (max - min) / buckets || 1,
      counts = Array(buckets).fill(0);
    prices.forEach(p => {
      const idx = Math.min(buckets - 1, Math.floor((p - min) / step));
      counts[idx]++;
    });
    return counts.map(y => y);
  }, [prices]);

  const maxCount = Math.max(...bins, 1);

  return (
    <View>
      <View style={styles.row}>
        {bins.map((c, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              marginHorizontal: 1,
              height: (c / maxCount) * 60 || 4,
              backgroundColor: colors.primary + '80',
              borderRadius: 2,
            }}
          />
        ))}
      </View>
      <View style={styles.labels}>
        <Text style={{ color: colors.text, fontSize: 12 }}>
          {Math.min(...prices)}€
        </Text>
        <Text style={{ color: colors.text, fontSize: 12 }}>
          {Math.max(...prices)}€
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 60,
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
