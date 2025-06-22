import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Hotel } from '../types/Hotel';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/formatPrice';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.9;
const SPACING = 16;

type RouteParams = {
  hotel: Hotel;
};

export default function HotelDetailsScreen() {
  const { params } = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { hotel } = params;
  const { colors } = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (IMAGE_WIDTH + SPACING)
    );
    setActiveIndex(index);
  };

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
        size={16}
        color="#FFD700"
      />
    ));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ position: 'relative' }}>
        <FlatList
          data={hotel.gallery}
          horizontal
          pagingEnabled={false}
          snapToInterval={IMAGE_WIDTH + SPACING}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={[styles.image, { width: IMAGE_WIDTH }]}
              resizeMode="cover"
            />
          )}
          contentContainerStyle={{ paddingHorizontal: (width - IMAGE_WIDTH) / 2 }}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />

        <View style={styles.dotsOverlay}>
          {hotel.gallery.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === activeIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{hotel.name}</Text>
        <View style={styles.row}>{renderStars()}</View>

        <View style={styles.section}>
          <Ionicons name="location-outline" size={16} color={colors.text} />
          <Text style={[styles.text, { color: colors.text }]}>
            {hotel.location.address}, {hotel.location.city}
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="call-outline" size={16} color={colors.text} />
          <Text style={[styles.text, { color: colors.text }]}>
            {hotel.contact.phoneNumber}
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="mail-outline" size={16} color={colors.text} />
          <Text style={[styles.text, { color: colors.text }]}>{hotel.contact.email}</Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="calendar-outline" size={16} color={colors.text} />
          <Text style={[styles.text, { color: colors.text }]}>
            Check-in: {hotel.checkIn.from} - {hotel.checkIn.to}
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="log-out-outline" size={16} color={colors.text} />
          <Text style={[styles.text, { color: colors.text }]}>
            Check-out: {hotel.checkOut.from} - {hotel.checkOut.to}
          </Text>
        </View>

        <View style={[styles.section, styles.priceRow]}>
          <Text style={[styles.price, { color: colors.primary }]}>
            {formatPrice(hotel.price, hotel.currency)} /night
          </Text>
          <Text style={[styles.rating, { color: colors.text }]}>
            User Rating: {hotel.userRating}/10
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 250,
    borderRadius: 12,
    marginRight: SPACING,
  },
  dotsOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 12,
    marginHorizontal: SPACING / 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    marginLeft: 8,
    fontSize: 15,
  },
  priceRow: {
    marginTop: 16,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
  },
});
