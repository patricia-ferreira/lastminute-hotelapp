import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { fetchHotels, Status } from '../redux/slices/hotelSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { cities } from '../mocks/cities';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { HotelBox } from '../components/HotelBox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeImage from '../components/SafeImage';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NavProp>();
  const dispatch = useAppDispatch();

  const { list: hotels, status } = useAppSelector(state => state.hotels);

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (status === Status.Idle) dispatch(fetchHotels());
  }, [status, dispatch]);

  // Filter hotels based on name or city matching the query
  const filteredHotels = hotels.filter(
    hotel =>
      hotel.name.toLowerCase().includes(query.toLowerCase()) ||
      hotel.location.city.toLowerCase().includes(query.toLowerCase()),
  );

  // Top 3 recommended hotels by user rating (descending order)
  const topHotels = hotels
    .slice()
    .sort((a, b) => b.userRating - a.userRating)
    .slice(0, 3);

  // Determine what to display: filtered hotels if searching, otherwise top rated
  const displayedHotels = query.length > 0 ? filteredHotels : topHotels;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Banner section */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        }}
        style={styles.banner}
        imageStyle={{
          borderBottomLeftRadius: wp('6%'),
          borderBottomRightRadius: wp('6%'),
        }}
      >
        <Text style={[styles.locationText, { color: 'white' }]}>
          📍 Your Location
        </Text>
        <Text style={[styles.bannerTitle, { color: 'white' }]}>
          Find the perfect hotel
        </Text>

        <TextInput
          placeholder="Search hotel..."
          placeholderTextColor={colors.text + '88'}
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.card,
              color: colors.text,
            },
          ]}
          value={query}
          onChangeText={setQuery}
        />
      </ImageBackground>

      {/* Hotels section */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {query.length > 0 ? 'Search Results' : 'Top Recommended Hotels'}
        </Text>
      </View>

      {status === Status.Loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: hp('2%') }}
        />
      ) : displayedHotels.length > 0 ? (
        <FlatList
          data={displayedHotels}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <HotelBox
              hotel={item}
              onPress={() =>
                navigation.navigate('HotelDetailScreen', { hotel: item })
              }
            />
          )}
          contentContainerStyle={{ paddingHorizontal: wp('4%') }}
        />
      ) : (
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
      )}

      {/* Cities section */}
      {query.length === 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Explore by City
            </Text>
          </View>
          <FlatList
            data={cities}
            horizontal
            keyExtractor={item => item.name}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cityCard}
                onPress={() =>
                  navigation.navigate('CityScreen', { cityName: item.name })
                }
              >
                <SafeImage
                  source={item.image}
                  style={styles.cityImage}
                  resizeMode="cover"
                />
                <Text style={[styles.cityName, { color: colors.text }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{
              paddingHorizontal: wp('4%'),
              paddingBottom: hp('3%'),
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingHorizontal: wp('4%'),
    paddingTop: hp('6%'),
    paddingBottom: hp('5%'),
  },
  locationText: {
    fontSize: hp('1.6%'),
  },
  bannerTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
  },
  searchInput: {
    marginTop: hp('1.5%'),
    borderRadius: wp('3%'),
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    fontSize: hp('2%'),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
    marginBottom: hp('1.5%'),
    paddingHorizontal: wp('4%'),
  },
  sectionTitle: {
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },
  cityCard: {
    marginRight: wp('3%'),
    alignItems: 'center',
  },
  cityImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('3%'),
  },
  cityName: {
    marginTop: hp('0.8%'),
    fontSize: hp('1.6%'),
  },
});
