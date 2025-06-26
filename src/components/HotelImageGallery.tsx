import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ViewToken,
  Text,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;

export function HotelImageGallery({ gallery }: { gallery: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useTheme();

  const onViewRef = React.useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    },
  );

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      {gallery && gallery.length > 0 ? (
        <>
          <FlatList
            data={gallery}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
          />
          <View style={styles.dotsContainer}>
            {gallery.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex && { backgroundColor: colors.primary },
                ]}
              />
            ))}
          </View>
        </>
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
          <Ionicons name="business-outline" size={40} color="#999" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'relative',
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
});
