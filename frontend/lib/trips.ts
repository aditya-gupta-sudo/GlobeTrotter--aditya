import { apiFetch } from "@/lib/api";

export type TripVisibility = "PUBLIC" | "PRIVATE";

export type TripStatus = "Ongoing" | "Upcoming" | "Completed";

export type Trip = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  startDate: string;
  endDate: string;
  visibility: TripVisibility;
  createdAt: string;
};

export type CreateTripPayload = {
  title: string;
  description?: string | null;
  coverImage?: string | null;
  startDate: string;
  endDate: string;
  visibility?: TripVisibility;
};

export type UpdateTripPayload = {
  title?: string;
  description?: string | null;
  coverImage?: string | null;
  startDate?: string;
  endDate?: string;
  visibility?: TripVisibility;
};

export async function listTrips(): Promise<Trip[]> {
  const data = await apiFetch<{ trips: Trip[] }>("/api/trips");
  return data.trips;
}

export async function getTrip(tripId: string): Promise<Trip> {
  const data = await apiFetch<{ trip: Trip }>(`/api/trips/${tripId}`);
  return data.trip;
}

export async function createTrip(payload: CreateTripPayload): Promise<Trip> {
  const data = await apiFetch<{ trip: Trip }>("/api/trips", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.trip;
}

export async function updateTrip(
  tripId: string,
  payload: UpdateTripPayload
): Promise<Trip> {
  const data = await apiFetch<{ trip: Trip }>(`/api/trips/${tripId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.trip;
}

export async function deleteTrip(tripId: string): Promise<void> {
  await apiFetch<Record<string, never>>(`/api/trips/${tripId}`, {
    method: "DELETE",
  });
}

export function getTripStatus(startDate: string, endDate: string): TripStatus {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Upcoming";
  }

  if (now > end) {
    return "Completed";
  }

  if (now < start) {
    return "Upcoming";
  }

  return "Ongoing";
}

export function formatTripDates(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "";
  }

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

export function toDateInputValue(value: string): string {
  return value.slice(0, 10);
}
