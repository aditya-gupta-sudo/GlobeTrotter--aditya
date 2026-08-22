import { apiFetch } from "@/lib/api";

export type ItineraryActivity = {
  title: string;
  startTime: string | null;
  estimatedCost: number;
  category: string;
};

export type ItineraryCity = {
  id: string;
  name: string;
  country: string;
};

export type ItineraryDay = {
  date: string;
  city: ItineraryCity;
  activities: ItineraryActivity[];
};

export async function getTripItinerary(tripId: string): Promise<ItineraryDay[]> {
  const data = await apiFetch<{ itinerary: ItineraryDay[] }>(
    `/api/itinerary/trip/${tripId}`
  );

  return data.itinerary;
}
