import type { City } from '../types/City';

export const cities: City[] = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    center: { latitude: 48.8566, longitude: 2.3522 },
    foods: [
      {
        id: 1,
        name: 'Cheese Platter',
        image: 'https://images.unsplash.com/photo-1627935722051-395636b0d8a5?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'Fresh Baguette',
        image: 'https://images.unsplash.com/photo-1599819055803-717bba43890f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        name: 'Crepes',
        image: 'https://images.unsplash.com/photo-1515467837915-15c4777ba46a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    activities: [
      {
        id: 1,
        name: 'Eiffel Tower Visit',
        image: 'https://images.unsplash.com/photo-1609087361918-cc99d6f604ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'Louvre Museum Tour',
        image: 'https://images.unsplash.com/photo-1567942585146-33d62b775db0?q=80&w=2509&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        name: 'Seine River Cruise',
        image: 'https://images.unsplash.com/photo-1567187155374-cd9135b1f247?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    id: 2,
    name: 'London',
    country: 'UK',
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80',
    center: { latitude: 51.5074, longitude: -0.1278 },
    foods: [
      {
        id: 1,
        name: 'Fish & Chips',
        image: 'https://images.unsplash.com/photo-1706711053549-f52f73a8960c?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'English Breakfast',
        image: 'https://images.unsplash.com/photo-1655979283362-535e6a167a53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        name: 'Afternoon Tea',
        image: 'https://images.unsplash.com/photo-1497800640957-3100979af57c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    activities: [
      {
        id: 1,
        name: 'Big Ben Visit',
        image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'London Eye Ride',
        image: 'https://images.unsplash.com/photo-1510270165035-113679af1ac9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        name: 'British Museum Visit',
        image: 'https://images.unsplash.com/photo-1519056312994-33952f238fac?q=80&w=3062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    id: 3,
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80',
    center: {  latitude: 35.6895, longitude: 139.6917 },
    foods: [
      {
        id: 1,
        name: 'Sushi',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'Ramen',
        image: 'https://images.unsplash.com/photo-1720873915320-84103511b1fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        name: 'Tempura',
        image: 'https://images.unsplash.com/photo-1593357849627-cbbc9fda6b05?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    activities: [
      {
        id: 1,
        name: 'Shinjuku Garden',
        image: 'https://images.unsplash.com/photo-1722591758897-8a59409aeda2?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'Tokyo Tower Night View',
        image: 'https://images.unsplash.com/photo-1716564100974-b3ad6b53290f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        name: 'Tsukiji Market Visit',
        image: 'https://images.unsplash.com/photo-1665846642221-fdb1a793c7f5?q=80&w=2100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    id: 4,
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    center: { latitude: 40.7128, longitude: -74.0060  },
    foods: [
      {
        id: 1,
        name: 'New York Pizza',
        image: 'https://images.unsplash.com/photo-1560202212-441ad59100fd?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'Bagel with Salmon',
        image: 'https://images.unsplash.com/photo-1734809569547-7c9ef0973222?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        name: 'Street Hot Dog',
        image: 'https://images.unsplash.com/photo-1577008507686-7418c4e06774?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    activities: [
      {
        id: 1,
        name: 'Central Park Walk',
        image: 'https://images.unsplash.com/photo-1623593419606-7f9c8c22d736?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'Statue of Liberty Visit',
        image: 'https://images.unsplash.com/photo-1569421899560-a1ae0dc07897?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        name: 'Times Square Night',
        image: 'https://images.unsplash.com/photo-1706752208267-86a9d2573626?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
];
