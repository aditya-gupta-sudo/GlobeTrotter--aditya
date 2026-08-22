import { apiFetch } from "@/lib/api";

export type CityBudgetBreakdown = {
  cityId: string;
  cityName: string;
  country: string;
  stopId: string;
  stopOrder: number;
  days: number;
  averageDailyCost: number;
  stayCost: number;
  activitiesCost: number;
  totalCost: number;
};

export type TripBudget = {
  tripCost: number;
  dailyAverage: number;
  activitiesCost: number;
  estimatedStayCost: number;
  cityBreakdown: CityBudgetBreakdown[];
};

export async function getTripBudget(tripId: string): Promise<TripBudget> {
  return apiFetch<TripBudget>(`/api/budget/trip/${tripId}`);
}
