import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/formatPrice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';

interface HotelBoxProps {
  hotel: {
    name: string;
    location: { city: string };
    price: number;
    currency: string;
    stars: number;
    gallery: string[];
  };
  onPress?: () => void;
}

function OverlayContent({
  hotel,
  colors,
}: {
  hotel: HotelBoxProps['hotel'];
  colors: any;
}) {
  return (
    <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.65)' }]}>
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
          <Text style={[styles.priceSuffix, { color: '#FFFFFF' }]}>/night</Text>
        </View>
        <View style={styles.starsRow}>
          <Ionicons name="star" size={hp('2%')} color="#FFD700" />
          <Text style={[styles.starsText, { color: '#FFFFFF' }]}>
            {Math.floor(hotel.stars)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function HotelBox({ hotel, onPress }: HotelBoxProps) {
  const { colors } = useTheme();

  const hasImage =
    hotel.gallery && hotel.gallery.length > 0 && hotel.gallery[0];

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {hasImage ? (
        <ImageBackground
          source={{ uri: hotel.gallery[0] }}
          style={styles.image}
          imageStyle={{ borderRadius: wp('3%') }}
        >
          <OverlayContent hotel={hotel} colors={colors} />
        </ImageBackground>
      ) : (
        <View
          style={[
            styles.image,
            { backgroundColor: '#ccc', borderRadius: wp('3%') },
          ]}
        >
          <View style={styles.placeholderIconContainer}>
            <Ionicons name="business-outline" size={hp('5%')} color="#999" />
          </View>
          <OverlayContent hotel={hotel} colors={colors} />
        </View>
      )}
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
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
    borderBottomLeftRadius: wp('3%'),
    borderBottomRightRadius: wp('3%'),
  },
  hotelName: {
    fontWeight: '700',
    fontSize: hp('1.5%'),
    lineHeight: hp('2.1%'),
    minHeight: hp('4.2%'),
  },
  city: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.3%'),
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
    flexShrink: 1,
  },
  priceSuffix: {
    fontSize: hp('1.4%'),
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsText: {
    marginLeft: wp('1%'),
    fontSize: hp('1.4%'),
  },
  placeholderIconContainer: {
    position: 'absolute',
    top: hp('10%'),
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
});
