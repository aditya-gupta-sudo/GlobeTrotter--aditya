"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiErrorMessage } from "@/lib/api";
import {
  getTripItinerary,
  type ItineraryDay,
} from "@/lib/itinerary";

function formatMoney(value: number): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function ItineraryScreen({ tripId }: { tripId: string }) {
  const router = useRouter();
  const [days, setDays] = useState<ItineraryDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const itinerary = await getTripItinerary(tripId);
        setDays(itinerary);
      } catch (err) {
        setDays([]);
        setError(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [tripId]);

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#142033]">
      <header className="sticky top-0 z-50 border-b border-[#dce7f1] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 md:px-10">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08a8df] text-white shadow-sm">
              <span className="text-xl">◈</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Globe<span className="text-[#08a8df]">Trotter</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/trips")}
            className="rounded-full border border-[#d4e1ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#43566b] transition hover:border-[#08a8df] hover:text-[#08a8df]"
          >
            ← Back to trips
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
            Your journey
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Itinerary
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#64748b] md:text-lg">
            Day-by-day plan loaded from your trip stops and activities.
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl border border-[#dbe7f1] bg-white px-6 py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#08a8df] border-t-transparent" />
            <p className="mt-4 text-sm text-[#718096]">Loading itinerary...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-red-700">Could not load itinerary</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && days.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#cbdbe7] bg-white px-6 py-20 text-center">
            <h2 className="text-2xl font-bold">No itinerary yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#718096]">
              This trip has no stops or scheduled activities yet.
            </p>
          </div>
        )}

        {!isLoading && !error && days.length > 0 && (
          <div className="overflow-hidden rounded-[28px] border border-[#dbe7f1] bg-white shadow-[0_20px_60px_rgba(20,32,51,0.08)]">
            <div className="border-b border-[#dbe7f1] bg-[#f9fbfd] px-6 py-5 md:px-8">
              <h2 className="text-xl font-bold">Your itinerary</h2>
              <p className="mt-1 text-sm text-[#718096]">
                {days.length} {days.length === 1 ? "day" : "days"} planned
              </p>
            </div>

            <div className="space-y-5 p-5 md:p-8">
              {days.map((day, index) => (
                <article
                  key={`${day.date}-${day.city.id}-${index}`}
                  className="rounded-2xl border border-[#d8e4ee] bg-[#fbfdff] p-5 md:p-6"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5f6fd] text-sm font-bold text-[#08a8df]">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{formatDate(day.date)}</h3>
                        <p className="text-sm font-semibold text-[#08a8df]">
                          {day.city.name}, {day.city.country}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#eaf7fc] px-3 py-1 text-xs font-semibold text-[#078dbd]">
                      {day.activities.length}{" "}
                      {day.activities.length === 1 ? "activity" : "activities"}
                    </span>
                  </div>

                  {day.activities.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-[#dbe6ef] px-4 py-3 text-sm text-[#718096]">
                      No activities scheduled for this day.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {day.activities.map((activity, activityIndex) => (
                        <li
                          key={`${activity.title}-${activityIndex}`}
                          className="flex flex-col gap-2 rounded-xl border border-[#dbe6ef] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="font-bold">{activity.title}</p>
                            <p className="text-sm text-[#718096]">
                              {activity.category}
                              {activity.startTime ? ` · ${activity.startTime}` : ""}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-[#142033]">
                            {formatMoney(activity.estimatedCost)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
