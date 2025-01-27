import { Location } from '../types';

// Types and Interfaces
interface DistanceMap extends Record<string, number> {}

interface VehicleConfig {
  baseCost: number;
  operatingCost: number;
  maxCapacity: number;
  riskFactor: number;
}

interface VehicleCosts extends Record<string, VehicleConfig> {}
interface VehicleSpeed extends Record<string, number> {}
interface VehicleDuration extends Record<string, string> {}
interface DestinationRiskMap extends Record<Location, number> {}

// Constants
export const DISTANCES: DistanceMap = {
  // Earth routes
  'Earth-Mars': 225000000,
  'Earth-Moon': 384400,
  'Earth-ISS': 400,
  'Earth-Space Hotel': 100000,
  // Mars routes
  'Mars-Earth': 225000000,
  'Mars-Moon': 220000,
  'Mars-ISS': 225000,
  'Mars-Space Hotel': 100000,
  // Moon routes
  'Moon-Earth': 384400,
  'Moon-Mars': 220000,
  'Moon-ISS': 384400,
  'Moon-Space Hotel': 50000,
  // ISS routes
  'ISS-Earth': 400,
  'ISS-Mars': 225000,
  'ISS-Moon': 384400,
  'ISS-Space Hotel': 50000,
  // Space Hotel routes
  'Space Hotel-Earth': 100000,
  'Space Hotel-Mars': 100000,
  'Space Hotel-Moon': 50000,
  'Space Hotel-ISS': 50000
} as const;

export const VEHICLE_COSTS: VehicleCosts = {
  'American Express Space Shuttle': {
    baseCost: 500000000,    // $500M base cost
    operatingCost: 2000000, // $2M per 1000km
    maxCapacity: 20,
    riskFactor: 1.2
  },
  'Netflix Space Taxi': {
    baseCost: 200000000,    // $200M base cost
    operatingCost: 1000000, // $1M per 1000km
    maxCapacity: 6,
    riskFactor: 1.5
  },
  'Vistara Space Pod': {
    baseCost: 100000000,    // $100M base cost
    operatingCost: 500000,  // $500K per 1000km
    maxCapacity: 2,
    riskFactor: 1.8
  }
} as const;

const DESTINATION_RISK: DestinationRiskMap = {
  'Earth': 1.0,
  'Moon': 1.5,
  'Mars': 2.5,
  'ISS': 1.2,
  'Space Hotel': 1.3
} as const;

const VEHICLE_SPEEDS: VehicleSpeed = {
  'American Express Space Shuttle': 28000, // km/h
  'Netflix Space Taxi': 30000,    // km/h
  'Vistara Space Pod': 32000      // km/h
} as const;

const ISS_ROUTE_DURATIONS: VehicleDuration = {
  'American Express Space Shuttle': '10 hours',
  'Netflix Space Taxi': '8 hours',
  'Vistara Space Pod': '6 hours'
} as const;

// Helper Functions
const getRouteKey = (from: Location, to: Location): keyof typeof DISTANCES => {
  const route = `${from}-${to}` as keyof typeof DISTANCES;
  const reverseRoute = `${to}-${from}` as keyof typeof DISTANCES;
  return DISTANCES[route] !== undefined ? route : reverseRoute;
};

const formatDuration = (hours: number): string => {
  if (hours < 24) {
    return `${Math.round(hours)} hours`;
  }
  if (hours < 720) {
    const days = Math.floor(hours / 24);
    const remainingHours = Math.round(hours % 24);
    return `${days} days ${remainingHours} hours`;
  }
  return `${Math.round(hours / 720)} months`;
};

// Main Functions
export const calculatePrice = (
  from: Location,
  to: Location,
  vehicleName: keyof typeof VEHICLE_COSTS,
  passengers: number
): number => {
  const routeKey = getRouteKey(from, to);
  const distance = DISTANCES[routeKey];
  const vehicle = VEHICLE_COSTS[vehicleName];

  if (!distance || !vehicle) return 0;

  const baseCost = vehicle.baseCost;
  const operatingCost = (distance / 1000) * vehicle.operatingCost;
  const riskCost = vehicle.riskFactor * DESTINATION_RISK[to];

  // Calculate price per person
  const perPersonCost = (baseCost + operatingCost) * riskCost / vehicle.maxCapacity;

  // Return total cost for all passengers
  return Math.round(perPersonCost * passengers);
};

export const calculateDuration = (
  from: Location,
  to: Location,
  vehicleName: keyof typeof VEHICLE_SPEEDS
): string => {
  // Special case for Earth-ISS route
  if ((from === 'Earth' && to === 'ISS') || (from === 'ISS' && to === 'Earth')) {
    return ISS_ROUTE_DURATIONS[vehicleName] || 'Duration unavailable';
  }

  // For other routes, calculate based on distance and speed
  const routeKey = getRouteKey(from, to);
  const distance = DISTANCES[routeKey];
  const speed = VEHICLE_SPEEDS[vehicleName];

  if (!distance || !speed) {
    return 'Duration unavailable';
  }

  const hours = distance / speed;
  return formatDuration(hours);
};
