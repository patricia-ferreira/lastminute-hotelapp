import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Pressable,
  FlatList,
  Dimensions,
  ViewToken,
} from 'react-native';
import {
  RouteProp,
  useRoute,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/formatPrice';
import { Hotel } from '../types/Hotel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeImage from '../components/SafeImage';

const SCREEN_WIDTH = Dimensions.get('window').width;

type RouteParams = {
  hotel: Hotel;
};

export default function HotelDetailsScreen() {
  const { params } = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { hotel } = params;
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);

  const onViewRef = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    },
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderStars = () =>
    [...Array(5)].map((_, i) => (
      <Ionicons
        key={i}
        name={
          hotel.stars >= i + 1
            ? 'star'
            : hotel.stars >= i + 0.5
            ? 'star-half'
            : 'star-outline'
        }
        size={hp('2%')}
        color="#FFD700"
      />
    ));

  const openMap = () => {
    const address = `${hotel.location.address}, ${hotel.location.city}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      <View style={styles.imageContainer}>
        <FlatList
          data={hotel.gallery}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({ item }) => (
            <SafeImage source={item} style={styles.image} />
          )}
        />
        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { backgroundColor: '#00000080' }]}
        >
          <Ionicons name="arrow-back" size={hp('3%')} color="#fff" />
        </Pressable>
        <View style={styles.dotsContainer}>
          {hotel.gallery.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === activeIndex && { backgroundColor: colors.primary },
              ]}
            />
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{
          paddingTop: hp('6%'),
          paddingBottom: hp('10%'),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.cardContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {hotel.name}
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.stars}>{renderStars()}</View>
            <Text style={[styles.userRating, { color: colors.text }]}>
              | {hotel.userRating.toFixed(1)} (based on user reviews)
            </Text>
          </View>

          <View style={styles.addressRow}>
            <TouchableOpacity onPress={openMap} style={styles.mapIconWrapper}>
              <Ionicons
                name="navigate-circle-outline"
                size={hp('2.4%')}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text style={[styles.addressText, { color: colors.text }]}>
              {hotel.location.address}, {hotel.location.city}
            </Text>
          </View>

          <View style={{ marginTop: hp('2%') }}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Facilities
            </Text>
            <View style={styles.facilitiesRow}>
              {[
                { icon: 'wifi-outline', label: 'Wi-Fi' },
                { icon: 'car-outline', label: 'Parking' },
                { icon: 'restaurant-outline', label: 'Restaurant' },
                { icon: 'fitness-outline', label: 'Gym' },
              ].map(({ icon, label }, idx) => (
                <View key={idx} style={styles.facilityItem}>
                  <Ionicons
                    name={icon}
                    size={hp('3%')}
                    color={colors.primary}
                  />
                  <Text style={[styles.facilityText, { color: colors.text }]}>
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.descContainer}>
            <TouchableOpacity
              onPress={() => setDescExpanded(!descExpanded)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Description
              </Text>
              <Ionicons
                name={
                  descExpanded ? 'chevron-up-outline' : 'chevron-down-outline'
                }
                size={hp('3%')}
                color={colors.primary}
              />
            </TouchableOpacity>

            {descExpanded && (
              <View style={{ marginTop: hp('1%') }}>
                <Text style={[styles.text, { color: colors.text }]}>
                  Discover a welcoming stay at our hotel, where comfort meets
                  convenience. Enjoy modern amenities, friendly service, and a
                  prime location perfect for business or leisure travelers. For
                  any inquiries, feel free to contact us at{' '}
                  {hotel.contact.email} or call us at{' '}
                  {hotel.contact.phoneNumber}.
                </Text>
              </View>
            )}
          </View>
          <View style={styles.checkInOutContainer}>
            <View
              style={[styles.checkCard, { backgroundColor: colors.border }]}
            >
              <Ionicons
                name="calendar-outline"
                size={hp('3%')}
                color={colors.primary}
              />
              <Text style={[styles.checkTitle, { color: colors.text }]}>
                Check-in
              </Text>
              <Text style={[styles.checkTime, { color: colors.text }]}>
                {hotel.checkIn.from} - {hotel.checkIn.to}
              </Text>
            </View>
            <View
              style={[styles.checkCard, { backgroundColor: colors.border }]}
            >
              <Ionicons
                name="log-out-outline"
                size={hp('3%')}
                color={colors.primary}
              />
              <Text style={[styles.checkTitle, { color: colors.text }]}>
                Check-out
              </Text>
              <Text style={[styles.checkTime, { color: colors.text }]}>
                {hotel.checkOut.from} - {hotel.checkOut.to}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Text style={[styles.priceText, { color: colors.primary }]}>
          <Text style={styles.priceAmount}>
            {formatPrice(hotel.price, hotel.currency)}
          </Text>{' '}
          <Text style={styles.priceUnit}>/night</Text>
        </Text>
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: hp('40%'),
    overflow: 'hidden',
    borderBottomLeftRadius: wp('8%'),
    borderBottomRightRadius: wp('8%'),
    position: 'relative',
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
  scrollArea: {
    flex: 1,
  },
  cardContainer: {
    marginTop: -hp('6%'),
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapIconWrapper: {
    marginRight: wp('2%'),
  },
  addressText: {
    fontSize: hp('1.8%'),
    flexShrink: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  stars: {
    flexDirection: 'row',
    marginRight: wp('2%'),
  },
  userRating: {
    fontSize: hp('1.7%'),
  },
  sectionTitle: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  text: {
    fontSize: hp('1.7%'),
    lineHeight: hp('2.4%'),
  },
  descContainer: {
    marginTop: hp('2%'),
  },
  facilitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
    paddingHorizontal: wp('3%'),
  },
  facilityItem: {
    alignItems: 'center',
  },
  facilityText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
  },
  checkInOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    gap: wp('4%'),
  },
  checkCard: {
    flex: 1,
    borderRadius: wp('4%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkTitle: {
    fontSize: hp('1.6%'),
    fontWeight: '600',
    marginTop: hp('0.8%'),
  },
  checkTime: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.3%'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    paddingBottom: hp('5%'),
  },
  priceText: {
    fontSize: hp('2%'),
  },
  priceAmount: {
    fontWeight: 'bold',
    fontSize: hp('2.3%'),
  },
  priceUnit: {
    fontSize: hp('1.7%'),
    color: '#888',
  },
  bookButton: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('5%'),
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },

  container: {
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'relative',
  },
});
