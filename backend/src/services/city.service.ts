import { City } from "@prisma/client";
import prisma from "../config/prisma";

export class CityError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "CityError";
  }
}

const seedCitiesData = [
  {
    name: "Paris",
    country: "France",
    latitude: 48.8566,
    longitude: 2.3522,
    averageDailyCost: 180,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  },
  {
    name: "Tokyo",
    country: "Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    averageDailyCost: 160,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
  },
  {
    name: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.006,
    averageDailyCost: 220,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
  },
  {
    name: "London",
    country: "United Kingdom",
    latitude: 51.5074,
    longitude: -0.1278,
    averageDailyCost: 190,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
  },
  {
    name: "Rome",
    country: "Italy",
    latitude: 41.9028,
    longitude: 12.4964,
    averageDailyCost: 150,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
  },
  {
    name: "Barcelona",
    country: "Spain",
    latitude: 41.3851,
    longitude: 2.1734,
    averageDailyCost: 140,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    latitude: 25.2048,
    longitude: 55.2708,
    averageDailyCost: 200,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  },
  {
    name: "Singapore",
    country: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
    averageDailyCost: 175,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
  },
  {
    name: "Sydney",
    country: "Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    averageDailyCost: 185,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
  },
  {
    name: "Bangkok",
    country: "Thailand",
    latitude: 13.7563,
    longitude: 100.5018,
    averageDailyCost: 70,
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed",
  },
  {
    name: "Istanbul",
    country: "Turkey",
    latitude: 41.0082,
    longitude: 28.9784,
    averageDailyCost: 90,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
  },
  {
    name: "Lisbon",
    country: "Portugal",
    latitude: 38.7223,
    longitude: -9.1393,
    averageDailyCost: 110,
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a",
  },
] as const;

export const getCities = async (): Promise<City[]> => {
  return prisma.city.findMany({
    orderBy: [{ country: "asc" }, { name: "asc" }],
  });
};

export const searchCities = async (query: string): Promise<City[]> => {
  return prisma.city.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          country: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: [{ country: "asc" }, { name: "asc" }],
  });
};

export const seedCities = async (): Promise<{
  cities: City[];
  createdCount: number;
  skippedCount: number;
}> => {
  const created: City[] = [];
  let skippedCount = 0;

  for (const city of seedCitiesData) {
    const existing = await prisma.city.findFirst({
      where: {
        name: city.name,
        country: city.country,
      },
    });

    if (existing) {
      skippedCount += 1;
      continue;
    }

    const createdCity = await prisma.city.create({
      data: {
        name: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
        averageDailyCost: city.averageDailyCost,
        image: city.image,
      },
    });

    created.push(createdCity);
  }

  return {
    cities: created,
    createdCount: created.length,
    skippedCount,
  };
};
