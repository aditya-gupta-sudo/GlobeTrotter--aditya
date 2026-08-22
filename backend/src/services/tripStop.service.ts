import { Prisma, TripStop } from "@prisma/client";
import prisma from "../config/prisma";
import type {
  CreateTripStopInput,
  UpdateTripStopInput,
} from "../validators/tripStop.validator";

export class TripStopError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "TripStopError";
  }
}

const assertTripOwnership = async (userId: string, tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: { id: true, userId: true },
  });

  if (!trip) {
    throw new TripStopError("Trip not found", 404);
  }

  if (trip.userId !== userId) {
    throw new TripStopError("Forbidden", 403);
  }

  return trip;
};

const assertCityExists = async (cityId: string) => {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    select: { id: true },
  });

  if (!city) {
    throw new TripStopError("City not found", 404);
  }
};

const assertUniqueStopOrder = async (
  tripId: string,
  stopOrder: number,
  excludeStopId?: string
) => {
  const existing = await prisma.tripStop.findFirst({
    where: {
      tripId,
      stopOrder,
      ...(excludeStopId ? { NOT: { id: excludeStopId } } : {}),
    },
    select: { id: true },
  });

  if (existing) {
    throw new TripStopError("Stop order already exists for this trip", 409);
  }
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
    throw new TripStopError("Trip stop not found", 404);
  }

  if (stop.trip.userId !== userId) {
    throw new TripStopError("Forbidden", 403);
  }

  return stop;
};

export const createTripStop = async (
  userId: string,
  tripId: string,
  input: CreateTripStopInput
): Promise<TripStop> => {
  await assertTripOwnership(userId, tripId);
  await assertCityExists(input.cityId);
  await assertUniqueStopOrder(tripId, input.stopOrder);

  try {
    return await prisma.tripStop.create({
      data: {
        tripId,
        cityId: input.cityId,
        arrivalDate: input.arrivalDate,
        departureDate: input.departureDate,
        stopOrder: input.stopOrder,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new TripStopError("Stop order already exists for this trip", 409);
    }

    throw error;
  }
};

export const getTripStops = async (
  userId: string,
  tripId: string
): Promise<TripStop[]> => {
  await assertTripOwnership(userId, tripId);

  return prisma.tripStop.findMany({
    where: { tripId },
    orderBy: { stopOrder: "asc" },
  });
};

export const updateTripStop = async (
  userId: string,
  stopId: string,
  input: UpdateTripStopInput
): Promise<TripStop> => {
  const stop = await getOwnedStop(userId, stopId);

  if (input.cityId) {
    await assertCityExists(input.cityId);
  }

  const arrivalDate = input.arrivalDate ?? stop.arrivalDate;
  const departureDate = input.departureDate ?? stop.departureDate;

  if (arrivalDate > departureDate) {
    throw new TripStopError("Validation failed", 400, {
      details: [
        {
          path: "departureDate",
          message: "arrivalDate must be on or before departureDate",
        },
      ],
    });
  }

  if (input.stopOrder !== undefined) {
    await assertUniqueStopOrder(stop.tripId, input.stopOrder, stop.id);
  }

  const data: Prisma.TripStopUpdateInput = {};

  if (input.cityId !== undefined) {
    data.city = { connect: { id: input.cityId } };
  }

  if (input.arrivalDate !== undefined) {
    data.arrivalDate = input.arrivalDate;
  }

  if (input.departureDate !== undefined) {
    data.departureDate = input.departureDate;
  }

  if (input.stopOrder !== undefined) {
    data.stopOrder = input.stopOrder;
  }

  try {
    return await prisma.tripStop.update({
      where: { id: stopId },
      data,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new TripStopError("Stop order already exists for this trip", 409);
    }

    throw error;
  }
};

export const deleteTripStop = async (
  userId: string,
  stopId: string
): Promise<void> => {
  const stop = await getOwnedStop(userId, stopId);

  await prisma.tripStop.delete({
    where: { id: stop.id },
  });
};
