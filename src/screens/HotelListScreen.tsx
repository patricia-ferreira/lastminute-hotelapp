import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  ListRenderItem,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { fetchHotels, Status } from '../redux/slices/hotelSlice';
import { RootState, AppDispatch } from '../redux/store';
import { HotelCard } from '../components/HotelCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Hotel } from '../types/Hotel';
import { RootStackParamList } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HotelListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HotelListScreen'
>;

export default function HotelListScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const { list, status, error } = useSelector(
    (state: RootState) => state.hotels,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = list.filter(hotel => {
    const q = searchQuery.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(q) ||
      hotel.location.city.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (status === Status.Idle) {
      dispatch(fetchHotels());
    }
  }, [status, dispatch]);

  const navigation = useNavigation<HotelListScreenNavigationProp>();

  const renderItem: ListRenderItem<Hotel> = useCallback(
    ({ item }) => (
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.headerText, { color: colors.text }]}>
        Let's start your journey!
      </Text>

      <View
        style={[
          styles.searchWrapper,
          { backgroundColor: colors.card, shadowColor: colors.text },
        ]}
      >
        <Ionicons name="location-outline" size={20} color={colors.text} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search hotels..."
          placeholderTextColor={colors.text + '99'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Popular Hotels
      </Text>

      {status === Status.Loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : status === Status.Failed ? (
        <Text style={{ color: colors.text }}>Error: {error}</Text>
      ) : (
        <FlatList
          data={filteredList}
          extraData={searchQuery}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={styles.center}>
              <Text style={{ color: colors.text }}>No hotels found</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 8,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 12,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  center: {
    alignItems: 'center',
    marginTop: 32,
  },
});
