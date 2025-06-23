import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SortOption } from '../types/Hotel';

const OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Price (lowest first)', value: 'priceAsc' },
  { label: 'Price (highest first)', value: 'priceDesc' },
  { label: 'Rating (lowest first)', value: 'ratingAsc' },
  { label: 'Rating (highest first)', value: 'ratingDesc' },
  { label: 'Stars (fewest first)', value: 'starsAsc' },
  { label: 'Stars (most first)', value: 'starsDesc' },
  { label: 'Distance (closest first)', value: 'distanceAsc' },
  { label: 'Distance (farthest first)', value: 'distanceDesc' },
];

type Props = {
  visible: boolean;
  selected: SortOption;
  onSelect: (opt: SortOption) => void;
  onClose: () => void;
};

export default function SortModal({
  visible,
  selected,
  onSelect,
  onClose,
}: Props) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={[styles.modal, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Sort by</Text>
        {OPTIONS.map(o => (
          <TouchableOpacity
            key={o.value}
            style={[
              styles.option,
              selected === o.value && { backgroundColor: colors.primary },
            ]}
            onPress={() => onSelect(o.value)}
          >
            <Text
              style={{ color: selected === o.value ? '#fff' : colors.text }}
            >
              {o.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  modal: {
    position: 'absolute',
    top: 80,
    right: 16,
    width: 220,
    padding: 12,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
});
