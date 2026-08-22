"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, MapPin } from "lucide-react";
import { getApiErrorMessage } from "@/lib/api";
import { listCities, searchCities, type City } from "@/lib/cities";

export default function DestinationsPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const rows = query.trim()
          ? await searchCities(query.trim())
          : await listCities();
        setCities(rows);
      } catch (err) {
        setCities([]);
        setError(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    const timer = window.setTimeout(() => {
      void load();
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17202b]">
      <header className="bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17202b] text-white">
              <Compass size={19} />
            </span>
            <span className="text-xl font-bold">
              Globe<span className="text-[#079fc9]">Trotter</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ArrowLeft size={17} />
            Home
          </Link>
        </div>
      </header>

      <section className="bg-[#111820] px-6 py-28 text-white lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#24b5e8]">
            Destinations
          </p>
          <h1 className="mt-4 text-5xl font-bold sm:text-7xl">Where will you go?</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Cities from the GlobeTrotter catalog.
          </p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cities..."
            className="mt-8 h-12 w-full max-w-md rounded-full px-5 text-sm text-[#17202b]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-20 lg:px-10">
        {isLoading && <p className="text-sm text-[#607286]">Loading cities...</p>}
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {!isLoading && !error && cities.length === 0 && (
          <p className="text-sm text-[#607286]">No cities found.</p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <article
              key={city.id}
              className="group relative h-[470px] overflow-hidden rounded-[28px] bg-[#111820]"
            >
              {city.image ? (
                <img
                  src={city.image}
                  alt={city.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-7 text-white">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin size={15} />
                  {city.country}
                </div>
                <h2 className="mt-2 text-3xl font-bold">{city.name}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
