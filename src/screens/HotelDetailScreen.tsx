import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  RouteProp,
  useRoute,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/formatPrice';
import { HotelImageGallery } from '../components/HotelImageGallery';
import { Hotel } from '../types/Hotel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type RouteParams = {
  hotel: Hotel;
};

export default function HotelDetailsScreen() {
  const { params } = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { hotel } = params;
  const { colors } = useTheme();
  const navigation = useNavigation();

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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.imageContainer}>
        <HotelImageGallery gallery={hotel.gallery} />
        <Pressable
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            { backgroundColor: '#00000080' }, 
          ]}
        >
          <Ionicons name="arrow-back" size={hp('3%')} color="#fff" />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingTop: hp('6%') }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[styles.cardContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>{hotel.name}</Text>

          <View style={styles.addressRow}>
            <Text style={[styles.addressText, { color: colors.text }]}>
              {hotel.location.address}, {hotel.location.city}
            </Text>
            <TouchableOpacity onPress={openMap}>
              <Ionicons
                name="navigate-circle-outline"
                size={hp('2.4%')}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.stars}>{renderStars()}</View>
            <Text style={[styles.userRating, { color: colors.text }]}>
              | {hotel.userRating.toFixed(1)} (based on user reviews)
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Description
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt nisl vitae semper aliquam.
          </Text>

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
                <Ionicons name={icon} size={hp('3%')} color={colors.primary} />
                <Text style={[styles.facilityText, { color: colors.text }]}>
                  {label}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.checkInOutContainer}>
            <View style={[styles.checkCard, { backgroundColor: colors.border }]}>
              <Ionicons name="calendar-outline" size={hp('3%')} color={colors.primary} />
              <Text style={[styles.checkTitle, { color: colors.text }]}>Check-in</Text>
              <Text style={[styles.checkTime, { color: colors.text }]}>
                {hotel.checkIn.from} - {hotel.checkIn.to}
              </Text>
            </View>
            <View style={[styles.checkCard, { backgroundColor: colors.border }]}>
              <Ionicons name="log-out-outline" size={hp('3%')} color={colors.primary} />
              <Text style={[styles.checkTitle, { color: colors.text }]}>Check-out</Text>
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
    height: hp('35%'),
    overflow: 'hidden',
    borderBottomLeftRadius: wp('8%'),
    borderBottomRightRadius: wp('8%'),
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: hp('5%'),
    left: wp('4%'),
    borderRadius: wp('6%'),
    padding: hp('1%'),
    zIndex: 10,
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
    elevation: 3,
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.2%'),
  },
  addressText: {
    fontSize: hp('1.8%'),
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
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
    marginTop: hp('2%'),
    marginBottom: hp('0.8%'),
  },
  text: {
    fontSize: hp('1.7%'),
    lineHeight: hp('2.4%'),
  },
  facilitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
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
});
