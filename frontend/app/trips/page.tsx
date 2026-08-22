"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RequireAuth } from "@/components/auth/require-auth";
import { getApiErrorMessage } from "@/lib/api";
import {
  formatTripDates,
  getTripStatus,
  listTrips,
  type Trip,
  type TripStatus,
} from "@/lib/trips";

export default function TripsPage() {
  return (
    <RequireAuth>
      <TripsContent />
    </RequireAuth>
  );
}

function TripsContent() {
  const router = useRouter();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [groupBy, setGroupBy] = useState("Status");
  const [filter, setFilter] = useState<TripStatus | "All">("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await listTrips();
        setTrips(data);
      } catch (err) {
        setError(getApiErrorMessage(err));
        setTrips([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadTrips();
  }, []);

  const filteredTrips = useMemo(() => {
    let result = [...trips];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (trip) =>
          trip.title.toLowerCase().includes(query) ||
          (trip.description ?? "").toLowerCase().includes(query)
      );
    }

    if (filter !== "All") {
      result = result.filter(
        (trip) => getTripStatus(trip.startDate, trip.endDate) === filter
      );
    }

    if (sortBy === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortBy === "Newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [trips, search, filter, sortBy]);

  const ongoingTrips = filteredTrips.filter(
    (trip) => getTripStatus(trip.startDate, trip.endDate) === "Ongoing"
  );

  const upcomingTrips = filteredTrips.filter(
    (trip) => getTripStatus(trip.startDate, trip.endDate) === "Upcoming"
  );

  const completedTrips = filteredTrips.filter(
    (trip) => getTripStatus(trip.startDate, trip.endDate) === "Completed"
  );

  const handleTripClick = (trip: Trip) => {
    router.push(`/trips/${trip.id}`);
  };

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#142033]">
      <header className="sticky top-0 z-50 border-b border-[#dce7f1] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-8">
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

          <nav className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              Explore
            </button>

            <button
              type="button"
              onClick={() => router.push("/destinations")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              Destinations
            </button>

            <button
              type="button"
              onClick={() => router.push("/experiences")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              Experiences
            </button>

            <button
              type="button"
              onClick={() => router.push("/inspiration")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              Inspiration
            </button>
          </nav>

          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="rounded-full border border-[#d5e2ec] bg-white px-5 py-2.5 text-sm font-semibold text-[#26384d] transition hover:border-[#08a8df] hover:text-[#08a8df]"
          >
            My account
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1250px] px-5 py-10 md:px-8 md:py-14">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
            Your journeys
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            My Trips
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#687b8e] md:text-lg">
            Keep track of your ongoing adventures, upcoming journeys and
            memories from trips you&apos;ve completed.
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-[#dbe6ef] bg-white p-3 shadow-[0_10px_35px_rgba(20,32,51,0.05)]">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8295a8]">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your trips..."
                className="h-12 w-full rounded-xl border border-[#dbe6ef] bg-[#f9fbfd] pl-11 pr-4 text-sm text-[#26384d] outline-none transition placeholder:text-[#94a3b8] focus:border-[#08a8df] focus:bg-white focus:ring-4 focus:ring-[#08a8df]/10"
              />
            </div>

            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="h-12 rounded-xl border border-[#dbe6ef] bg-white px-4 text-sm font-semibold text-[#52657a] outline-none focus:border-[#08a8df]"
            >
              <option value="Status">Group by: Status</option>
              <option value="Date">Group by: Date</option>
            </select>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as TripStatus | "All")
              }
              className="h-12 rounded-xl border border-[#dbe6ef] bg-white px-4 text-sm font-semibold text-[#52657a] outline-none focus:border-[#08a8df]"
            >
              <option value="All">Filter: All</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 rounded-xl border border-[#dbe6ef] bg-white px-4 text-sm font-semibold text-[#52657a] outline-none focus:border-[#08a8df]"
            >
              <option value="Newest">Sort by: Newest</option>
              <option value="A-Z">Sort by: A-Z</option>
              <option value="Z-A">Sort by: Z-A</option>
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="rounded-3xl border border-[#dbe6ef] bg-white px-6 py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#08a8df] border-t-transparent" />
            <p className="mt-4 text-sm text-[#718096]">Loading your trips...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-red-700">Could not load trips</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-600">
              {error}
            </p>
          </div>
        )}

        {!isLoading && !error && trips.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#cbdbe7] bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf7fc] text-3xl">
              ✈
            </div>
            <h2 className="text-2xl font-bold text-[#142033]">No trips yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#718096]">
              Create your first trip to start planning your journey.
            </p>
          </div>
        )}

        {!isLoading && !error && trips.length > 0 && (
          <div className="space-y-12">
            {groupBy === "Status" && ongoingTrips.length > 0 && (
              <TripGroup
                title="Ongoing"
                subtitle="Trips you're currently experiencing"
                trips={ongoingTrips}
                onTripClick={handleTripClick}
              />
            )}

            {groupBy === "Status" && upcomingTrips.length > 0 && (
              <TripGroup
                title="Upcoming"
                subtitle="Your next adventures"
                trips={upcomingTrips}
                onTripClick={handleTripClick}
              />
            )}

            {groupBy === "Status" && completedTrips.length > 0 && (
              <TripGroup
                title="Completed"
                subtitle="Places you've already explored"
                trips={completedTrips}
                onTripClick={handleTripClick}
              />
            )}

            {groupBy !== "Status" && filteredTrips.length > 0 && (
              <TripGroup
                title="Your trips"
                subtitle="Sorted by date"
                trips={filteredTrips}
                onTripClick={handleTripClick}
              />
            )}

            {filteredTrips.length === 0 && (
              <div className="rounded-3xl border border-dashed border-[#cbdbe7] bg-white px-6 py-20 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf7fc] text-3xl">
                  ✈
                </div>

                <h2 className="text-2xl font-bold text-[#142033]">
                  No trips found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#718096]">
                  Try changing your search or filters to find another trip.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => router.push("/plan-trip")}
            className="group flex items-center gap-3 rounded-full bg-[#08a8df] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(8,168,223,0.22)] transition hover:bg-[#0798ca] hover:shadow-[0_12px_30px_rgba(8,168,223,0.3)]"
          >
            <span className="text-xl">+</span>
            Plan a new trip
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}

function TripGroup({
  title,
  subtitle,
  trips,
  onTripClick,
}: {
  title: string;
  subtitle: string;
  trips: Trip[];
  onTripClick: (trip: Trip) => void;
}) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#142033] md:text-3xl">
            {title}
          </h2>

          <p className="mt-1 text-sm text-[#718096]">{subtitle}</p>
        </div>

        <span className="rounded-full bg-[#eaf7fc] px-3 py-1 text-xs font-bold text-[#078dbd]">
          {trips.length} {trips.length === 1 ? "trip" : "trips"}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {trips.map((trip) => {
          const status = getTripStatus(trip.startDate, trip.endDate);

          return (
            <button
              key={trip.id}
              type="button"
              onClick={() => onTripClick(trip)}
              className="group overflow-hidden rounded-2xl border border-[#dbe6ef] bg-white text-left shadow-[0_8px_30px_rgba(20,32,51,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#abd9eb] hover:shadow-[0_18px_45px_rgba(8,168,223,0.12)]"
            >
              <div className="relative h-[210px] overflow-hidden bg-gradient-to-br from-[#08a8df] to-[#0b6f94]">
                {trip.coverImage ? (
                  <img
                    src={trip.coverImage}
                    alt={trip.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                <div className="absolute left-4 top-4">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md ${
                      status === "Ongoing"
                        ? "bg-[#08a8df]/90 text-white"
                        : status === "Upcoming"
                          ? "bg-white/90 text-[#078dbd]"
                          : "bg-black/65 text-white"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className="absolute bottom-4 left-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
                    {trip.visibility}
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold">{trip.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#142033]">
                      {trip.title}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-[#08a8df]">
                      {formatTripDates(trip.startDate, trip.endDate)}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef9fd] text-[#08a8df] transition group-hover:bg-[#08a8df] group-hover:text-white">
                    →
                  </span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#718096]">
                  {trip.description || "No description added yet."}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
