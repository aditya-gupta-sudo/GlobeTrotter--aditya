import prisma from "../config/prisma";

export class ItineraryError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "ItineraryError";
  }
}

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

export type TripItinerary = {
  itinerary: ItineraryDay[];
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const toUtcDate = (value: Date): Date =>
  new Date(
    Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate())
  );

const addUtcDays = (value: Date, days: number): Date =>
  new Date(toUtcDate(value).getTime() + days * MS_PER_DAY);

const formatDate = (value: Date): string => toUtcDate(value).toISOString().slice(0, 10);

const calendarDaysBetween = (start: Date, end: Date): number => {
  return Math.round((toUtcDate(end).getTime() - toUtcDate(start).getTime()) / MS_PER_DAY);
};

const stayDayCount = (arrivalDate: Date, departureDate: Date): number => {
  return Math.max(1, calendarDaysBetween(arrivalDate, departureDate));
};

const compareStartTime = (a: string | null, b: string | null): number => {
  if (a === b) {
    return 0;
  }

  if (a === null) {
    return 1;
  }

  if (b === null) {
    return -1;
  }

  return a.localeCompare(b);
};

export const getTripItinerary = async (
  userId: string,
  tripId: string
): Promise<TripItinerary> => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      stops: {
        orderBy: { stopOrder: "asc" },
        include: {
          city: true,
          activities: {
            include: {
              activity: true,
            },
          },
        },
      },
    },
  });

  if (!trip) {
    throw new ItineraryError("Trip not found", 404);
  }

  if (trip.userId !== userId) {
    throw new ItineraryError("Forbidden", 403);
  }

  const days: ItineraryDay[] = [];

  for (const stop of trip.stops) {
    const activitiesByDay = new Map<number, ItineraryActivity[]>();

    for (const tripActivity of stop.activities) {
      const dayNumber = Math.max(1, tripActivity.dayNumber);
      const list = activitiesByDay.get(dayNumber) ?? [];

      list.push({
        title: tripActivity.activity.title,
        startTime: tripActivity.startTime,
        estimatedCost: tripActivity.activity.estimatedCost,
        category: tripActivity.activity.category,
      });

      activitiesByDay.set(dayNumber, list);
    }

    const lastActivityDay = [...activitiesByDay.keys()].reduce(
      (max, dayNumber) => Math.max(max, dayNumber),
      0
    );
    const totalDays = Math.max(
      stayDayCount(stop.arrivalDate, stop.departureDate),
      lastActivityDay,
      1
    );

    for (let dayNumber = 1; dayNumber <= totalDays; dayNumber += 1) {
      const activities = (activitiesByDay.get(dayNumber) ?? []).sort((left, right) =>
        compareStartTime(left.startTime, right.startTime)
      );

      days.push({
        date: formatDate(addUtcDays(stop.arrivalDate, dayNumber - 1)),
        city: {
          id: stop.city.id,
          name: stop.city.name,
          country: stop.city.country,
        },
        activities,
      });
    }
  }

  days.sort((left, right) => left.date.localeCompare(right.date));

  return { itinerary: days };
};
