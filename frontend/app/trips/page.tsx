"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type TripStatus = "Ongoing" | "Upcoming" | "Completed";

type Trip = {
  id: number;
  title: string;
  destination: string;
  dates: string;
  description: string;
  status: TripStatus;
  image: string;
};

const trips: Trip[] = [
  {
    id: 1,
    title: "Swiss Alps Adventure",
    destination: "Switzerland",
    dates: "12 Jun - 20 Jun",
    description:
      "Explore beautiful mountain villages, alpine lakes and scenic trails through the Swiss Alps.",
    status: "Ongoing",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Bali Escape",
    destination: "Bali, Indonesia",
    dates: "10 Jul - 18 Jul",
    description:
      "A relaxing tropical journey filled with beaches, temples, local food and unforgettable sunsets.",
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "European Summer",
    destination: "Paris, France",
    dates: "03 Aug - 12 Aug",
    description:
      "Discover iconic European landmarks, charming streets, museums and incredible local experiences.",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "Dubai Adventure",
    destination: "Dubai, UAE",
    dates: "18 Sep - 24 Sep",
    description:
      "Experience modern architecture, desert adventures, incredible food and unforgettable city views.",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function TripsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [groupBy, setGroupBy] = useState("Status");
  const [filter, setFilter] = useState<TripStatus | "All">("All");
  const [sortBy, setSortBy] = useState("Newest");

  const filteredTrips = useMemo(() => {
    let result = [...trips];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (trip) =>
          trip.title.toLowerCase().includes(query) ||
          trip.destination.toLowerCase().includes(query) ||
          trip.description.toLowerCase().includes(query)
      );
    }

    // Filter
    if (filter !== "All") {
      result = result.filter((trip) => trip.status === filter);
    }

    // Sort
    if (sortBy === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [search, filter, sortBy]);

  const ongoingTrips = filteredTrips.filter(
    (trip) => trip.status === "Ongoing"
  );

  const upcomingTrips = filteredTrips.filter(
    (trip) => trip.status === "Upcoming"
  );

  const completedTrips = filteredTrips.filter(
    (trip) => trip.status === "Completed"
  );

  const handleTripClick = (trip: Trip) => {
    router.push(`/trips/${trip.id}`);
  };

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#142033]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#dce7f1] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <button
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

          {/* Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => router.push("/")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              Explore
            </button>

            <button
              onClick={() => router.push("/destinations")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              Destinations
            </button>

            <button
              onClick={() => router.push("/experiences")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              Experiences
            </button>

            <button
              onClick={() => router.push("/inspiration")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              Inspiration
            </button>
          </nav>

          {/* Account */}
          <button
            onClick={() => router.push("/login")}
            className="rounded-full border border-[#d5e2ec] bg-white px-5 py-2.5 text-sm font-semibold text-[#26384d] transition hover:border-[#08a8df] hover:text-[#08a8df]"
          >
            My account
          </button>
        </div>
      </header>

      {/* PAGE */}
      <section className="mx-auto max-w-[1250px] px-5 py-10 md:px-8 md:py-14">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
            Your journeys
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            My Trips
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#687b8e] md:text-lg">
            Keep track of your ongoing adventures, upcoming journeys and
            memories from trips you've completed.
          </p>
        </div>

        {/* TOOLBAR */}
        <div className="mb-10 rounded-2xl border border-[#dbe6ef] bg-white p-3 shadow-[0_10px_35px_rgba(20,32,51,0.05)]">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
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

            {/* Group */}
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="h-12 rounded-xl border border-[#dbe6ef] bg-white px-4 text-sm font-semibold text-[#52657a] outline-none focus:border-[#08a8df]"
            >
              <option value="Status">Group by: Status</option>
              <option value="Destination">Group by: Destination</option>
              <option value="Date">Group by: Date</option>
            </select>

            {/* Filter */}
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

            {/* Sort */}
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

        {/* GROUPED TRIPS */}
        <div className="space-y-12">
          {/* ONGOING */}
          {groupBy === "Status" && ongoingTrips.length > 0 && (
            <TripGroup
              title="Ongoing"
              subtitle="Trips you're currently experiencing"
              trips={ongoingTrips}
              onTripClick={handleTripClick}
            />
          )}

          {/* UPCOMING */}
          {groupBy === "Status" && upcomingTrips.length > 0 && (
            <TripGroup
              title="Upcoming"
              subtitle="Your next adventures"
              trips={upcomingTrips}
              onTripClick={handleTripClick}
            />
          )}

          {/* COMPLETED */}
          {groupBy === "Status" && completedTrips.length > 0 && (
            <TripGroup
              title="Completed"
              subtitle="Places you've already explored"
              trips={completedTrips}
              onTripClick={handleTripClick}
            />
          )}

          {/* ALL RESULTS WHEN NOT GROUPING BY STATUS */}
          {groupBy !== "Status" && filteredTrips.length > 0 && (
            <TripGroup
              title="Your trips"
              subtitle={`Grouped by ${groupBy.toLowerCase()}`}
              trips={filteredTrips}
              onTripClick={handleTripClick}
            />
          )}

          {/* NO RESULTS */}
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

        {/* PLAN NEW TRIP */}
        <div className="mt-14 flex justify-center">
          <button
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

/* ------------------------------------------------ */
/* TRIP GROUP */
/* ------------------------------------------------ */

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
      {/* Group heading */}
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

      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {trips.map((trip) => (
          <button
            key={trip.id}
            onClick={() => onTripClick(trip)}
            className="group overflow-hidden rounded-2xl border border-[#dbe6ef] bg-white text-left shadow-[0_8px_30px_rgba(20,32,51,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#abd9eb] hover:shadow-[0_18px_45px_rgba(8,168,223,0.12)]"
          >
            {/* Image */}
            <div className="relative h-[210px] overflow-hidden">
              <img
                src={trip.image}
                alt={trip.destination}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Image shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

              {/* Status */}
              <div className="absolute left-4 top-4">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md ${
                    trip.status === "Ongoing"
                      ? "bg-[#08a8df]/90 text-white"
                      : trip.status === "Upcoming"
                        ? "bg-white/90 text-[#078dbd]"
                        : "bg-black/65 text-white"
                  }`}
                >
                  {trip.status}
                </span>
              </div>

              {/* Destination */}
              <div className="absolute bottom-4 left-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
                  Destination
                </p>

                <h3 className="mt-1 text-2xl font-extrabold">
                  {trip.destination}
                </h3>
              </div>
            </div>

            {/* Card content */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#142033]">
                    {trip.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-[#08a8df]">
                    {trip.dates}
                  </p>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef9fd] text-[#08a8df] transition group-hover:bg-[#08a8df] group-hover:text-white">
                  →
                </span>
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#718096]">
                {trip.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}