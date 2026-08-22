"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Activity = {
  id: number;
  title: string;
  location: string;
  category: string;
  description: string;
  duration: string;
  price: string;
  rating: number;
  image: string;
};

const activities: Activity[] = [
  {
    id: 1,
    title: "Paragliding Adventure",
    location: "Bir, Himachal Pradesh",
    category: "Adventure",
    description:
      "Fly above the beautiful Himalayan valleys and experience an unforgettable paragliding adventure.",
    duration: "2–3 hours",
    price: "₹2,500",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    title: "Mountain Trekking",
    location: "Manali, India",
    category: "Adventure",
    description:
      "Explore mountain trails, forests and breathtaking landscapes with an experienced local guide.",
    duration: "1 day",
    price: "₹1,800",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    title: "Beach Sunset Cruise",
    location: "Goa, India",
    category: "Relaxation",
    description:
      "Enjoy a peaceful cruise along the coast while watching the sun disappear into the Arabian Sea.",
    duration: "2 hours",
    price: "₹1,500",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    title: "Desert Safari",
    location: "Jaisalmer, Rajasthan",
    category: "Culture",
    description:
      "Ride through golden sand dunes and experience traditional desert culture and local cuisine.",
    duration: "5 hours",
    price: "₹2,200",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    title: "Scuba Diving",
    location: "Andaman Islands",
    category: "Adventure",
    description:
      "Discover colourful coral reefs and marine life beneath the clear blue waters.",
    duration: "3 hours",
    price: "₹3,500",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    title: "Heritage City Walk",
    location: "Jaipur, Rajasthan",
    category: "Culture",
    description:
      "Walk through historic streets, ancient architecture, markets and hidden cultural gems.",
    duration: "3 hours",
    price: "₹900",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 7,
    title: "Forest Camping",
    location: "Rishikesh, India",
    category: "Nature",
    description:
      "Spend a night surrounded by nature with camping, bonfire and outdoor activities.",
    duration: "1 night",
    price: "₹2,800",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function ExplorePage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Recommended");

  const filteredActivities = useMemo(() => {
    let results = activities.filter((activity) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        activity.title.toLowerCase().includes(searchText) ||
        activity.location.toLowerCase().includes(searchText) ||
        activity.category.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || activity.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "Price: Low to High") {
      results = [...results].sort(
        (a, b) =>
          Number(a.price.replace(/[₹,]/g, "")) -
          Number(b.price.replace(/[₹,]/g, ""))
      );
    }

    if (sort === "Rating") {
      results = [...results].sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [search, category, sort]);

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#142033]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#dbe6ef] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-8">
          {/* LOGO */}
          <button
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

          {/* NAVIGATION */}
          <nav className="hidden items-center gap-1 md:flex">
            <button
              onClick={() => router.push("/")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#64778a] hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Explore
            </button>

            <button
              onClick={() => router.push("/destinations")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#64778a] hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Destinations
            </button>

            <button
              onClick={() => router.push("/experiences")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#64778a] hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Experiences
            </button>

            <button
              onClick={() => router.push("/trips")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#64778a] hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              My Trips
            </button>
          </nav>

          {/* ACCOUNT */}
          <button
            onClick={() => router.push("/profile")}
            className="rounded-full border border-[#d8e4ed] bg-white px-5 py-2.5 text-sm font-bold text-[#142033] shadow-sm hover:border-[#08a8df] hover:text-[#08a8df]"
          >
            My account
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#142033]">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#35c4f2]">
            Discover something new
          </p>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Find your next
            <span className="text-[#21b8ed]"> adventure.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            Search activities, experiences and unforgettable things to do
            wherever your journey takes you.
          </p>
        </div>
      </section>

      {/* SEARCH AREA */}
      <section className="relative mx-auto -mt-7 max-w-[1200px] px-5 md:px-8">
        <div className="rounded-2xl border border-[#dbe6ef] bg-white p-4 shadow-[0_20px_50px_rgba(20,32,51,0.12)]">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* SEARCH */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#8da1b4]">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search activities or cities..."
                className="h-14 w-full rounded-xl border border-[#dbe6ef] bg-[#f8fbfd] pl-12 pr-4 text-sm font-medium outline-none transition focus:border-[#08a8df] focus:bg-white focus:ring-4 focus:ring-[#08a8df]/10"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-14 rounded-xl border border-[#dbe6ef] bg-[#f8fbfd] px-5 text-sm font-semibold outline-none focus:border-[#08a8df]"
            >
              <option value="All">All categories</option>
              <option value="Adventure">Adventure</option>
              <option value="Nature">Nature</option>
              <option value="Culture">Culture</option>
              <option value="Relaxation">Relaxation</option>
            </select>

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-14 rounded-xl border border-[#dbe6ef] bg-[#f8fbfd] px-5 text-sm font-semibold outline-none focus:border-[#08a8df]"
            >
              <option>Recommended</option>
              <option>Rating</option>
              <option>Price: Low to High</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("Recommended");
              }}
              className="h-14 rounded-xl bg-[#08a8df] px-7 text-sm font-bold text-white transition hover:bg-[#0798ca]"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        {/* RESULTS HEADER */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#08a8df]">
              {filteredActivities.length} experiences found
            </p>

            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
              Results
            </h2>
          </div>

          <div className="text-sm text-[#718396]">
            Showing activities based on your search
          </div>
        </div>

        {/* RESULT LIST */}
        {filteredActivities.length === 0 ? (
          <div className="rounded-2xl border border-[#dbe6ef] bg-white py-20 text-center">
            <div className="text-5xl">🌍</div>

            <h3 className="mt-5 text-xl font-bold">
              No experiences found
            </h3>

            <p className="mt-2 text-sm text-[#718396]">
              Try searching for another city or activity.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-6 rounded-full bg-[#08a8df] px-6 py-3 text-sm font-bold text-white"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onView={() =>
                  router.push(`/explore/${activity.id}`)
                }
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ================================================= */
/* ACTIVITY CARD */
/* ================================================= */

function ActivityCard({
  activity,
  onView,
}: {
  activity: Activity;
  onView: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#dbe6ef] bg-white shadow-[0_8px_30px_rgba(20,32,51,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#abd9eb] hover:shadow-[0_18px_45px_rgba(8,168,223,0.12)]">
      <div className="flex flex-col md:flex-row">
        {/* IMAGE */}
        <div className="relative h-[230px] shrink-0 overflow-hidden md:h-auto md:w-[320px]">
          <img
            src={activity.image}
            alt={activity.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#142033] shadow-sm">
            {activity.category}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
          <div>
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm font-semibold text-[#08a8df]">
                  📍 {activity.location}
                </p>
              </div>

              <div className="flex h-fit items-center gap-1 rounded-full bg-[#fff8e8] px-3 py-1.5 text-sm font-bold text-[#b77b00]">
                ★ {activity.rating}
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#687b8e] md:text-base">
              {activity.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#f1f7fb] px-4 py-2 text-xs font-semibold text-[#53677b]">
                ◷ {activity.duration}
              </span>

              <span className="rounded-full bg-[#eefaff] px-4 py-2 text-xs font-bold text-[#078dbd]">
                From {activity.price}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onView}
              className="rounded-xl bg-[#08a8df] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0798ca]"
            >
              View details →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}