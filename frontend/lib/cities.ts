import { apiFetch } from "@/lib/api";

export type City = {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  averageDailyCost: number;
  image: string | null;
};

export async function listCities(): Promise<City[]> {
  const data = await apiFetch<{ cities: City[] }>("/api/cities");
  return data.cities;
}

export async function searchCities(query: string): Promise<City[]> {
  const data = await apiFetch<{ cities: City[] }>(
    `/api/cities/search?q=${encodeURIComponent(query)}`
  );
  return data.cities;
}
