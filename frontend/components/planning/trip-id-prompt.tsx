"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getApiErrorMessage } from "@/lib/api";
import { formatTripDates, listTrips, type Trip } from "@/lib/trips";

export function TripIdPrompt({
  title,
  description,
  actionPath,
}: {
  title: string;
  description: string;
  actionPath: "/itinerary" | "/itinerary-budget";
}) {
  const router = useRouter();
  const [tripId, setTripId] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const rows = await listTrips();
        setTrips(rows);
      } catch (err) {
        setTrips([]);
        setError(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = tripId.trim();

    if (!value) {
      return;
    }

    router.push(`${actionPath}/${value}`);
  };

  return (
    <section className="mx-auto max-w-[720px] px-5 py-16">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
        Trip required
      </p>
      <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-3 text-base leading-7 text-[#687b8e]">{description}</p>

      <div className="mt-8 rounded-2xl border border-[#dbe6ef] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold">Your trips</h2>
        {isLoading && <p className="mt-3 text-sm text-[#718396]">Loading trips...</p>}
        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
        {!isLoading && !error && trips.length === 0 && (
          <p className="mt-3 text-sm text-[#718396]">No trips yet. Plan a trip first.</p>
        )}
        <div className="mt-4 space-y-2">
          {trips.map((trip) => (
            <button
              key={trip.id}
              type="button"
              onClick={() => router.push(`${actionPath}/${trip.id}`)}
              className="flex w-full items-center justify-between rounded-xl border border-[#dbe6ef] px-4 py-3 text-left transition hover:border-[#08a8df] hover:bg-[#eefaff]"
            >
              <span className="font-semibold">{trip.title}</span>
              <span className="text-xs font-semibold text-[#08a8df]">
                {formatTripDates(trip.startDate, trip.endDate)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-[#dbe6ef] bg-white p-6 shadow-sm"
      >
        <label htmlFor="tripId" className="mb-2 block text-sm font-bold">
          Trip ID
        </label>
        <input
          id="tripId"
          value={tripId}
          onChange={(event) => setTripId(event.target.value)}
          placeholder="Enter the trip UUID"
          className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm outline-none focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
        />
        <button
          type="submit"
          className="mt-4 rounded-full bg-[#08a8df] px-6 py-3 text-sm font-bold text-white"
        >
          Continue
        </button>
      </form>
    </section>
  );
}
