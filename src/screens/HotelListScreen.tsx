import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchHotels, Status } from '../redux/slices/hotelSlice';
import HotelFiltersModal from '../components/HotelFilterModal';

import { HotelCard } from '../components/HotelCard';
import { RootState, AppDispatch } from '../redux/store';
import { Hotel, HotelFilters, SortOption } from '../types/Hotel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import SortModal from '../components/SortModal';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'HotelListScreen'>;

export default function HotelListScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavProp>();
  const { colors } = useTheme();
  const { list, status, error } = useSelector((s: RootState) => s.hotels);

  const [filters, setFilters] = useState<HotelFilters>({
    query: '',
    minPrice: null,
    maxPrice: null,
    stars: [],
    userRatings: [],
    maxDistance: null,
    sortBy: 'priceAsc',
  });
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const filtered = useMemo(() => {
    const arr = list.filter(h => {
      const q = filters.query.toLowerCase();
      if (
        q &&
        !h.name.toLowerCase().includes(q) &&
        !h.location.city.toLowerCase().includes(q)
      )
        return false;
      if (filters.minPrice != null && h.price < filters.minPrice) return false;
      if (filters.maxPrice != null && h.price > filters.maxPrice) return false;
      if (filters.stars.length && !filters.stars.includes(h.stars))
        return false;
      if (
        filters.userRatings.length &&
        !filters.userRatings.some(r => h.userRating >= r)
      )
        return false;
      if (
        filters.maxDistance != null &&
        h.distanceToCenter > filters.maxDistance
      )
        return false;
      return true;
    });
    return arr.sort((a, b) => {
      switch (filters.sortBy) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'ratingAsc':
          return a.userRating - b.userRating;
        case 'ratingDesc':
          return b.userRating - a.userRating;
        case 'starsAsc':
          return a.stars - b.stars;
        case 'starsDesc':
          return b.stars - a.stars;
        case 'distanceAsc':
          return a.distanceToCenter - b.distanceToCenter;
        case 'distanceDesc':
          return b.distanceToCenter - a.distanceToCenter;
        default:
          return 0;
      }
    });
  }, [list, filters]);

  useEffect(() => {
    if (status === Status.Idle) dispatch(fetchHotels());
  }, [status, dispatch]);

  const render = useCallback(
    ({ item }: { item: Hotel }) => (
      <HotelCard
        hotel={item}
        onPress={() =>
          navigation.navigate('HotelDetailScreen', { hotel: item })
        }
      />
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.topBar}>
        <TextInput
          style={[
            styles.input,
            { borderBottomColor: colors.border, color: colors.text },
          ]}
          placeholder="Search hotels or cities..."
          placeholderTextColor={colors.text + '99'}
          value={filters.query}
          onChangeText={t => setFilters(prev => ({ ...prev, query: t }))}
        />
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          style={styles.icon}
        >
          <Ionicons name="options-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          style={styles.icon}
        >
          <Ionicons
            name="swap-vertical-outline"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {status === Status.Loading && (
        <ActivityIndicator
          style={{ flex: 1 }}
          size="large"
          color={colors.primary}
        />
      )}
      {status === Status.Failed && (
        <Text style={styles.error}>Error: {error}</Text>
      )}
      {status === Status.Succeeded && !filtered.length && (
        <Text style={styles.error}>No hotels found</Text>
      )}
      {status === Status.Succeeded && !!filtered.length && (
        <FlatList
          data={filtered}
          showsVerticalScrollIndicator={false}
          keyExtractor={h => h.id.toString()}
          renderItem={render}
          contentContainerStyle={{ padding: 16 }}
        />
      )}

      <HotelFiltersModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        prices={list.map(h => h.price)}
        filters={filters}
        setFilters={setFilters}
      />
      <SortModal
        visible={sortModalVisible}
        selected={filters.sortBy}
        onSelect={(s: SortOption) => {
          setFilters(f => ({ ...f, sortBy: s }));
          setSortModalVisible(false);
        }}
        onClose={() => setSortModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 12,
  },
  error: {
    textAlign: 'center',
    margin: 16,
    color: '#888',
  },
});
