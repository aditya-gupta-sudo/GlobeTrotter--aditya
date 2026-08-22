import { Activity, Prisma, TripActivity } from "@prisma/client";
import prisma from "../config/prisma";
import type { AssignActivityInput } from "../validators/activity.validator";

export class ActivityError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "ActivityError";
  }
}

type SeedActivity = {
  title: string;
  description: string;
  category: string;
  duration: number;
  estimatedCost: number;
  image: string;
};

const seedActivitiesByCity: Record<string, SeedActivity[]> = {
  sydney: [
    {
      title: "Sydney Opera House",
      description:
        "Take a guided tour of the iconic sails, then catch a performance in one of the harbourside venues.",
      category: "Landmark",
      duration: 120,
      estimatedCost: 45,
      image: "https://images.unsplash.com/photo-1528072164453-f1e6e00c4070",
    },
    {
      title: "Harbour Bridge Climb",
      description:
        "Climb the Sydney Harbour Bridge for panoramic views of the Opera House, Circular Quay, and the harbour.",
      category: "Adventure",
      duration: 180,
      estimatedCost: 174,
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
    },
    {
      title: "Bondi Beach",
      description:
        "Spend the afternoon on Bondi’s golden sand, swim between the flags, and walk the Bondi to Coogee coastal trail.",
      category: "Beach",
      duration: 180,
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
    },
    {
      title: "The Rocks Markets",
      description:
        "Browse weekend stalls in Sydney’s oldest neighborhood for local crafts, street food, and harbour views.",
      category: "Culture",
      duration: 90,
      estimatedCost: 25,
      image: "https://images.unsplash.com/photo-1526481280695-3c469806e91f",
    },
  ],
  paris: [
    {
      title: "Eiffel Tower",
      description:
        "Visit the Champ de Mars and ascend the Eiffel Tower for sunset views over the Seine and Paris rooftops.",
      category: "Landmark",
      duration: 150,
      estimatedCost: 29,
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    },
    {
      title: "Louvre Museum",
      description:
        "Explore masterpieces including the Mona Lisa, Venus de Milo, and the museum’s vast European collections.",
      category: "Museum",
      duration: 180,
      estimatedCost: 22,
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
    },
    {
      title: "Seine Cruise",
      description:
        "Cruise the Seine past Notre-Dame, Musée d’Orsay, and illuminated bridges on an evening river tour.",
      category: "Cruise",
      duration: 75,
      estimatedCost: 18,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
      title: "Montmartre Walk",
      description:
        "Wander Sacré-Cœur, Place du Tertre, and the hillside streets of Montmartre with a café stop along the way.",
      category: "Culture",
      duration: 120,
      estimatedCost: 15,
      image: "https://images.unsplash.com/photo-1509439581779-6298f75bf6e1",
    },
  ],
  tokyo: [
    {
      title: "Shibuya Crossing",
      description:
        "Watch the world’s busiest scramble crossing from the scramble square, then explore Shibuya’s side streets.",
      category: "Landmark",
      duration: 60,
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    },
    {
      title: "Tokyo Skytree",
      description:
        "Ride to the Tembo Deck for skyline views over Tokyo Bay, Asakusa, and Mount Fuji on a clear day.",
      category: "Viewpoint",
      duration: 90,
      estimatedCost: 25,
      image: "https://images.unsplash.com/photo-1536098562208-9d749cfeec7f",
    },
    {
      title: "Akihabara",
      description:
        "Dive into electronics, anime shops, and themed cafés in Tokyo’s electric town.",
      category: "Shopping",
      duration: 150,
      estimatedCost: 40,
      image: "https://images.unsplash.com/photo-1526481280695-3c469806e91f",
    },
    {
      title: "Senso-ji Temple",
      description:
        "Walk Nakamise-dori to Senso-ji in Asakusa, Tokyo’s oldest temple, and try street snacks nearby.",
      category: "Culture",
      duration: 90,
      estimatedCost: 10,
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
    },
  ],
  rome: [
    {
      title: "Colosseum",
      description:
        "Tour the ancient amphitheatre and learn how gladiatorial games shaped Imperial Rome.",
      category: "Landmark",
      duration: 120,
      estimatedCost: 18,
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    },
    {
      title: "Vatican Museums",
      description:
        "Visit St. Peter’s Basilica, the Sistine Chapel, and the Vatican Museums’ Raphael Rooms.",
      category: "Museum",
      duration: 180,
      estimatedCost: 25,
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140",
    },
    {
      title: "Trevi Fountain",
      description:
        "Toss a coin into the Trevi Fountain and stroll through the nearby lanes toward the Spanish Steps.",
      category: "Landmark",
      duration: 45,
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1529154036614-a60975f21e6b",
    },
    {
      title: "Trastevere Evening",
      description:
        "Spend an evening in Trastevere with trattoria dining, cobblestone streets, and lively piazzas.",
      category: "Food",
      duration: 150,
      estimatedCost: 45,
      image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b",
    },
  ],
  "new york": [
    {
      title: "Central Park Walk",
      description:
        "Stroll Bethesda Terrace, the Mall, and the lake, then rent a bike for a loop of the park.",
      category: "Outdoors",
      duration: 120,
      estimatedCost: 15,
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    },
    {
      title: "Statue of Liberty Ferry",
      description:
        "Take the ferry to Liberty Island and Ellis Island for harbour views of Lower Manhattan.",
      category: "Landmark",
      duration: 180,
      estimatedCost: 25,
      image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee",
    },
    {
      title: "Metropolitan Museum of Art",
      description:
        "Explore the Met’s encyclopedic collections from Egyptian temples to European painting.",
      category: "Museum",
      duration: 180,
      estimatedCost: 30,
      image: "https://images.unsplash.com/photo-1569428034239-f556000093c9",
    },
    {
      title: "Times Square at Night",
      description:
        "See the neon of Times Square, then catch a Broadway show in the Theater District.",
      category: "Entertainment",
      duration: 90,
      estimatedCost: 80,
      image: "https://images.unsplash.com/photo-1534430480872-3498386e7856",
    },
  ],
  london: [
    {
      title: "Tower of London",
      description:
        "Walk the fortress walls, see the Crown Jewels, and hear Yeoman Warder stories of the Tower.",
      category: "Landmark",
      duration: 150,
      estimatedCost: 35,
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    },
    {
      title: "British Museum",
      description:
        "See the Rosetta Stone, Parthenon sculptures, and global collections under the Great Court.",
      category: "Museum",
      duration: 150,
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3",
    },
    {
      title: "Thames River Walk",
      description:
        "Walk from Westminster to Tower Bridge past the London Eye, South Bank, and Borough Market.",
      category: "Outdoors",
      duration: 120,
      estimatedCost: 12,
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    },
    {
      title: "West End Theatre",
      description:
        "Book a West End performance in Covent Garden or Soho and enjoy a pre-show dinner nearby.",
      category: "Entertainment",
      duration: 180,
      estimatedCost: 75,
      image: "https://images.unsplash.com/photo-1503095396549-4366298dcc5e",
    },
  ],
  barcelona: [
    {
      title: "Sagrada Família",
      description:
        "Tour Gaudí’s unfinished basilica and climb a tower for views over Eixample.",
      category: "Landmark",
      duration: 120,
      estimatedCost: 26,
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
    },
    {
      title: "Park Güell",
      description:
        "Wander Gaudí’s mosaic terraces, viaducts, and city viewpoints in Gràcia.",
      category: "Outdoors",
      duration: 90,
      estimatedCost: 10,
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    },
    {
      title: "Gothic Quarter",
      description:
        "Get lost in the Barri Gòtic’s medieval lanes, the cathedral, and tapas bars.",
      category: "Culture",
      duration: 120,
      estimatedCost: 20,
      image: "https://images.unsplash.com/photo-1562883676-8c7feb83b540",
    },
    {
      title: "La Boqueria Market",
      description:
        "Sample jamón, fruit juices, and seafood at Barcelona’s famous La Rambla market.",
      category: "Food",
      duration: 75,
      estimatedCost: 18,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    },
  ],
  dubai: [
    {
      title: "Burj Khalifa Observation Deck",
      description:
        "Ride to At the Top for views over Downtown Dubai, the fountain, and the desert edge.",
      category: "Viewpoint",
      duration: 90,
      estimatedCost: 45,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
    {
      title: "Dubai Mall Fountain Show",
      description:
        "Watch the Dubai Fountain performance, then explore the mall’s aquarium and souk.",
      category: "Entertainment",
      duration: 60,
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
    },
    {
      title: "Desert Safari",
      description:
        "Dune bash outside the city, then enjoy a desert camp with dinner and traditional performances.",
      category: "Adventure",
      duration: 300,
      estimatedCost: 70,
      image: "https://images.unsplash.com/photo-1451337519412-15a26710cdfc",
    },
    {
      title: "Old Dubai Creek",
      description:
        "Cross Dubai Creek by abra and wander the Gold and Spice Souks in Deira.",
      category: "Culture",
      duration: 120,
      estimatedCost: 15,
      image: "https://images.unsplash.com/photo-1546412414-e1885259563a",
    },
  ],
  singapore: [
    {
      title: "Gardens by the Bay",
      description:
        "Walk the Supertree Grove, Cloud Forest, and Flower Dome in Marina Bay.",
      category: "Outdoors",
      duration: 150,
      estimatedCost: 28,
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
    },
    {
      title: "Marina Bay Sands SkyPark",
      description:
        "Visit the SkyPark observation deck for views of the CBD, Helix Bridge, and the bay.",
      category: "Viewpoint",
      duration: 60,
      estimatedCost: 24,
      image: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac",
    },
    {
      title: "Hawker Centre Food Trail",
      description:
        "Taste Hainanese chicken rice, laksa, and chili crab at a neighborhood hawker centre.",
      category: "Food",
      duration: 90,
      estimatedCost: 20,
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    },
    {
      title: "Chinatown Heritage Walk",
      description:
        "Explore temples, shophouses, and street food along Pagoda Street and Club Street.",
      category: "Culture",
      duration: 120,
      estimatedCost: 12,
      image: "https://images.unsplash.com/photo-1565967511849-76a60a516170",
    },
  ],
  bangkok: [
    {
      title: "Grand Palace and Wat Phra Kaew",
      description:
        "Tour the Grand Palace complex and the Temple of the Emerald Buddha on Rattanakosin Island.",
      category: "Landmark",
      duration: 150,
      estimatedCost: 15,
      image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed",
    },
    {
      title: "Wat Arun",
      description:
        "Climb the porcelain-clad prang of the Temple of Dawn and photograph the Chao Phraya.",
      category: "Culture",
      duration: 75,
      estimatedCost: 6,
      image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a",
    },
    {
      title: "Chatuchak Weekend Market",
      description:
        "Browse thousands of stalls for crafts, clothing, and Thai street food.",
      category: "Shopping",
      duration: 180,
      estimatedCost: 25,
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    },
    {
      title: "Chao Phraya Dinner Cruise",
      description:
        "Cruise the river at night past illuminated temples and the city skyline.",
      category: "Cruise",
      duration: 120,
      estimatedCost: 40,
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
    },
  ],
  istanbul: [
    {
      title: "Hagia Sophia",
      description:
        "Stand beneath the vast dome of Hagia Sophia, a landmark of Byzantine and Ottoman history.",
      category: "Landmark",
      duration: 75,
      estimatedCost: 25,
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
    },
    {
      title: "Blue Mosque",
      description:
        "Visit Sultan Ahmed Mosque and its six minarets facing the Hippodrome.",
      category: "Culture",
      duration: 60,
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b",
    },
    {
      title: "Grand Bazaar",
      description:
        "Wander the covered lanes of the Grand Bazaar for carpets, spices, ceramics, and tea.",
      category: "Shopping",
      duration: 120,
      estimatedCost: 20,
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa",
    },
    {
      title: "Bosphorus Cruise",
      description:
        "Sail between Europe and Asia past palaces, fortresses, and waterfront mansions.",
      category: "Cruise",
      duration: 90,
      estimatedCost: 18,
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
    },
  ],
  lisbon: [
    {
      title: "Belém Tower and Jerónimos",
      description:
        "Visit Belém Tower and Jerónimos Monastery, then taste pastéis de nata nearby.",
      category: "Landmark",
      duration: 150,
      estimatedCost: 20,
      image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a",
    },
    {
      title: "Tram 28 Ride",
      description:
        "Ride the historic tram through Graça, Alfama, and Baixa for a classic Lisbon circuit.",
      category: "Culture",
      duration: 60,
      estimatedCost: 4,
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b",
    },
    {
      title: "Alfama Fado Evening",
      description:
        "Dine in Alfama and listen to live fado in a neighborhood tavern.",
      category: "Entertainment",
      duration: 150,
      estimatedCost: 40,
      image: "https://images.unsplash.com/photo-1513735496446-1e8d5a0a0a3d",
    },
    {
      title: "LX Factory",
      description:
        "Explore the converted industrial complex of shops, street art, and riverside cafés.",
      category: "Shopping",
      duration: 90,
      estimatedCost: 15,
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b",
    },
  ],
};

const fallbackActivitiesForCity = (cityName: string): SeedActivity[] => [
  {
    title: `${cityName} Historic Center`,
    description: `Walk the historic streets of ${cityName}, taking in main squares, architecture, and local life.`,
    category: "Culture",
    duration: 120,
    estimatedCost: 0,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
  },
  {
    title: `${cityName} Landmark Tour`,
    description: `Visit the signature landmarks of ${cityName} with time for photos and a guided overview.`,
    category: "Landmark",
    duration: 150,
    estimatedCost: 25,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
  },
  {
    title: `${cityName} Local Food Experience`,
    description: `Sample regional dishes and market snacks that locals in ${cityName} actually eat.`,
    category: "Food",
    duration: 90,
    estimatedCost: 30,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    title: `${cityName} Viewpoint`,
    description: `Climb or ride to a high viewpoint for a panoramic look across ${cityName}.`,
    category: "Viewpoint",
    duration: 75,
    estimatedCost: 12,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
  },
];

const getSeedActivitiesForCity = (cityName: string): SeedActivity[] => {
  const key = cityName.trim().toLowerCase();
  return seedActivitiesByCity[key] ?? fallbackActivitiesForCity(cityName);
};

export const getActivities = async (): Promise<Activity[]> => {
  return prisma.activity.findMany({
    orderBy: [{ title: "asc" }],
  });
};

export const searchActivities = async (query: string): Promise<Activity[]> => {
  return prisma.activity.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: [{ title: "asc" }],
  });
};

export const getActivitiesByCity = async (
  cityId: string
): Promise<Activity[]> => {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    select: { id: true },
  });

  if (!city) {
    throw new ActivityError("City not found", 404);
  }

  return prisma.activity.findMany({
    where: { cityId },
    orderBy: [{ title: "asc" }],
  });
};

export const seedActivities = async (): Promise<{
  activities: Activity[];
  createdCount: number;
  skippedCount: number;
}> => {
  const cities = await prisma.city.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  if (cities.length === 0) {
    throw new ActivityError("No cities found to seed activities", 400);
  }

  const created: Activity[] = [];
  let skippedCount = 0;

  for (const city of cities) {
    const templates = getSeedActivitiesForCity(city.name);

    for (const template of templates) {
      const existing = await prisma.activity.findFirst({
        where: {
          cityId: city.id,
          title: template.title,
        },
      });

      if (existing) {
        skippedCount += 1;
        continue;
      }

      const activity = await prisma.activity.create({
        data: {
          cityId: city.id,
          title: template.title,
          description: template.description,
          category: template.category,
          duration: template.duration,
          estimatedCost: template.estimatedCost,
          image: template.image,
        },
      });

      created.push(activity);
    }
  }

  return {
    activities: created,
    createdCount: created.length,
    skippedCount,
  };
};

const getOwnedStop = async (userId: string, stopId: string) => {
  const stop = await prisma.tripStop.findUnique({
    where: { id: stopId },
    include: {
      trip: {
        select: { id: true, userId: true },
      },
    },
  });

  if (!stop) {
    throw new ActivityError("Trip stop not found", 404);
  }

  if (stop.trip.userId !== userId) {
    throw new ActivityError("Forbidden", 403);
  }

  return stop;
};

export const assignActivityToStop = async (
  userId: string,
  stopId: string,
  input: AssignActivityInput
): Promise<TripActivity> => {
  const stop = await getOwnedStop(userId, stopId);

  const activity = await prisma.activity.findUnique({
    where: { id: input.activityId },
    select: { id: true, cityId: true },
  });

  if (!activity) {
    throw new ActivityError("Activity not found", 404);
  }

  if (activity.cityId !== stop.cityId) {
    throw new ActivityError(
      "Activity does not belong to this stop's city",
      400
    );
  }

  const duplicate = await prisma.tripActivity.findFirst({
    where: {
      tripStopId: stop.id,
      activityId: activity.id,
    },
    select: { id: true },
  });

  if (duplicate) {
    throw new ActivityError("Activity is already assigned to this stop", 409);
  }

  try {
    return await prisma.tripActivity.create({
      data: {
        tripStopId: stop.id,
        activityId: activity.id,
        dayNumber: input.dayNumber,
        startTime: input.startTime,
        notes: input.notes,
      },
      include: {
        activity: true,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new ActivityError(
        "Activity is already assigned to this stop",
        409
      );
    }

    throw error;
  }
};

export const removeActivityFromStop = async (
  userId: string,
  stopId: string,
  activityId: string
): Promise<void> => {
  await getOwnedStop(userId, stopId);

  const assignment = await prisma.tripActivity.findFirst({
    where: {
      tripStopId: stopId,
      activityId,
    },
  });

  if (!assignment) {
    throw new ActivityError("Assigned activity not found", 404);
  }

  await prisma.tripActivity.delete({
    where: { id: assignment.id },
  });
};
