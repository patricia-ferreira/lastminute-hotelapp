export interface Hotel {
  id: number;
  name: string;
  location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  stars: number;
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: {
    from: string;
    to: string;
  };
  contact: {
    phoneNumber: string;
    email: string;
  };
  gallery: string[];
  userRating: number;
  price: number;
  currency: string;
  distanceToCenter: number;
}

export type SortOption = 'priceAsc' | 'ratingDesc' | 'distanceAsc';

export interface HotelFilters {
  query: string;
  minPrice: number | null;
  maxPrice: number | null;
  stars: number[];
  userRatings: number[];
  maxDistance: number | null;
  sortBy: SortOption;
}