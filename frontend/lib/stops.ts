import { apiFetch } from "@/lib/api";

export type TripStop = {
  id: string;
  tripId: string;
  cityId: string;
  arrivalDate: string;
  departureDate: string;
  stopOrder: number;
};

export type CreateStopPayload = {
  cityId: string;
  arrivalDate: string;
  departureDate: string;
  stopOrder: number;
};

export async function listTripStops(tripId: string): Promise<TripStop[]> {
  const data = await apiFetch<{ stops: TripStop[] }>(
    `/api/trips/${tripId}/stops`
  );
  return data.stops;
}

export async function createTripStop(
  tripId: string,
  payload: CreateStopPayload
): Promise<TripStop> {
  const data = await apiFetch<{ stop: TripStop }>(
    `/api/trips/${tripId}/stops`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  return data.stop;
}

export async function deleteTripStop(stopId: string): Promise<void> {
  await apiFetch<Record<string, never>>(`/api/stops/${stopId}`, {
    method: "DELETE",
  });
}
