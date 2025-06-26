export interface Food {
  id: number;
  name: string;
  image: string;
}

export interface Activity {
  id: number;
  name: string;
  image: string;
}

export interface City {
  id: number;
  name: string;
  country: string;
  image: string;
  center: {
    latitude: number;
    longitude: number;
  };
  foods: Food[];
  activities: Activity[];
}
