import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { useTheme } from '@react-navigation/native';
import PriceHistogram from './PriceHistogram';
import { HotelFilters } from '../types/Hotel';

type Props = {
  visible: boolean;
  onClose: () => void;
  prices: number[];
  filters: HotelFilters;
  setFilters: (filters: HotelFilters) => void;
};

export default function HotelFiltersModal({
  visible,
  onClose,
  prices,
  filters,
  setFilters,
}: Props) {
  const { colors } = useTheme();

  const [localFilters, setLocalFilters] = useState<HotelFilters>(filters);

  useEffect(() => {
    if (visible) {
      setLocalFilters(filters);
    }
  }, [visible]);

  const toggle = (arr: number[], val: number, key: keyof HotelFilters) => {
    const updated = arr.includes(val)
      ? arr.filter(x => x !== val)
      : [...arr, val];
    setLocalFilters({ ...localFilters, [key]: updated });
  };

  const resetFilters = () => {
    setFilters({
      ...filters,
      minPrice: null,
      maxPrice: null,
      stars: [],
      userRatings: [],
      maxDistance: null,
    });
    onClose();
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={[styles.modal, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>Filters</Text>
            <TouchableOpacity
              onPress={resetFilters}
              style={[styles.resetButton, { borderColor: colors.primary }]}
            >
              <Text style={{ color: colors.primary }}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={[styles.label, { color: colors.text }]}>
              Price per night
            </Text>
            <PriceHistogram prices={prices} />
            <View style={styles.priceInputs}>
              <TextInput
                placeholder="Min"
                placeholderTextColor={colors.text + '66'}
                style={[
                  styles.input,
                  { color: colors.text, borderColor: colors.border },
                ]}
                keyboardType="numeric"
                value={localFilters.minPrice?.toString() ?? ''}
                onChangeText={text =>
                  setLocalFilters({
                    ...localFilters,
                    minPrice: parseInt(text) || null,
                  })
                }
              />
              <TextInput
                placeholder="Max"
                placeholderTextColor={colors.text + '66'}
                style={[
                  styles.input,
                  { color: colors.text, borderColor: colors.border },
                ]}
                keyboardType="numeric"
                value={localFilters.maxPrice?.toString() ?? ''}
                onChangeText={text =>
                  setLocalFilters({
                    ...localFilters,
                    maxPrice: parseInt(text) || null,
                  })
                }
              />
            </View>

            <Text style={[styles.label, { color: colors.text }]}>Stars</Text>
            <View style={styles.checkboxRow}>
              {[5, 4, 3, 2, 1].map(n => (
                <TouchableOpacity
                  key={n}
                  onPress={() => toggle(localFilters.stars, n, 'stars')}
                  style={[
                    styles.checkbox,
                    { borderColor: colors.primary },
                    localFilters.stars.includes(n) && {
                      backgroundColor: colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: localFilters.stars.includes(n)
                        ? '#fff'
                        : colors.text,
                    }}
                  >
                    {n}★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { color: colors.text }]}>
              User rating
            </Text>
            <View style={styles.checkboxRow}>
              {[9, 8, 7, 6].map(n => (
                <TouchableOpacity
                  key={n}
                  onPress={() =>
                    toggle(localFilters.userRatings, n, 'userRatings')
                  }
                  style={[
                    styles.checkbox,
                    { borderColor: colors.primary },
                    localFilters.userRatings.includes(n) && {
                      backgroundColor: colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: localFilters.userRatings.includes(n)
                        ? '#fff'
                        : colors.text,
                    }}
                  >
                    {n}+
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { color: colors.text }]}>
              Distance to center (km)
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={30}
              step={1}
              value={localFilters.maxDistance ?? 0}
              onValueChange={v =>
                setLocalFilters({ ...localFilters, maxDistance: v })
              }
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.border}
              thumbTintColor={colors.primary}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.border,
                  marginTop: 8,
                },
              ]}
              keyboardType="numeric"
              placeholder="e.g. 5"
              placeholderTextColor={colors.text + '66'}
              value={localFilters.maxDistance?.toString() ?? ''}
              onChangeText={t =>
                setLocalFilters({
                  ...localFilters,
                  maxDistance: parseInt(t) || null,
                })
              }
            />
          </ScrollView>

          <TouchableOpacity
            onPress={applyFilters}
            style={[styles.applyButton, { backgroundColor: colors.primary }]}
          >
            <Text
              style={{
                color: colors.text,
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              Apply filters
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resetButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  priceInputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  checkbox: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  applyButton: {
    padding: 12,
    borderRadius: 8,
  },
});
