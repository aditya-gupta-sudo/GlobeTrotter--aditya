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
import { RequireAuth } from "@/components/auth/require-auth";
import { getApiErrorMessage } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { listCities, searchCities, type City } from "@/lib/cities";
import { createTripStop } from "@/lib/stops";
import { createTrip } from "@/lib/trips";

export default function PlanTripPage() {
  return (
    <RequireAuth>
      <PlanTripContent />
    </RequireAuth>
  );
}

function PlanTripContent() {
  const router = useRouter();
  const { logout } = useAuth();

  const [tripName, setTripName] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [cityId, setCityId] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [citiesError, setCitiesError] = useState("");
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCities = async () => {
      setCitiesLoading(true);
      setCitiesError("");

      try {
        const rows = cityQuery.trim()
          ? await searchCities(cityQuery.trim())
          : await listCities();
        setCities(rows);
      } catch (err) {
        setCities([]);
        setCitiesError(getApiErrorMessage(err));
      } finally {
        setCitiesLoading(false);
      }
    };

    const timer = window.setTimeout(() => {
      void loadCities();
    }, 250);

    return () => window.clearTimeout(timer);
  }, [cityQuery]);

  const selectedCity = cities.find((city) => city.id === cityId);

  const handleCreateTrip = async () => {
    setError("");
    setSuccess("");

    if (!tripName.trim()) {
      setError("Please enter a trip name.");
      return;
    }

    if (!startDate) {
      setError("Please select a start date.");
      return;
    }

    if (!endDate) {
      setError("Please select an end date.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("End date cannot be before start date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const trip = await createTrip({
        title: tripName.trim(),
        description: selectedCity
          ? `${selectedCity.name}, ${selectedCity.country}`
          : null,
        startDate,
        endDate,
      });

      if (cityId) {
        await createTripStop(trip.id, {
          cityId,
          arrivalDate: startDate,
          departureDate: endDate,
          stopOrder: 1,
        });
      }

      setSuccess("Trip created successfully.");
      router.push(`/trips/${trip.id}`);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onClick={logout}
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
                Select a city
              </label>

              <div className="relative">

                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  id="place"
                  type="text"
                  value={cityQuery}
                  onChange={(event) =>
                    setCityQuery(event.target.value)
                  }
                  placeholder="Search cities..."
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-[#079bc2] focus:bg-white focus:ring-4 focus:ring-[#079bc2]/10"
                />

              </div>
              <select
                value={cityId}
                onChange={(event) => setCityId(event.target.value)}
                className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm"
              >
                <option value="">Optional first stop</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}, {city.country}
                  </option>
                ))}
              </select>

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


          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {success}
            </div>
          )}

          {/* Create trip */}

          <div className="mt-8 flex justify-end">

            <button
              type="button"
              onClick={() => void handleCreateTrip()}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-2xl bg-[#079bc2] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#079bc2]/20 transition hover:-translate-y-0.5 hover:bg-[#078eaf] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Creating trip..." : "Create trip"}
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
              Cities from the catalog. Choose one as your first stop.
            </p>

          </div>

          {citiesError && (
            <p className="mb-4 text-sm font-medium text-red-600">{citiesError}</p>
          )}

          {citiesLoading && (
            <p className="text-sm text-slate-500">Loading cities...</p>
          )}

          {!citiesLoading && cities.length === 0 && !citiesError && (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-sm text-slate-500">
              No cities found. Seed the city catalog on the server if this list is empty.
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {cities.map((city) => (

              <article
                key={city.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="relative h-56 overflow-hidden bg-slate-200">

                  {city.image ? (
                    <img
                      src={city.image}
                      alt={city.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur">
                    {city.country}
                  </span>

                  <p className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-bold text-white">
                    <MapPin className="h-4 w-4" />
                    {city.name}
                  </p>

                </div>

                <div className="p-5">

                  <h3 className="text-lg font-bold text-slate-900">
                    {city.name}
                  </h3>

                  <button
                    type="button"
                    onClick={() => {
                      setCityId(city.id);
                      setCityQuery(city.name);
                    }}
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