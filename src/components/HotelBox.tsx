import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/formatPrice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import SafeImage from './SafeImage';
import { Hotel } from '../types/Hotel';

interface HotelBoxProps {
  hotel: Hotel;
  onPress?: () => void;
}

export function HotelBox({ hotel, onPress }: HotelBoxProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <SafeImage
        source={hotel.gallery?.[0]}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <Text
          style={[styles.hotelName, { color: '#FFFFFF' }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {hotel.name}
        </Text>
        <Text style={[styles.city, { color: '#DDDDDD' }]} numberOfLines={1}>
          {hotel.location.city}
        </Text>
        <View style={styles.priceStarsRow}>
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.primary }]}>
              {formatPrice(hotel.price, hotel.currency)}
            </Text>
            <Text style={[styles.priceSuffix, { color: '#FFFFFF' }]}>
              /night
            </Text>
          </View>
          <View style={styles.starsRow}>
            <Ionicons name="star" size={hp('2%')} color="#FFD700" />
            <Text style={[styles.starsText, { color: '#FFFFFF' }]}>
              {Math.floor(hotel.stars)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('40%'),
    height: hp('30%'),
    marginRight: wp('3%'),
    borderRadius: wp('3%'),
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  hotelName: {
    fontWeight: '700',
    fontSize: hp('1.5%'),
    lineHeight: hp('2.1%'),
    minHeight: hp('4.2%'),
    color: '#FFFFFF',
  },
  city: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.3%'),
    color: '#DDDDDD',
  },
  priceStarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('0.5%'),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: hp('1.4%'),
  },
  priceSuffix: {
    fontSize: hp('1.4%'),
    color: '#FFFFFF',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsText: {
    marginLeft: wp('1%'),
    fontSize: hp('1.4%'),
    color: '#FFFFFF',
  },
});
