import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Hotel } from '../types/Hotel';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/formatPrice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeImage from './SafeImage';

interface Props {
  hotel: Hotel;
  onPress: () => void;
}

export function HotelCard({ hotel, onPress }: Props) {
  const { colors } = useTheme();

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

  return (
    <TouchableOpacity
      testID="hotel-card-touchable"
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <SafeImage
        source={hotel.gallery[0]}
        style={styles.image}
        resizeMode={'cover'}
      />

      <View style={styles.content}>
        <Text
          style={[styles.title, { color: colors.text }]}
          numberOfLines={2}
          ellipsizeMode="tail"
          adjustsFontSizeToFit
        >
          {hotel.name}
        </Text>

        <View style={styles.ratingRow}>
          <View style={styles.stars}>{renderStars()}</View>
          <Text style={[styles.userRating, { color: colors.text }]}>
            | {hotel.userRating.toFixed(1)}
          </Text>
        </View>

        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={hp('2%')}
            color={colors.text}
            style={styles.locationIcon}
          />
          <Text
            style={[styles.address, { color: colors.text }]}
            numberOfLines={2}
            ellipsizeMode="tail"
            adjustsFontSizeToFit
          >
            {hotel.location.address}, {hotel.location.city}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={[styles.priceValue, { color: colors.primary }]}>
            {formatPrice(hotel.price, hotel.currency)}
          </Text>
          <Text style={[styles.priceSuffix, { color: colors.text }]}>
            /night
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: hp('20%'),
    width: wp('90%'),
    alignSelf: 'center',
    borderRadius: wp('4%'),
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: hp('2.5%'),
    backgroundColor: '#fff',
  },
  image: {
    width: '40%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: hp('2.2%'),
    fontWeight: '700',
    flexShrink: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
  },
  userRating: {
    marginLeft: wp('2%'),
    fontSize: hp('1.8%'),
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginTop: hp('0.2%'),
  },
  address: {
    marginLeft: wp('1%'),
    fontSize: hp('1.6%'),
    flexShrink: 1,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceValue: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  priceSuffix: {
    fontSize: hp('1.6%'),
    marginLeft: wp('1%'),
  },
});
