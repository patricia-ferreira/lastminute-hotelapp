import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Status } from '../redux/slices/hotelSlice';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useTheme: () => ({
    colors: {
      background: '#fff',
      text: '#000',
      card: '#f0f0f0',
      primary: '#007bff',
      border: '#ccc',
    },
  }),
}));

// Mock redux hooks
jest.mock('../redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('HomeScreen', () => {
  const mockedNavigate = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockedNavigate });
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders banner, search input and top recommended hotels', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      list: [
        {
          id: 1,
          name: 'Hotel A',
          location: { city: 'CityA', address: 'Addr A', latitude: 0, longitude: 0 },
          stars: 4,
          userRating: 4.5,
          price: 100,
          currency: 'USD',
          gallery: ['url1'],
          distanceToCenter: 1,
          checkIn: { from: '', to: '' },
          checkOut: { from: '', to: '' },
          contact: { phoneNumber: '', email: '' },
        },
        {
          id: 2,
          name: 'Hotel B',
          location: { city: 'CityB', address: 'Addr B', latitude: 0, longitude: 0 },
          stars: 3,
          userRating: 4.8,
          price: 80,
          currency: 'USD',
          gallery: ['url2'],
          distanceToCenter: 2,
          checkIn: { from: '', to: '' },
          checkOut: { from: '', to: '' },
          contact: { phoneNumber: '', email: '' },
        },
      ],
      status: Status.Idle,
    });

    const { getByPlaceholderText, getByText } = render(<HomeScreen />);

    // Banner texts
    expect(getByText('📍 Your Location')).toBeTruthy();
    expect(getByText('Find the perfect hotel')).toBeTruthy();

    // Search input
    const input = getByPlaceholderText('Search hotel...');
    expect(input).toBeTruthy();

    // Section title - shows "Top Recommended Hotels"
    expect(getByText('Top Recommended Hotels')).toBeTruthy();

    // Hotel names appear
    expect(getByText('Hotel B')).toBeTruthy(); // top rated hotel first
    expect(getByText('Hotel A')).toBeTruthy();
  });

  it('filters hotels based on search query', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      list: [
        {
          id: 1,
          name: 'Hotel A',
          location: { city: 'CityA', address: 'Addr A', latitude: 0, longitude: 0 },
          stars: 4,
          userRating: 4.5,
          price: 100,
          currency: 'USD',
          gallery: ['url1'],
          distanceToCenter: 1,
          checkIn: { from: '', to: '' },
          checkOut: { from: '', to: '' },
          contact: { phoneNumber: '', email: '' },
        },
        {
          id: 2,
          name: 'Hotel B',
          location: { city: 'CityB', address: 'Addr B', latitude: 0, longitude: 0 },
          stars: 3,
          userRating: 4.8,
          price: 80,
          currency: 'USD',
          gallery: ['url2'],
          distanceToCenter: 2,
          checkIn: { from: '', to: '' },
          checkOut: { from: '', to: '' },
          contact: { phoneNumber: '', email: '' },
        },
      ],
      status: Status.Idle,
    });

    const { getByPlaceholderText, queryByText, getByText } = render(<HomeScreen />);

    const input = getByPlaceholderText('Search hotel...');
    fireEvent.changeText(input, 'CityA');

    // Should show Search Results section title
    expect(getByText('Search Results')).toBeTruthy();

    // Hotel A should appear (matches CityA)
    expect(getByText('Hotel A')).toBeTruthy();

    // Hotel B should not appear
    expect(queryByText('Hotel B')).toBeNull();
  });

  it('shows "No hotels found" when search yields no results', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      list: [],
      status: Status.Idle,
    });

    const { getByPlaceholderText, getByText } = render(<HomeScreen />);

    const input = getByPlaceholderText('Search hotel...');
    fireEvent.changeText(input, 'Nonexistent');

    expect(getByText('No hotels found')).toBeTruthy();
  });

  it('dispatches fetchHotels when status is Idle', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      list: [],
      status: Status.Idle,
    });

    render(<HomeScreen />);

    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('navigates to HotelDetailScreen on hotel press', async () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      list: [
        {
          id: 1,
          name: 'Hotel A',
          location: { city: 'CityA', address: 'Addr A', latitude: 0, longitude: 0 },
          stars: 4,
          userRating: 4.5,
          price: 100,
          currency: 'USD',
          gallery: ['url1'],
          distanceToCenter: 1,
          checkIn: { from: '', to: '' },
          checkOut: { from: '', to: '' },
          contact: { phoneNumber: '', email: '' },
        },
      ],
      status: Status.Idle,
    });

    const { getByText } = render(<HomeScreen />);

    const hotelItem = getByText('Hotel A');
    fireEvent.press(hotelItem);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('HotelDetailScreen', {
        hotel: expect.objectContaining({ id: 1 }),
      });
    });
  });

  it('navigates to CityScreen on city press', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      list: [],
      status: Status.Idle,
    });

    // Import cities mock so we can check city name from it
    const { cities } = require('../mocks/cities');

    const { getByText } = render(<HomeScreen />);

    // Should show city name from mock
    const cityName = cities[0].name;
    const cityButton = getByText(cityName);

    fireEvent.press(cityButton);

    expect(mockedNavigate).toHaveBeenCalledWith('CityScreen', { cityName });
  });
});
