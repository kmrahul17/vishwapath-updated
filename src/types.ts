// Basic Types
export type Location = 'Earth' | 'Mars' | 'Moon' | 'ISS' | 'Space Hotel';
export type Safety = 'Good' | 'Moderate' | 'Caution' | 'Warning';
export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';
export type BookingEventType = 'create' | 'update' | 'cancel';

// Location and Coordinates
export interface LocationCoordinates extends Record<Location, [number, number, number]> {}
export interface ModelScale extends Record<Location, number> {}

// Vehicle Types
export interface Vehicle {
  name: string;
  capacity: number;
  pricePerPerson: number;
  image: string;
  description: string;
  features: string[];
  estimatedTime: string;
}

export interface VehicleConfig {
  baseCost: number;
  operatingCost: number;
  maxCapacity: number;
  riskFactor: number;
}

export interface VehicleConfiguration {
  speeds: Record<string, number>;
  capacities: Record<string, number>;
  risks: Record<string, number>;
}

// Booking Types
export interface BookingDetails {
  id?: string;
  from: Location;
  to: Location;
  journeyDate: string;
  vehicle: string;
  passengers: number;
  totalPrice: number;
  status?: BookingStatus;
  bookingDate?: string;
  addOns?: string[]; // Added addOns property
  aiRecommendations?: string[];
}

export interface Booking {
  id: string;
  from: Location;
  to: Location;
  vehicle: string;
  passengers: number;
  journeyDate: string;
  totalPrice: number;
  status: BookingStatus;
  bookingDate: string;
}

export interface BookingState {
  currentBooking: BookingDetails | null;
  bookingHistory: Booking[];
  isLoading: boolean;
  error: string | null;
}

export interface BookingEvent {
  type: BookingEventType;
  booking: BookingDetails;
  timestamp: string;
}

// Weather Types
export interface WeatherCondition {
  location: Location;
  condition: string;
  temperature: number;
  radiation: string;
  safety: Safety;
}

// API Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Route Types
export interface RouteDistance {
  from: Location;
  to: Location;
  distance: number;
}

// Emission Types
export interface EmissionData {
  emission: number;
  unit: string;
  recommendations: string[];
  efficiency_score?: number;
  environmental_impact?: string;
}

// Calculation Types
export interface PriceCalculation {
  basePrice: number;
  distanceCost: number;
  riskPremium: number;
  totalPrice: number;
  pricePerPerson: number;
}

export interface DurationCalculation {
  hours: number;
  formatted: string;
  speedKmH: number;
}

// Utility Types
export type RecordString<T> = Record<string, T>;
export type LocationRecord<T> = Record<Location, T>;

// Validation Types
export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

// Type Guards
export const isLocation = (value: string): value is Location => {
  return ['Earth', 'Mars', 'Moon', 'ISS', 'Space Hotel'].includes(value);
};

export const isBookingStatus = (value: string): value is BookingStatus => {
  return ['upcoming', 'completed', 'cancelled'].includes(value);
};

export const isSafety = (value: string): value is Safety => {
  return ['Good', 'Moderate', 'Caution', 'Warning'].includes(value);
};

// Constants
export const LOCATIONS: readonly Location[] = [
  'Earth',
  'Mars',
  'Moon',
  'ISS',
  'Space Hotel'
] as const;

export const BOOKING_STATUSES: readonly BookingStatus[] = [
  'upcoming',
  'completed',
  'cancelled'
] as const;

export const SAFETY_LEVELS: readonly Safety[] = [
  'Good',
  'Moderate',
  'Caution',
  'Warning'
] as const;

// Utility Functions
export const createApiResponse = <T>(data: T, success = true, error?: string): ApiResponse<T> => ({
  data,
  success,
  error
});

export const createValidationResult = (isValid: boolean, errors?: string[]): ValidationResult => ({
  isValid,
  errors
});