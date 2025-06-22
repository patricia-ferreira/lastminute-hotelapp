import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Hotel } from '../types/Hotel';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/formatPrice';

interface Props {
  hotel: Hotel;
  onPress: () => void;
}

export function HotelCard({ hotel, onPress }: Props) {
  const { colors } = useTheme();
  const [imageIndex, setImageIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  const gallery = hotel.gallery || [];
  const hasImages = gallery.length > 0;

  const handleImageError = () => {
    if (imageIndex + 1 < gallery.length) {
      setImageIndex(i => i + 1);
    } else {
      setImageFailed(true);
    }
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
        size={14}
        color="#FFD700"
      />
    ));

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {!hasImages || imageFailed ? (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={48} color="#aaa" />
          </View>
        ) : (
          <Image
            source={{ uri: gallery[imageIndex] }}
            style={styles.image}
            resizeMode="cover"
            onError={handleImageError}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {hotel.name}
          </Text>
          <View style={styles.stars}>{renderStars()}</View>
        </View>

        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={14} color="#aaa" />
          <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
            {hotel.location.address}, {hotel.location.city}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>
            <Text style={styles.priceValue}>
              {formatPrice(hotel.price, hotel.currency)}
            </Text>
            <Text style={styles.priceSuffix}> /night</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1,
    marginRight: 8,
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  address: {
    marginLeft: 4,
    fontSize: 13,
    color: '#888',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53935',
  },
  priceSuffix: {
    fontSize: 14,
    color: '#999',
  },
});
