import prisma from "../config/prisma";

export class BudgetError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "BudgetError";
  }
}

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

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const roundMoney = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

const calendarDaysBetween = (start: Date, end: Date): number => {
  const startUtc = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate()
  );
  const endUtc = Date.UTC(
    end.getUTCFullYear(),
    end.getUTCMonth(),
    end.getUTCDate()
  );

  return Math.round((endUtc - startUtc) / MS_PER_DAY);
};

const stayDays = (arrivalDate: Date, departureDate: Date): number => {
  return Math.max(1, calendarDaysBetween(arrivalDate, departureDate));
};

export const getTripBudget = async (
  userId: string,
  tripId: string
): Promise<TripBudget> => {
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
    throw new BudgetError("Trip not found", 404);
  }

  if (trip.userId !== userId) {
    throw new BudgetError("Forbidden", 403);
  }

  const cityBreakdown: CityBudgetBreakdown[] = trip.stops.map((stop) => {
    const days = stayDays(stop.arrivalDate, stop.departureDate);
    const averageDailyCost = stop.city.averageDailyCost;
    const stayCost = roundMoney(days * averageDailyCost);
    const activitiesCost = roundMoney(
      stop.activities.reduce(
        (sum, tripActivity) => sum + tripActivity.activity.estimatedCost,
        0
      )
    );

    return {
      cityId: stop.city.id,
      cityName: stop.city.name,
      country: stop.city.country,
      stopId: stop.id,
      stopOrder: stop.stopOrder,
      days,
      averageDailyCost: roundMoney(averageDailyCost),
      stayCost,
      activitiesCost,
      totalCost: roundMoney(stayCost + activitiesCost),
    };
  });

  const activitiesCost = roundMoney(
    cityBreakdown.reduce((sum, city) => sum + city.activitiesCost, 0)
  );
  const estimatedStayCost = roundMoney(
    cityBreakdown.reduce((sum, city) => sum + city.stayCost, 0)
  );
  const tripCost = roundMoney(activitiesCost + estimatedStayCost);

  const totalStayDays = cityBreakdown.reduce((sum, city) => sum + city.days, 0);
  const tripSpanDays = Math.max(
    1,
    calendarDaysBetween(trip.startDate, trip.endDate)
  );
  const divisor = totalStayDays > 0 ? totalStayDays : tripSpanDays;
  const dailyAverage = roundMoney(tripCost / divisor);

  return {
    tripCost,
    dailyAverage,
    activitiesCost,
    estimatedStayCost,
    cityBreakdown,
  };
};
