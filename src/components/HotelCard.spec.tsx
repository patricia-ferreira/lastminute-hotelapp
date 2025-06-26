import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { HotelCard } from '../components/HotelCard';
import { Hotel } from '../types/Hotel';

const mockHotel: Hotel = {
  id: 1,
  name: 'Hotel Example',
  location: {
    address: '123 Street',
    city: 'CityName',
    latitude: 0,
    longitude: 0,
  },
  stars: 4.5,
  checkIn: { from: '14:00', to: '22:00' },
  checkOut: { from: '06:00', to: '12:00' },
  contact: {
    phoneNumber: '123456789',
    email: 'email@example.com',
  },
  gallery: ['https://example.com/image.jpg'],
  userRating: 4.3,
  price: 120,
  currency: 'USD',
  distanceToCenter: 1.2,
};

describe('HotelCard', () => {
  it('renders hotel info and handles press', () => {
    const onPressMock = jest.fn();

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <HotelCard hotel={mockHotel} onPress={onPressMock} />
      </NavigationContainer>,
    );

    expect(getByText('Hotel Example')).toBeTruthy();
    expect(getByText('| 4.3')).toBeTruthy();
    expect(getByText('123 Street, CityName')).toBeTruthy();
    expect(getByText(/120\s?US\$/)).toBeTruthy();

    fireEvent.press(getByTestId('hotel-card-touchable'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
