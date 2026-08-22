"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiErrorMessage } from "@/lib/api";
import { getTripBudget, type TripBudget } from "@/lib/budget";

function formatMoney(value: number): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function BudgetScreen({ tripId }: { tripId: string }) {
  const router = useRouter();
  const [budget, setBudget] = useState<TripBudget | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getTripBudget(tripId);
        setBudget(data);
      } catch (err) {
        setBudget(null);
        setError(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [tripId]);

  return (
    <main className="min-h-screen bg-[#f5f8fb] text-[#152033]">
      <header className="sticky top-0 z-50 border-b border-[#dce6ee] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1250px] items-center justify-between px-5 md:px-8">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08a8df] text-xl font-bold text-white">
              ◈
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Globe<span className="text-[#08a8df]">Trotter</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/trips")}
            className="rounded-full border border-[#d9e4ec] bg-white px-5 py-2.5 text-sm font-bold shadow-sm transition hover:border-[#08a8df] hover:text-[#08a8df]"
          >
            My trips
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1250px] px-5 py-8 md:px-8 md:py-12">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
            Trip planner
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Budget
          </h1>
          <p className="mt-2 text-[#6d8092]">
            Estimated stay and activity costs calculated from your trip.
          </p>
        </div>

        {isLoading && (
          <div className="rounded-3xl border border-[#dce6ee] bg-white px-6 py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#08a8df] border-t-transparent" />
            <p className="mt-4 text-sm text-[#718096]">Calculating budget...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-red-700">Could not load budget</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && budget && (
          <>
            <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <BudgetStat label="Trip cost" value={budget.tripCost} />
              <BudgetStat label="Daily average" value={budget.dailyAverage} />
              <BudgetStat label="Stay cost" value={budget.estimatedStayCost} />
              <BudgetStat label="Activities" value={budget.activitiesCost} />
            </section>

            {budget.cityBreakdown.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#cddbe5] bg-white px-6 py-20 text-center">
                <h2 className="text-2xl font-bold">No budget breakdown yet</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7b8d9e]">
                  Add stops to this trip to see city-level stay and activity costs.
                </p>
              </div>
            ) : (
              <section className="rounded-3xl border border-[#dce6ee] bg-white p-5 shadow-[0_12px_40px_rgba(20,32,51,0.06)] md:p-8">
                <h2 className="mb-6 text-2xl font-extrabold">City breakdown</h2>
                <div className="space-y-4">
                  {budget.cityBreakdown.map((city) => (
                    <article
                      key={city.stopId}
                      className="rounded-2xl border border-[#dce6ee] bg-[#fbfdfe] p-5"
                    >
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-[#08a8df]">
                            Stop {city.stopOrder}
                          </p>
                          <h3 className="text-xl font-extrabold">
                            {city.cityName}, {city.country}
                          </h3>
                          <p className="mt-1 text-sm text-[#718497]">
                            {city.days} {city.days === 1 ? "day" : "days"} · daily average{" "}
                            {formatMoney(city.averageDailyCost)}
                          </p>
                        </div>
                        <p className="text-2xl font-extrabold">
                          {formatMoney(city.totalCost)}
                        </p>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <p className="rounded-xl bg-white px-4 py-3 text-sm">
                          Stay: <span className="font-bold">{formatMoney(city.stayCost)}</span>
                        </p>
                        <p className="rounded-xl bg-white px-4 py-3 text-sm">
                          Activities:{" "}
                          <span className="font-bold">{formatMoney(city.activitiesCost)}</span>
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function BudgetStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#dce6ee] bg-white px-6 py-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-[#7b8c9d]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold">{formatMoney(value)}</p>
    </div>
  );
}
