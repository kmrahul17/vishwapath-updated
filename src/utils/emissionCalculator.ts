import { EmissionPrediction } from '../types/emission';

export const predictEmission = async (
  distance: number,
  vehicleType: string,
  passengers: number
): Promise<EmissionPrediction> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_ML_API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ distance, vehicle_type: vehicleType, passengers })
    });
    return await response.json();
  } catch (error) {
    console.error('Error predicting emissions:', error);
    return {
      emission: 0,
      unit: 'tons CO2',
      recommendations: ['Unable to calculate emissions']
    };
  }
};