import { Prisma, Trip, TripVisibility } from "@prisma/client";
import prisma from "../config/prisma";
import type {
  CreateTripInput,
  UpdateTripInput,
} from "../validators/trip.validator";

export class TripError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "TripError";
  }
}

const assertTripAccess = (trip: Trip | null, userId: string): Trip => {
  if (!trip) {
    throw new TripError("Trip not found", 404);
  }

  if (trip.userId !== userId) {
    throw new TripError("Forbidden", 403);
  }

  return trip;
};

export const createTrip = async (
  userId: string,
  input: CreateTripInput
): Promise<Trip> => {
  return prisma.trip.create({
    data: {
      userId,
      title: input.title,
      description: input.description ?? null,
      coverImage: input.coverImage ?? null,
      startDate: input.startDate,
      endDate: input.endDate,
      visibility: input.visibility ?? TripVisibility.PRIVATE,
    },
  });
};

export const getUserTrips = async (userId: string): Promise<Trip[]> => {
  return prisma.trip.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getTripById = async (
  userId: string,
  tripId: string
): Promise<Trip> => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  return assertTripAccess(trip, userId);
};

export const updateTrip = async (
  userId: string,
  tripId: string,
  input: UpdateTripInput
): Promise<Trip> => {
  const existing = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  const trip = assertTripAccess(existing, userId);

  const startDate = input.startDate ?? trip.startDate;
  const endDate = input.endDate ?? trip.endDate;

  if (endDate < startDate) {
    throw new TripError("Validation failed", 400, {
      details: [
        {
          path: "endDate",
          message: "End date must be on or after start date",
        },
      ],
    });
  }

  const data: Prisma.TripUpdateInput = {};

  if (input.title !== undefined) {
    data.title = input.title;
  }

  if (input.description !== undefined) {
    data.description = input.description;
  }

  if (input.coverImage !== undefined) {
    data.coverImage = input.coverImage;
  }

  if (input.startDate !== undefined) {
    data.startDate = input.startDate;
  }

  if (input.endDate !== undefined) {
    data.endDate = input.endDate;
  }

  if (input.visibility !== undefined) {
    data.visibility = input.visibility;
  }

  return prisma.trip.update({
    where: { id: tripId },
    data,
  });
};

export const deleteTrip = async (
  userId: string,
  tripId: string
): Promise<void> => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: { id: true, userId: true },
  });

  if (!trip) {
    throw new TripError("Trip not found", 404);
  }

  if (trip.userId !== userId) {
    throw new TripError("Forbidden", 403);
  }

  await prisma.trip.delete({
    where: { id: tripId },
  });
};
