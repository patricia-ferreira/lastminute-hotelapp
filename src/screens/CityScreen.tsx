import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import {
  useTheme,
  useNavigation,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { fetchHotels, Status } from '../redux/slices/hotelSlice';
import { HotelCard } from '../components/HotelCard';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RootStackParamList } from '../navigation';
import HotelFiltersModal from '../components/HotelFilterModal';
import { cities } from '../mocks/cities';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Hotel, HotelFilters, SortOption } from '../types/Hotel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import SafeImage from '../components/SafeImage';
import { Activity, Food } from '../types/City';

type CityScreenRouteProp = RouteProp<RootStackParamList, 'CityScreen'>;

type CityScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CityScreen'
>;

export default function CityScreen() {
  const route = useRoute<CityScreenRouteProp>();
  const { cityName } = route.params;
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CityScreenNavigationProp>();
  const { list, status } = useAppSelector(state => state.hotels);

  const [activeTab, setActiveTab] = useState<'Hotels' | 'Foods' | 'Activities'>(
    'Hotels',
  );
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [filters, setFilters] = useState<HotelFilters>({
    query: '',
    minPrice: null,
    maxPrice: null,
    stars: [],
    userRatings: [],
    maxDistance: null,
    sortBy: 'priceAsc',
  });

  const city = cities.find(
    c => c.name.toLowerCase() === cityName.toLowerCase(),
  );
  const cityImage = city ? city.image : undefined;
  const countryName = city ? city.country : '';

  useEffect(() => {
    if (status === Status.Idle) dispatch(fetchHotels());
  }, [status, dispatch]);

  useEffect(() => {
    if (list.length > 0) {
      const prices = list.map(h => h.price);
      setFilters(prev => ({
        ...prev,
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
      }));
    }
  }, [list]);

  const filteredHotels = useMemo(() => {
    return list
      .filter(h => h.location.city.toLowerCase() === cityName.toLowerCase())
      .filter(h => {
        const q = filters.query.toLowerCase();
        if (q && !h.name.toLowerCase().includes(q)) return false;
        if (filters.minPrice != null && h.price < filters.minPrice)
          return false;
        if (filters.maxPrice != null && h.price > filters.maxPrice)
          return false;
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
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'priceAsc':
            return a.price - b.price;
          case 'ratingDesc':
            return b.userRating - a.userRating;
          case 'distanceAsc':
            return a.distanceToCenter - b.distanceToCenter;
          default:
            return 0;
        }
      });
  }, [list, filters, cityName]);

  const renderHotel = useCallback(
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

  const renderMockItem = ({ item }: { item: Food | Activity }) => (
    <View style={styles.mockCard}>
      <SafeImage
        source={item.image}
        style={{
          width: '100%',
          height: hp('18%'),
          borderTopLeftRadius: wp('3%'),
          borderTopRightRadius: wp('3%'),
        }}
        resizeMode={'cover'}
      />
      <Text style={styles.mockText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ImageBackground
        source={{ uri: cityImage }}
        style={styles.banner}
        imageStyle={{
          borderBottomLeftRadius: wp('6%'),
          borderBottomRightRadius: wp('6%'),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={wp('6%')} color="#fff" />
        </TouchableOpacity>

        <View style={styles.cityNameContainer}>
          <Text style={[styles.cityTitle, { color: 'white' }]}>{cityName}</Text>
          <Text style={[styles.countryText, { color: 'white' }]}>
            {countryName}
          </Text>
        </View>
      </ImageBackground>

      <View
        style={{
          flex: 1,
          marginTop: hp('2%'),
          marginHorizontal: wp('3%'),
          width: wp('90%'),
          alignSelf: 'center',
        }}
      >
        <View style={styles.tabContainer}>
          {['Hotels', 'Foods', 'Activities'].map(tab => {
            const active = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab as any)}
                style={[
                  styles.tabButton,
                  active && {
                    backgroundColor: colors.primary,
                    borderRadius: wp('4%'),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: active ? colors.background : colors.text },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flex: 1, marginTop: hp('2%') }}>
          {activeTab === 'Hotels' && (
            <>
              <View
                style={[
                  styles.searchFilterContainer,
                  { width: wp('90%'), alignSelf: 'center' },
                ]}
              >
                <TextInput
                  style={[
                    styles.searchInput,
                    { backgroundColor: colors.card, color: colors.text },
                  ]}
                  placeholder="Search hotels..."
                  placeholderTextColor={colors.text + '99'}
                  value={filters.query}
                  onChangeText={t =>
                    setFilters(prev => ({ ...prev, query: t }))
                  }
                />
                <TouchableOpacity
                  onPress={() => setFilterModalVisible(true)}
                  style={[styles.filterSortButton]}
                >
                  <Ionicons
                    name="options-outline"
                    size={wp('6%')}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>

              {status === Status.Loading ? (
                <ActivityIndicator
                  size="large"
                  color={colors.primary}
                  style={{ marginTop: hp('2.5%') }}
                />
              ) : filteredHotels.length === 0 ? (
                <View style={{ padding: wp('6%'), alignItems: 'center' }}>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: hp('2%'),
                      textAlign: 'center',
                    }}
                  >
                    No hotels found
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={filteredHotels}
                  keyExtractor={h => h.id.toString()}
                  renderItem={renderHotel}
                  contentContainerStyle={{
                    padding: wp('4%'),
                    paddingBottom: hp('10%'),
                    flexGrow: 1,
                  }}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </>
          )}

          {activeTab === 'Foods' && (
            <FlatList
              data={city?.foods ?? []}
              keyExtractor={item => item.name}
              renderItem={renderMockItem}
              contentContainerStyle={{
                paddingHorizontal: wp('4%'),
                paddingBottom: hp('10%'),
              }}
              showsVerticalScrollIndicator={false}
            />
          )}

          {activeTab === 'Activities' && (
            <FlatList
              data={city?.activities ?? []}
              keyExtractor={item => item.name}
              renderItem={renderMockItem}
              contentContainerStyle={{
                paddingHorizontal: wp('4%'),
                paddingBottom: hp('10%'),
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>

      <HotelFiltersModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        prices={list.map(h => h.price)}
        currency={list[0]?.currency}
        filters={filters}
        setFilters={setFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: hp('30%'),
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: hp('6%'),
    left: wp('4%'),
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: wp('1%'),
    borderRadius: wp('6%'),
  },
  cityNameContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('3%'),
    alignSelf: 'center',
    alignItems: 'center',
  },
  cityTitle: {
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
  },
  countryText: {
    fontSize: hp('2%'),
    marginTop: hp('0.5%'),
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: hp('1.5%'),
  },
  tabButton: {
    marginRight: wp('3%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
  },
  tabText: {
    fontSize: hp('2%'),
    fontWeight: '600',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  searchInput: {
    flex: 1,
    borderRadius: wp('3%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    fontSize: hp('1.8%'),
  },
  filterSortButton: {
    marginLeft: wp('1%'),
  },
  mockCard: {
    marginBottom: hp('2.5%'),
    borderRadius: wp('3%'),
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
  },
  mockText: {
    padding: wp('3%'),
    fontSize: hp('2%'),
  },
});
