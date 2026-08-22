import { apiFetch } from "@/lib/api";

export type Activity = {
  id: string;
  cityId: string;
  title: string;
  description: string | null;
  category: string;
  duration: number;
  estimatedCost: number;
  image: string | null;
};

export async function listActivities(): Promise<Activity[]> {
  const data = await apiFetch<{ activities: Activity[] }>("/api/activities");
  return data.activities;
}

export async function searchActivities(query: string): Promise<Activity[]> {
  const data = await apiFetch<{ activities: Activity[] }>(
    `/api/activities/search?q=${encodeURIComponent(query)}`
  );
  return data.activities;
}

export async function listActivitiesByCity(cityId: string): Promise<Activity[]> {
  const data = await apiFetch<{ activities: Activity[] }>(
    `/api/activities/city/${cityId}`
  );
  return data.activities;
}

export async function assignActivityToStop(
  stopId: string,
  payload: { activityId: string; dayNumber?: number }
): Promise<void> {
  await apiFetch(`/api/stops/${stopId}/activity`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function removeActivityFromStop(
  stopId: string,
  activityId: string
): Promise<void> {
  await apiFetch<Record<string, never>>(
    `/api/stops/${stopId}/activity/${activityId}`,
    { method: "DELETE" }
  );
}
