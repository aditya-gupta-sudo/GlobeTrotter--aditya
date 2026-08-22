"use client";

import { RequireAuth } from "@/components/auth/require-auth";
import { TripIdPrompt } from "@/components/planning/trip-id-prompt";

export default function ItineraryPage() {
  return (
    <RequireAuth>
      <main className="min-h-screen bg-[#f5f9fd] text-[#142033]">
        <TripIdPrompt
          title="Itinerary"
          description="Enter a trip ID to load its day-by-day itinerary from the server."
          actionPath="/itinerary"
        />
      </main>
    </RequireAuth>
  );
}
