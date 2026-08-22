"use client";

import { useParams } from "next/navigation";
import { RequireAuth } from "@/components/auth/require-auth";
import { ItineraryScreen } from "@/components/planning/itinerary-screen";

export default function TripItineraryPage() {
  const params = useParams<{ tripId: string }>();
  const tripId = params.tripId;

  return (
    <RequireAuth>
      <ItineraryScreen tripId={tripId} />
    </RequireAuth>
  );
}
