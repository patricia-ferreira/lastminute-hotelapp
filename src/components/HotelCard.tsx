import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Hotel } from '../types/Hotel';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/formatPrice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {hotel.gallery && hotel.gallery.length > 0 ? (
        <Image
          source={{ uri: hotel.gallery[0] }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              backgroundColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Ionicons name="business-outline" size={hp('5%')} color="#999" />
        </View>
      )}

      <View style={styles.content}>
        <Text
          style={[styles.title, { color: colors.text }]}
          numberOfLines={1}
          ellipsizeMode="tail"
          adjustsFontSizeToFit
        >
          {hotel.name}
        </Text>

        <View style={styles.ratingRow}>
          <View style={styles.stars}>{renderStars()}</View>
          <Text
            style={[
              styles.userRating,
              { color: colors.text, marginLeft: wp('2%') },
            ]}
          >
            | {hotel.userRating.toFixed(1)} (based on user reviews)
          </Text>
        </View>

        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={hp('2%')}
            color={colors.text}
          />
          <Text
            style={[styles.address, { color: colors.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
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
    width: wp('90%'),
    alignSelf: 'center',
    borderRadius: wp('4%'),
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: hp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: wp('1%'),
    shadowOffset: { width: 0, height: hp('0.2%') },
  },
  image: {
    width: '100%',
    height: hp('20%'),
  },
  content: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  title: {
    fontSize: hp('2.5%'),
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5%'),
  },
  stars: {
    flexDirection: 'row',
  },
  userRating: {
    marginLeft: wp('2%'),
    fontSize: hp('2%'),
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  address: {
    marginLeft: wp('1%'),
    fontSize: hp('1.8%'),
    flexShrink: 1,
  },
  priceRow: {
    flexDirection: 'row',
    marginTop: hp('1.5%'),
    alignItems: 'center',
  },
  priceValue: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  priceSuffix: {
    fontSize: hp('1.8%'),
    marginLeft: wp('1%'),
  },
});
