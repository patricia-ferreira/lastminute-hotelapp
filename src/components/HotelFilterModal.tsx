import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { useTheme } from '@react-navigation/native';
import { HotelFilters, SortOption } from '../types/Hotel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { formatPrice } from '../utils/formatPrice';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Lowest Price', value: 'priceAsc' },
  { label: 'Highest Rating', value: 'ratingDesc' },
  { label: 'Closest to center', value: 'distanceAsc' },
];

const STAR_OPTIONS = [5, 4, 3, 2, 1];
const RATING_OPTIONS = [9, 8, 7, 6];

type Props = {
  visible: boolean;
  onClose: () => void;
  prices: number[];
  currency: string;
  filters: HotelFilters;
  setFilters: (filters: HotelFilters) => void;
};

export default function HotelFiltersModal({
  visible,
  onClose,
  prices,
  currency,
  filters,
  setFilters,
}: Props) {
  const { colors } = useTheme();
  const [localFilters, setLocalFilters] = useState<HotelFilters>(filters);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    sortBy: false,
    price: false,
    stars: false,
    ratings: false,
    distance: false,
  });

  useEffect(() => {
    if (visible) setLocalFilters(filters);
  }, [visible]);

  const averagePrice =
    prices.length > 0
      ? Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length)
      : null;

  const averagePriceFormatted =
    averagePrice !== null ? formatPrice(averagePrice, currency) : null;

  const toggle = (arr: number[], val: number, key: keyof HotelFilters) => {
    const updated = arr.includes(val)
      ? arr.filter(x => x !== val)
      : [...arr, val];
    setLocalFilters({ ...localFilters, [key]: updated });
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose();
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

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSectionHeader = (title: string, key: string) => (
    <TouchableOpacity
      onPress={() => toggleExpand(key)}
      style={styles.sectionHeader}
      activeOpacity={0.8}
    >
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      <Ionicons
        name={expanded[key] ? 'chevron-up' : 'chevron-down'}
        size={wp(5)}
        color={colors.text}
      />
    </TouchableOpacity>
  );

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
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={wp(6)} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>
              Filter & Sort
            </Text>
            <TouchableOpacity
              onPress={resetFilters}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={{ color: colors.primary, fontWeight: '500' }}>
                Clear all
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: hp(3) }}>
            {renderSectionHeader('Sort by', 'sortBy')}
            {expanded.sortBy && (
              <View style={styles.optionColumn}>
                {SORT_OPTIONS.map(opt => (
                  <TouchableOpacity
                    key={opt.value}
                    style={styles.optionRow}
                    onPress={() =>
                      setLocalFilters({ ...localFilters, sortBy: opt.value })
                    }
                  >
                    <Ionicons
                      name={
                        localFilters.sortBy === opt.value
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={wp(5)}
                      color={colors.primary}
                      style={{ marginRight: wp(3) }}
                    />
                    <Text style={{ color: colors.text }}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {renderSectionHeader('Price per night', 'price')}
            {expanded.price && (
              <View>
                {averagePriceFormatted !== null && (
                  <Text style={[styles.avgPriceText, { color: colors.text }]}>
                    The average price in this location is{' '}
                    {averagePriceFormatted}
                  </Text>
                )}
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
              </View>
            )}

            {renderSectionHeader('Stars', 'stars')}
            {expanded.stars && (
              <View style={styles.optionColumn}>
                {STAR_OPTIONS.map(n => (
                  <TouchableOpacity
                    key={n}
                    style={styles.optionRow}
                    onPress={() => toggle(localFilters.stars, n, 'stars')}
                  >
                    <Ionicons
                      name={
                        localFilters.stars.includes(n)
                          ? 'checkbox'
                          : 'square-outline'
                      }
                      size={wp(5)}
                      color={colors.primary}
                      style={{ marginRight: wp(3) }}
                    />
                    <Text style={{ color: colors.text }}>{n} star</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {renderSectionHeader('User rating', 'ratings')}
            {expanded.ratings && (
              <View style={styles.optionColumn}>
                {RATING_OPTIONS.map(n => (
                  <TouchableOpacity
                    key={n}
                    style={styles.optionRow}
                    onPress={() =>
                      toggle(localFilters.userRatings, n, 'userRatings')
                    }
                  >
                    <Ionicons
                      name={
                        localFilters.userRatings.includes(n)
                          ? 'checkbox'
                          : 'square-outline'
                      }
                      size={wp(5)}
                      color={colors.primary}
                      style={{ marginRight: wp(3) }}
                    />
                    <Text style={{ color: colors.text }}>{n}+</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {renderSectionHeader('Distance to center (km)', 'distance')}
            {expanded.distance && (
              <View>
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
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: hp(1),
                    color: colors.text,
                    fontSize: wp(4),
                  }}
                >
                  {localFilters.maxDistance ?? 0} km
                </Text>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity
            onPress={applyFilters}
            style={[styles.applyButton, { backgroundColor: colors.primary }]}
          >
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: wp(4),
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
    padding: wp(5),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
  },
  optionColumn: {
    paddingLeft: wp(2),
    marginBottom: hp(1.5),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(0.7),
  },
  priceInputs: {
    flexDirection: 'row',
    gap: wp(3),
    marginBottom: hp(2),
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: wp(2),
    padding: hp(1.2),
    fontSize: wp(4),
  },
  avgPriceText: {
    fontSize: wp(3.5),
    marginBottom: hp(0.8),
    fontStyle: 'italic',
  },
  applyButton: {
    padding: hp(2),
    borderRadius: wp(3),
    marginTop: hp(1),
    marginBottom: Platform.OS === 'ios' ? hp(3) : 0,
  },
});
