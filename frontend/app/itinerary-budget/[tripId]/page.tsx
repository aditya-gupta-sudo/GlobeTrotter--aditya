"use client";

import { useParams } from "next/navigation";
import { RequireAuth } from "@/components/auth/require-auth";
import { BudgetScreen } from "@/components/planning/budget-screen";

export default function TripBudgetPage() {
  const params = useParams<{ tripId: string }>();
  const tripId = params.tripId;

  return (
    <RequireAuth>
      <BudgetScreen tripId={tripId} />
    </RequireAuth>
  );
}
