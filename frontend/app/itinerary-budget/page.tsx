"use client";

import { RequireAuth } from "@/components/auth/require-auth";
import { TripIdPrompt } from "@/components/planning/trip-id-prompt";

export default function BudgetItineraryPage() {
  return (
    <RequireAuth>
      <main className="min-h-screen bg-[#f5f8fb] text-[#152033]">
        <TripIdPrompt
          title="Budget"
          description="Enter a trip ID to load the calculated stay and activity budget from the server."
          actionPath="/itinerary-budget"
        />
      </main>
    </RequireAuth>
  );
}
