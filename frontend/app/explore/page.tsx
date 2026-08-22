"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD

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
  famousFor: string[];
  highlights: string[];
  photos: string[];
};

const activities: Activity[] = [
  {
    id: 1,
    title: "Paragliding Adventure",
    location: "Bir, Himachal Pradesh",
    category: "Adventure",
    description:
      "Fly above the beautiful Himalayan valleys and experience an unforgettable paragliding adventure. Bir is one of India's most famous destinations for paragliding, offering spectacular mountain views and an incredible flying experience.",
    duration: "2–3 hours",
    price: "₹2,500",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1800&q=90",
    famousFor: [
      "Paragliding over the Himalayan valleys",
      "Bir Tibetan Colony",
      "Beautiful Himalayan sunsets",
      "Mountain and valley views",
    ],
    highlights: [
      "Tandem paragliding flight",
      "Professional local instructors",
      "Spectacular aerial views",
      "Perfect for adventure lovers",
    ],
    photos: [
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  {
    id: 2,
    title: "Mountain Trekking",
    location: "Manali, India",
    category: "Adventure",
    description:
      "Explore spectacular mountain trails around Manali, passing through forests, valleys and breathtaking Himalayan landscapes.",
    duration: "1 day",
    price: "₹1,800",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=90",
    famousFor: [
      "Himalayan mountain trails",
      "Solang Valley",
      "Old Manali",
      "Beautiful pine forests",
    ],
    highlights: [
      "Guided mountain trek",
      "Panoramic Himalayan views",
      "Forest trails",
      "Photography opportunities",
    ],
    photos: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  {
    id: 3,
    title: "Beach Sunset Cruise",
    location: "Goa, India",
    category: "Relaxation",
    description:
      "Enjoy a peaceful cruise along the Goan coastline while watching the sun disappear into the Arabian Sea. Relax with beautiful ocean views, cool sea breezes and unforgettable sunsets.",
    duration: "2 hours",
    price: "₹1,500",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=90",
    famousFor: [
      "Goa's famous beaches",
      "Arabian Sea sunsets",
      "Beachside nightlife",
      "Portuguese-inspired architecture",
    ],
    highlights: [
      "Sunset cruise",
      "Ocean views",
      "Photography opportunities",
      "Relaxing evening experience",
    ],
    photos: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  {
    id: 4,
    title: "Desert Safari",
    location: "Jaisalmer, Rajasthan",
    category: "Culture",
    description:
      "Ride through the golden sand dunes of the Thar Desert and discover the traditional culture of Rajasthan.",
    duration: "5 hours",
    price: "₹2,200",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1800&q=90",
    famousFor: [
      "Sam Sand Dunes",
      "Jaisalmer Fort",
      "Rajasthani folk music",
      "Traditional desert camps",
    ],
    highlights: [
      "Camel safari",
      "Golden sand dunes",
      "Traditional cultural performances",
      "Desert sunset",
    ],
    photos: [
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  {
    id: 5,
    title: "Scuba Diving",
    location: "Andaman Islands",
    category: "Adventure",
    description:
      "Discover the underwater world of the Andaman Islands. Dive into clear blue waters and explore colourful coral reefs, tropical fish and fascinating marine life.",
    duration: "3 hours",
    price: "₹3,500",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=90",
    famousFor: [
      "Coral reefs",
      "Crystal-clear waters",
      "Havelock Island",
      "Rich marine life",
    ],
    highlights: [
      "Guided scuba dive",
      "Coral reef exploration",
      "Tropical marine life",
      "Underwater photography",
    ],
    photos: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  {
    id: 6,
    title: "Heritage City Walk",
    location: "Jaipur, Rajasthan",
    category: "Culture",
    description:
      "Walk through Jaipur's historic streets and discover magnificent architecture, colourful markets and hidden cultural gems.",
    duration: "3 hours",
    price: "₹900",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=90",
    famousFor: [
      "Amber Fort",
      "Hawa Mahal",
      "City Palace",
      "Colourful local markets",
    ],
    highlights: [
      "Historic city walk",
      "Traditional markets",
      "Royal architecture",
      "Local culture and stories",
    ],
    photos: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  {
    id: 7,
    title: "Forest Camping",
    location: "Rishikesh, India",
    category: "Nature",
    description:
      "Escape into nature with a peaceful camping experience surrounded by forests and mountains. Enjoy an evening around the campfire and experience the natural beauty of Rishikesh.",
    duration: "1 night",
    price: "₹2,800",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1800&q=90",
    famousFor: [
      "Ganga River",
      "Forest landscapes",
      "River rafting",
      "Yoga and wellness",
    ],
    highlights: [
      "Overnight camping",
      "Campfire evening",
      "Nature walks",
      "Outdoor activities",
    ],
    photos: [
      "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1478827536114-da961b7f86b4?auto=format&fit=crop&w=1200&q=85",
    ],
  },
];
=======
import { getApiErrorMessage } from "@/lib/api";
import {
  listActivities,
  searchActivities,
  type Activity,
} from "@/lib/catalog-activities";
import { listCities, type City } from "@/lib/cities";
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f

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

  const [selectedActivity, setSelectedActivity] =
    useState<Activity | null>(null);

  /*
   * These states store the filters that have actually been applied.
   * This means changing the dropdown/input won't affect the results
   * until the user presses the Search button.
   */
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("All");
  const [appliedSort, setAppliedSort] = useState("Recommended");

  /*
   * APPLY SEARCH / FILTERS
   */
  const handleSearch = () => {
    setAppliedSearch(search);
    setAppliedCategory(category);
    setAppliedSort(sort);
  };

  /*
   * CLEAR EVERYTHING
   */
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("Recommended");

    setAppliedSearch("");
    setAppliedCategory("All");
    setAppliedSort("Recommended");
  };

  /*
   * FILTER ONLY USING THE APPLIED FILTERS
   */
  const filteredActivities = useMemo(() => {
<<<<<<< HEAD
    let results = activities.filter((activity) => {
      const searchText = appliedSearch.trim().toLowerCase();

      const matchesSearch =
        searchText === "" ||
        activity.title.toLowerCase().includes(searchText) ||
        activity.location.toLowerCase().includes(searchText) ||
        activity.category.toLowerCase().includes(searchText);

      const matchesCategory =
        appliedCategory === "All" ||
        activity.category === appliedCategory;

      return matchesSearch && matchesCategory;
    });

    if (appliedSort === "Price: Low to High") {
      results = [...results].sort(
        (a, b) =>
          Number(a.price.replace(/[₹,]/g, "")) -
          Number(b.price.replace(/[₹,]/g, ""))
      );
    }

    if (appliedSort === "Rating") {
      results = [...results].sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [appliedSearch, appliedCategory, appliedSort]);

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#142033]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#dbe6ef] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-8">

=======
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
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
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
<<<<<<< HEAD

          <nav className="hidden items-center gap-1 md:flex">

            <button
              onClick={() => router.push("/explore")}
              className="rounded-full bg-[#eefaff] px-4 py-2 text-sm font-bold text-[#08a8df]"
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

=======
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
          <button
            type="button"
            onClick={() => router.push("/trips")}
            className="rounded-full border border-[#d8e4ed] bg-white px-5 py-2.5 text-sm font-bold"
          >
            My Trips
          </button>

        </div>
      </header>

<<<<<<< HEAD
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#142033]">

        <div className="absolute inset-0 opacity-20">

          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="h-full w-full object-cover"
          />

        </div>

=======
      <section className="relative overflow-hidden bg-[#142033]">
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
        <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#35c4f2]">
            Discover something new
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Find your next
            <span className="text-[#21b8ed]"> adventure.</span>
          </h1>
<<<<<<< HEAD

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            Search activities, experiences and unforgettable things to do
            wherever your journey takes you.
          </p>

=======
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
        </div>

      </section>

<<<<<<< HEAD
      {/* =====================================================
          SEARCH
      ===================================================== */}

=======
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
      <section className="relative mx-auto -mt-7 max-w-[1200px] px-5 md:px-8">

        <div className="rounded-2xl border border-[#dbe6ef] bg-white p-4 shadow-[0_20px_50px_rgba(20,32,51,0.12)]">

          <div className="flex flex-col gap-3 lg:flex-row">
<<<<<<< HEAD

            {/* SEARCH INPUT */}

            <div className="relative flex-1">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#8da1b4]">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search activities or cities..."
                className="h-14 w-full rounded-xl border border-[#dbe6ef] bg-[#f8fbfd] pl-12 pr-4 text-sm font-medium outline-none transition focus:border-[#08a8df] focus:bg-white focus:ring-4 focus:ring-[#08a8df]/10"
              />

            </div>

            {/* CATEGORY */}

=======
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search activities..."
              className="h-14 flex-1 rounded-xl border border-[#dbe6ef] bg-[#f8fbfd] px-4 text-sm outline-none focus:border-[#08a8df]"
            />
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
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
<<<<<<< HEAD

            {/* SORT */}

=======
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-14 rounded-xl border border-[#dbe6ef] px-5 text-sm font-semibold"
            >
<<<<<<< HEAD
              <option value="Recommended">Recommended</option>
              <option value="Rating">Rating</option>
              <option value="Price: Low to High">
                Price: Low to High
              </option>
            </select>

            {/* SEARCH BUTTON */}

            <button
              onClick={handleSearch}
              className="h-14 rounded-xl bg-[#08a8df] px-7 text-sm font-bold text-white transition hover:bg-[#0798ca]"
=======
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <button
              type="button"
              onClick={() => setAppliedSearch(search)}
              className="h-14 rounded-xl bg-[#08a8df] px-7 text-sm font-bold text-white"
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
            >
              Search
            </button>

          </div>

          {/* ACTIVE FILTER INFORMATION */}

          {(appliedSearch ||
            appliedCategory !== "All" ||
            appliedSort !== "Recommended") && (
            <div className="mt-3 flex flex-wrap items-center gap-2">

              <span className="text-xs font-semibold text-[#718396]">
                Active filters:
              </span>

              {appliedSearch && (
                <span className="rounded-full bg-[#eefaff] px-3 py-1.5 text-xs font-bold text-[#078dbd]">
                  Search: {appliedSearch}
                </span>
              )}

              {appliedCategory !== "All" && (
                <span className="rounded-full bg-[#eefaff] px-3 py-1.5 text-xs font-bold text-[#078dbd]">
                  Category: {appliedCategory}
                </span>
              )}

              {appliedSort !== "Recommended" && (
                <span className="rounded-full bg-[#fff8e8] px-3 py-1.5 text-xs font-bold text-[#b77b00]">
                  Sort: {appliedSort}
                </span>
              )}

              <button
                onClick={clearFilters}
                className="ml-1 text-xs font-bold text-red-500 hover:underline"
              >
                Clear filters
              </button>

            </div>
          )}

        </div>

      </section>

<<<<<<< HEAD
      {/* =====================================================
          RESULTS
      ===================================================== */}

      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">

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
            {appliedCategory !== "All"
              ? `Showing ${appliedCategory.toLowerCase()} experiences`
              : "Showing activities based on your search"}
          </div>

        </div>

        {filteredActivities.length === 0 ? (

          <div className="rounded-2xl border border-[#dbe6ef] bg-white py-20 text-center">

            <div className="text-5xl">🌍</div>

            <h3 className="mt-5 text-xl font-bold">
              No experiences found
            </h3>

            <p className="mt-2 text-sm text-[#718396]">
              Try searching for another city, activity or category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-[#08a8df] px-6 py-3 text-sm font-bold text-white"
            >
              Clear filters
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {filteredActivities.map((activity) => (

              <ActivityCard
                key={activity.id}
                activity={activity}
                onView={() => setSelectedActivity(activity)}
              />

            ))}

=======
      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        {isLoading && <p className="text-sm text-[#718396]">Loading activities...</p>}
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {!isLoading && !error && filteredActivities.length === 0 && (
          <div className="rounded-2xl border border-[#dbe6ef] bg-white py-20 text-center">
            <h3 className="text-xl font-bold">No experiences found</h3>
            <p className="mt-2 text-sm text-[#718396]">
              Try another search, or seed activities on the server.
            </p>
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
          </div>

        )}
<<<<<<< HEAD

=======
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
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
      </section>

      {/* =====================================================
          DETAIL MODAL
      ===================================================== */}

      {selectedActivity && (

        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#07111e]/75 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setSelectedActivity(null)}
        >

          <div
            className="mx-auto max-w-[1100px] overflow-hidden rounded-[28px] bg-[#f5f9fd] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* DETAIL HERO */}

            <div className="relative h-[300px] overflow-hidden md:h-[420px]">

              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07111e]/90 via-black/20 to-transparent" />

              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-xl font-bold text-white backdrop-blur-md transition hover:bg-black/70"
                aria-label="Close"
              >
                ×
              </button>

              <div className="absolute bottom-7 left-6 right-6 md:bottom-10 md:left-10">

                <div className="mb-4 flex flex-wrap gap-3">

                  <span className="rounded-full bg-[#08a8df] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                    {selectedActivity.category}
                  </span>

                  <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#b77b00]">
                    ★ {selectedActivity.rating}
                  </span>

                </div>

                <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                  {selectedActivity.title}
                </h2>

                <p className="mt-2 text-sm font-semibold text-white/85 md:text-base">
                  📍 {selectedActivity.location}
                </p>

              </div>

            </div>

            {/* DETAIL BODY */}

            <div className="p-6 md:p-10">

              <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

                <div className="space-y-8">

                  {/* ABOUT */}

                  <section>

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#08a8df]">
                      About this experience
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold">
                      Experience {selectedActivity.location}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#687b8e] md:text-base">
                      {selectedActivity.description}
                    </p>

                  </section>

                  {/* FAMOUS */}

                  <section>

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#08a8df]">
                      Don't miss
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold">
                      Famous things to experience
                    </h3>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">

                      {selectedActivity.famousFor.map((item, index) => (

                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
                        >

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eefaff] text-sm font-bold text-[#08a8df]">
                            {index + 1}
                          </span>

                          <span className="text-sm font-semibold text-[#53677b]">
                            {item}
                          </span>

                        </div>

                      ))}

                    </div>

                  </section>

                  {/* HIGHLIGHTS */}

                  <section>

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#08a8df]">
                      Highlights
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold">
                      What you'll experience
                    </h3>

                    <div className="mt-5 space-y-3">

                      {selectedActivity.highlights.map(
                        (highlight, index) => (

                          <div
                            key={index}
                            className="flex items-center gap-3 rounded-xl bg-white p-4"
                          >

                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eafaff] font-bold text-[#08a8df]">
                              ✓
                            </span>

                            <span className="text-sm font-semibold text-[#53677b]">
                              {highlight}
                            </span>

                          </div>

                        )
                      )}

                    </div>

                  </section>

                  {/* PHOTOS */}

                  <section>

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#08a8df]">
                      Gallery
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold">
                      Explore the destination
                    </h3>

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

                      {selectedActivity.photos.map(
                        (photo, index) => (

                          <div
                            key={index}
                            className="group h-[220px] overflow-hidden rounded-2xl"
                          >

                            <img
                              src={photo}
                              alt={`${selectedActivity.title} ${index + 1}`}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />

                          </div>

                        )
                      )}

                    </div>

                  </section>

                </div>

                {/* SIDEBAR */}

                <aside>

                  <div className="rounded-3xl border border-[#dbe6ef] bg-white p-6 shadow-sm">

                    <p className="text-sm font-semibold text-[#718396]">
                      Experience details
                    </p>

                    <div className="mt-5 space-y-4">

                      <div className="rounded-2xl bg-[#f5f9fd] p-4">

                        <p className="text-xs font-bold uppercase tracking-wide text-[#8da1b4]">
                          Duration
                        </p>

                        <p className="mt-1 font-extrabold">
                          {selectedActivity.duration}
                        </p>

                      </div>

                      <div className="rounded-2xl bg-[#eefaff] p-4">

                        <p className="text-xs font-bold uppercase tracking-wide text-[#078dbd]">
                          Starting from
                        </p>

                        <p className="mt-1 text-2xl font-extrabold text-[#078dbd]">
                          {selectedActivity.price}
                        </p>

                      </div>

                      <div className="rounded-2xl bg-[#fff8e8] p-4">

                        <p className="text-xs font-bold uppercase tracking-wide text-[#b77b00]">
                          Rating
                        </p>

                        <p className="mt-1 text-2xl font-extrabold text-[#b77b00]">
                          ★ {selectedActivity.rating}
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() => {
                        setSelectedActivity(null);
                        router.push("/plan-trip");
                      }}
                      className="mt-6 w-full rounded-2xl bg-[#08a8df] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#08a8df]/20 transition hover:-translate-y-0.5 hover:bg-[#0798ca]"
                    >
                      Add to my trip →
                    </button>

                    <button
                      onClick={() => setSelectedActivity(null)}
                      className="mt-3 w-full rounded-2xl border border-[#dbe6ef] bg-white px-5 py-4 text-sm font-bold text-[#53677b] transition hover:border-[#08a8df] hover:text-[#08a8df]"
                    >
                      Continue exploring
                    </button>

                  </div>

                </aside>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}
<<<<<<< HEAD

/* =========================================================
   ACTIVITY CARD
========================================================= */

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
=======
>>>>>>> cdd0e14a00c6e88fafbe1083f5d5ad4c5826d44f
