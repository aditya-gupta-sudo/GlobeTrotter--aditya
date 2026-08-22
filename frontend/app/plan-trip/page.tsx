"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  CalendarDays,
  MapPin,
  ArrowRight,
  LogOut,
  Plus,
} from "lucide-react";

type Suggestion = {
  title: string;
  location: string;
  type: string;
  image: string;
};

const suggestions: Suggestion[] = [
  {
    title: "Explore the mountains",
    location: "Swiss Alps",
    type: "Nature",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Relax by the beach",
    location: "Maldives",
    type: "Beach",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Discover the city",
    location: "Dubai",
    type: "City",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Adventure awaits",
    location: "New Zealand",
    type: "Adventure",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Walk through history",
    location: "Rome",
    type: "Culture",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Experience the desert",
    location: "Abu Dhabi",
    type: "Adventure",
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=90",
  },
];

export default function PlanTripPage() {
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [tripName, setTripName] = useState("");
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("globetroter_logged_in");

    if (loggedIn !== "true") {
      router.replace("/login");
      return;
    }

    setIsCheckingAuth(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("globetroter_logged_in");
    localStorage.removeItem("globetroter_user_email");

    router.push("/login");
  };

  const handleCreateTrip = () => {
    if (!tripName.trim()) {
      alert("Please enter a trip name.");
      return;
    }

    if (!place.trim()) {
      alert("Please select a destination.");
      return;
    }

    if (!startDate) {
      alert("Please select a start date.");
      return;
    }

    if (!endDate) {
      alert("Please select an end date.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    const trip = {
      tripName,
      place,
      startDate,
      endDate,
    };

    localStorage.setItem(
      "globetroter_current_trip",
      JSON.stringify(trip)
    );

    alert("Trip created successfully!");

    console.log(trip);
  };

  const chooseSuggestion = (location: string) => {
    setPlace(location);
  };

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9fd]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#079bc2] border-t-transparent" />

          <p className="mt-4 text-sm text-slate-500">
            Loading your trip planner...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-slate-900">

      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

          {/* Logo */}

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f8fd] text-[#079bc2]">
              <Compass className="h-6 w-6" />
            </div>

            <span className="text-xl font-bold">
              Globe<span className="text-[#079bc2]">Trotter</span>
            </span>

          </button>


          {/* Navigation */}

          <nav className="hidden items-center gap-8 md:flex">

            <button
              onClick={() => router.push("/explore")}
              className="text-sm font-semibold text-slate-600 transition hover:text-[#079bc2]"
            >
              Explore
            </button>

            <button
              onClick={() => router.push("/destinations")}
              className="text-sm font-semibold text-slate-600 transition hover:text-[#079bc2]"
            >
              Destinations
            </button>

            <button
              onClick={() => router.push("/experiences")}
              className="text-sm font-semibold text-slate-600 transition hover:text-[#079bc2]"
            >
              Experiences
            </button>

            <button
              onClick={() => router.push("/inspiration")}
              className="text-sm font-semibold text-slate-600 transition hover:text-[#079bc2]"
            >
              Inspiration
            </button>

          </nav>


          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:block">
              Logout
            </span>
          </button>

        </div>

      </header>


      {/* =========================================================
          MAIN
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* Heading */}

        <div className="mb-8">

          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#079bc2]">
            Create a new trip
          </p>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Plan a new trip
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            Tell us where you want to go and when you want to travel.
            We&apos;ll help you discover places and experiences along the way.
          </p>

        </div>


        {/* =========================================================
            FORM CARD
        ========================================================= */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="grid gap-6 md:grid-cols-2">

            {/* Trip name */}

            <div>

              <label
                htmlFor="tripName"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Trip name
              </label>

              <div className="relative">

                <Compass className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  id="tripName"
                  type="text"
                  value={tripName}
                  onChange={(event) =>
                    setTripName(event.target.value)
                  }
                  placeholder="e.g. My Summer Vacation"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-[#079bc2] focus:bg-white focus:ring-4 focus:ring-[#079bc2]/10"
                />

              </div>

            </div>


            {/* Destination */}

            <div>

              <label
                htmlFor="place"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Select a place
              </label>

              <div className="relative">

                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  id="place"
                  type="text"
                  value={place}
                  onChange={(event) =>
                    setPlace(event.target.value)
                  }
                  placeholder="Where do you want to go?"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-[#079bc2] focus:bg-white focus:ring-4 focus:ring-[#079bc2]/10"
                />

              </div>

            </div>


            {/* Start date */}

            <div>

              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Start date
              </label>

              <div className="relative">

                <CalendarDays className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-[#079bc2] focus:bg-white focus:ring-4 focus:ring-[#079bc2]/10"
                />

              </div>

            </div>


            {/* End date */}

            <div>

              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                End date
              </label>

              <div className="relative">

                <CalendarDays className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(event) =>
                    setEndDate(event.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-[#079bc2] focus:bg-white focus:ring-4 focus:ring-[#079bc2]/10"
                />

              </div>

            </div>

          </div>


          {/* Create trip */}

          <div className="mt-8 flex justify-end">

            <button
              onClick={handleCreateTrip}
              className="flex items-center gap-2 rounded-2xl bg-[#079bc2] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#079bc2]/20 transition hover:-translate-y-0.5 hover:bg-[#078eaf]"
            >
              Create trip
              <ArrowRight className="h-5 w-5" />
            </button>

          </div>

        </section>


        {/* =========================================================
            SUGGESTIONS
        ========================================================= */}

        <section className="mt-14">

          <div className="mb-7">

            <div className="flex items-center gap-3">

              <div className="h-[2px] w-10 bg-[#079bc2]" />

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#079bc2]">
                Inspiration
              </p>

            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Places to visit & experiences
            </h2>

            <p className="mt-2 text-slate-500">
              Looking for ideas? Start with one of these destinations.
            </p>

          </div>


          {/* Cards */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {suggestions.map((suggestion) => (

              <article
                key={suggestion.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}

                <div className="relative h-56 overflow-hidden">

                  <img
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur">
                    {suggestion.type}
                  </span>

                  <p className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-bold text-white">
                    <MapPin className="h-4 w-4" />
                    {suggestion.location}
                  </p>

                </div>


                {/* Content */}

                <div className="p-5">

                  <h3 className="text-lg font-bold text-slate-900">
                    {suggestion.title}
                  </h3>

                  <button
                    onClick={() =>
                      chooseSuggestion(suggestion.location)
                    }
                    className="mt-4 flex items-center gap-2 text-sm font-bold text-[#079bc2] transition hover:gap-3"
                  >
                    <Plus className="h-4 w-4" />
                    Add to trip
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>

      </section>

    </main>
  );
}