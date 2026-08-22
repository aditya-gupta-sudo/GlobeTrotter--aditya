"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiErrorMessage } from "@/lib/api";
import {
  listActivities,
  searchActivities,
  type Activity,
} from "@/lib/catalog-activities";
import { listCities, type City } from "@/lib/cities";

export default function ExplorePage() {
  const router = useRouter();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Recommended");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const [activityRows, cityRows] = await Promise.all([
          appliedSearch.trim()
            ? searchActivities(appliedSearch.trim())
            : listActivities(),
          listCities(),
        ]);
        setActivities(activityRows);
        setCities(cityRows);
      } catch (err) {
        setActivities([]);
        setError(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [appliedSearch]);

  const cityLabel = (cityId: string) => {
    const city = cities.find((item) => item.id === cityId);
    return city ? `${city.name}, ${city.country}` : "Catalog activity";
  };

  const categories = useMemo(() => {
    const names = new Set(activities.map((activity) => activity.category));
    return ["All", ...Array.from(names).sort()];
  }, [activities]);

  const filteredActivities = useMemo(() => {
    let results = activities.filter(
      (activity) => category === "All" || activity.category === category
    );

    if (sort === "Price: Low to High") {
      results = [...results].sort((a, b) => a.estimatedCost - b.estimatedCost);
    }

    if (sort === "Price: High to Low") {
      results = [...results].sort((a, b) => b.estimatedCost - a.estimatedCost);
    }

    return results;
  }, [activities, category, sort]);

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#142033]">
      <header className="sticky top-0 z-50 border-b border-[#dbe6ef] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-8">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08a8df] text-xl text-white shadow-sm">
              ◈
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Globe<span className="text-[#08a8df]">Trotter</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => router.push("/trips")}
            className="rounded-full border border-[#d8e4ed] bg-white px-5 py-2.5 text-sm font-bold"
          >
            My Trips
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#142033]">
        <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#35c4f2]">
            Discover something new
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Find your next
            <span className="text-[#21b8ed]"> adventure.</span>
          </h1>
        </div>
      </section>

      <section className="relative mx-auto -mt-7 max-w-[1200px] px-5 md:px-8">
        <div className="rounded-2xl border border-[#dbe6ef] bg-white p-4 shadow-[0_20px_50px_rgba(20,32,51,0.12)]">
          <div className="flex flex-col gap-3 lg:flex-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search activities..."
              className="h-14 flex-1 rounded-xl border border-[#dbe6ef] bg-[#f8fbfd] px-4 text-sm outline-none focus:border-[#08a8df]"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-14 rounded-xl border border-[#dbe6ef] px-5 text-sm font-semibold"
            >
              {categories.map((name) => (
                <option key={name} value={name}>
                  {name === "All" ? "All categories" : name}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-14 rounded-xl border border-[#dbe6ef] px-5 text-sm font-semibold"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <button
              type="button"
              onClick={() => setAppliedSearch(search)}
              className="h-14 rounded-xl bg-[#08a8df] px-7 text-sm font-bold text-white"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        {isLoading && <p className="text-sm text-[#718396]">Loading activities...</p>}
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {!isLoading && !error && filteredActivities.length === 0 && (
          <div className="rounded-2xl border border-[#dbe6ef] bg-white py-20 text-center">
            <h3 className="text-xl font-bold">No experiences found</h3>
            <p className="mt-2 text-sm text-[#718396]">
              Try another search, or seed activities on the server.
            </p>
          </div>
        )}
        <div className="space-y-5">
          {filteredActivities.map((activity) => (
            <article
              key={activity.id}
              className="overflow-hidden rounded-2xl border border-[#dbe6ef] bg-white"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative h-[230px] shrink-0 bg-[#142033] md:w-[320px]">
                  {activity.image ? (
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold">
                    {activity.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-extrabold">{activity.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#08a8df]">
                      {cityLabel(activity.cityId)}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[#687b8e]">
                      {activity.description || "No description."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="rounded-full bg-[#f1f7fb] px-4 py-2 text-xs font-semibold">
                        {activity.duration} min
                      </span>
                      <span className="rounded-full bg-[#eefaff] px-4 py-2 text-xs font-bold text-[#078dbd]">
                        {activity.estimatedCost}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
