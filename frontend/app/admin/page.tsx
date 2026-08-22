"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
  trips: number;
  city: string;
  status: "Active" | "Inactive";
};

type City = {
  name: string;
  visitors: number;
  growth: number;
};

type Activity = {
  name: string;
  bookings: number;
  popularity: number;
};

const users: User[] = [
  {
    id: 1,
    name: "Aditya Gupta",
    email: "aditya@example.com",
    trips: 8,
    city: "Surat",
    status: "Active",
  },
  {
    id: 2,
    name: "Priyanshu",
    email: "priyanshu@example.com",
    trips: 12,
    city: "Delhi",
    status: "Active",
  },
  {
    id: 3,
    name: "Akshata Shah",
    email: "akshata@example.com",
    trips: 6,
    city: "Mumbai",
    status: "Active",
  },
  {
    id: 4,
    name: "Rahul Mehta",
    email: "rahul@example.com",
    trips: 3,
    city: "Ahmedabad",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Riya Patel",
    email: "riya@example.com",
    trips: 9,
    city: "Bangalore",
    status: "Active",
  },
];

const cities: City[] = [
  {
    name: "Paris",
    visitors: 8420,
    growth: 18,
  },
  {
    name: "Dubai",
    visitors: 7210,
    growth: 15,
  },
  {
    name: "Tokyo",
    visitors: 6830,
    growth: 13,
  },
  {
    name: "New York",
    visitors: 6240,
    growth: 11,
  },
  {
    name: "London",
    visitors: 5810,
    growth: 9,
  },
];

const activities: Activity[] = [
  {
    name: "Paragliding",
    bookings: 482,
    popularity: 92,
  },
  {
    name: "Scuba Diving",
    bookings: 421,
    popularity: 86,
  },
  {
    name: "Hiking",
    bookings: 386,
    popularity: 79,
  },
  {
    name: "Desert Safari",
    bookings: 342,
    popularity: 73,
  },
  {
    name: "City Tour",
    bookings: 298,
    popularity: 67,
  },
];

type Section =
  | "users"
  | "cities"
  | "activities"
  | "analytics";

export default function AdminPage() {
  const router = useRouter();

  const [activeSection, setActiveSection] =
    useState<Section>("users");

  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Default");

  /*
   * FILTER USERS
   */

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.city.toLowerCase().includes(query)
      );
    }

    if (filter === "Active") {
      result = result.filter(
        (user) => user.status === "Active"
      );
    }

    if (filter === "Inactive") {
      result = result.filter(
        (user) => user.status === "Inactive"
      );
    }

    if (sortBy === "Name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "Trips") {
      result.sort(
        (a, b) => b.trips - a.trips
      );
    }

    return result;
  }, [search, filter, sortBy]);

  /*
   * FILTER CITIES
   */

  const filteredCities = useMemo(() => {
    let result = [...cities];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((city) =>
        city.name.toLowerCase().includes(query)
      );
    }

    if (sortBy === "Visitors") {
      result.sort(
        (a, b) => b.visitors - a.visitors
      );
    }

    if (sortBy === "Growth") {
      result.sort(
        (a, b) => b.growth - a.growth
      );
    }

    return result;
  }, [search, sortBy]);

  /*
   * FILTER ACTIVITIES
   */

  const filteredActivities = useMemo(() => {
    let result = [...activities];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((activity) =>
        activity.name
          .toLowerCase()
          .includes(query)
      );
    }

    if (sortBy === "Bookings") {
      result.sort(
        (a, b) => b.bookings - a.bookings
      );
    }

    if (sortBy === "Popularity") {
      result.sort(
        (a, b) => b.popularity - a.popularity
      );
    }

    return result;
  }, [search, sortBy]);

  /*
   * CHANGE SECTION
   */

  function changeSection(section: Section) {
    setActiveSection(section);
    setSearch("");
    setFilter("All");
    setSortBy("Default");
  }

  return (
    <main className="min-h-screen bg-[#101010] px-3 py-5 text-white md:px-6">
      <div className="mx-auto max-w-[1450px]">

        {/* ================================================= */}
        {/* TOP HEADER */}
        {/* ================================================= */}

        <header className="rounded-[18px] border border-white/20 bg-[#151515]">

          <div className="flex min-h-[72px] items-center justify-between border-b border-white/20 px-5 md:px-7">

            {/* LOGO */}

            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40">
                ◈
              </div>

              <span className="text-xl font-semibold">
                Globe
                <span className="text-[#20b8ef]">
                  Trotter
                </span>
              </span>
            </button>

            {/* ADMIN PROFILE */}

            <button
              onClick={() => router.push("/profile")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 hover:bg-white/10"
            >
              👤
            </button>
          </div>

          {/* SEARCH + CONTROLS */}

          <div className="flex flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:px-7">

            <div className="relative flex-1">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search bar ......"
                className="h-11 w-full rounded-xl border border-white/25 bg-transparent pl-11 pr-4 text-sm outline-none placeholder:text-white/40 focus:border-[#20b8ef]"
              />
            </div>

            <button className="h-11 rounded-xl border border-white/25 px-6 text-sm font-semibold hover:bg-white/10">
              Group by
            </button>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="h-11 rounded-xl border border-white/25 bg-[#151515] px-5 text-sm font-semibold outline-none"
            >
              <option value="All">
                Filter
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="h-11 rounded-xl border border-white/25 bg-[#151515] px-5 text-sm font-semibold outline-none"
            >
              <option value="Default">
                Sort by...
              </option>

              <option value="Name">
                Name
              </option>

              <option value="Trips">
                Trips
              </option>

              <option value="Visitors">
                Visitors
              </option>

              <option value="Growth">
                Growth
              </option>

              <option value="Bookings">
                Bookings
              </option>

              <option value="Popularity">
                Popularity
              </option>
            </select>
          </div>
        </header>

        {/* ================================================= */}
        {/* ADMIN CONTENT */}
        {/* ================================================= */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">

          {/* ================================================= */}
          {/* LEFT PANEL */}
          {/* ================================================= */}

          <section className="rounded-[18px] border border-white/20 bg-[#151515] p-4 md:p-5">

            {/* TABS */}

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">

              <AdminTab
                active={activeSection === "users"}
                onClick={() =>
                  changeSection("users")
                }
              >
                Manage Users
              </AdminTab>

              <AdminTab
                active={activeSection === "cities"}
                onClick={() =>
                  changeSection("cities")
                }
              >
                Popular Cities
              </AdminTab>

              <AdminTab
                active={
                  activeSection === "activities"
                }
                onClick={() =>
                  changeSection("activities")
                }
              >
                Popular Activities
              </AdminTab>

              <AdminTab
                active={
                  activeSection === "analytics"
                }
                onClick={() =>
                  changeSection("analytics")
                }
              >
                User Trends & Analytics
              </AdminTab>

            </div>

            {/* CONTENT */}

            <div className="mt-5">

              {activeSection === "users" && (
                <UsersSection
                  users={filteredUsers}
                />
              )}

              {activeSection === "cities" && (
                <CitiesSection
                  cities={filteredCities}
                />
              )}

              {activeSection === "activities" && (
                <ActivitiesSection
                  activities={
                    filteredActivities
                  }
                />
              )}

              {activeSection === "analytics" && (
                <AnalyticsSection />
              )}

            </div>
          </section>

          {/* ================================================= */}
          {/* RIGHT INFORMATION PANEL */}
          {/* ================================================= */}

          <aside className="rounded-[18px] border border-white/20 bg-[#151515] p-6">

            <h2 className="text-xl font-bold">
              Admin Dashboard
            </h2>

            <p className="mt-5 text-sm leading-6 text-white/75">
              The admin panel provides an overview
              of the users, destinations, activities
              and overall platform trends.
            </p>

            <div className="mt-7 space-y-6">

              <InfoBlock
                title="Manage Users"
              >
                This section is responsible for
                managing users and their actions.
                Admins can view user information,
                trips and account status.
              </InfoBlock>

              <InfoBlock
                title="Popular Cities"
              >
                Lists the most popular cities based
                on current user travel trends and
                destination activity.
              </InfoBlock>

              <InfoBlock
                title="Popular Activities"
              >
                Displays activities that are currently
                popular among users and travelers.
              </InfoBlock>

              <InfoBlock
                title="User Trends and Analytics"
              >
                Provides analytical information
                about users, trips, activities and
                destination behaviour.
              </InfoBlock>

            </div>

            {/* QUICK STATS */}

            <div className="mt-8 grid grid-cols-2 gap-3">

              <MiniStat
                label="Users"
                value="1,248"
              />

              <MiniStat
                label="Trips"
                value="3,842"
              />

              <MiniStat
                label="Cities"
                value="186"
              />

              <MiniStat
                label="Activities"
                value="492"
              />

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ========================================================= */
/* ADMIN TAB */
/* ========================================================= */

function AdminTab({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[45px] rounded-xl border px-3 text-xs font-semibold transition md:text-sm ${
        active
          ? "border-[#20b8ef] bg-[#20b8ef]/15 text-[#20b8ef]"
          : "border-white/25 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

/* ========================================================= */
/* USERS SECTION */
/* ========================================================= */

function UsersSection({
  users,
}: {
  users: User[];
}) {
  return (
    <div>

      <SectionTitle>
        Manage Users
      </SectionTitle>

      <div className="mt-5 space-y-3">

        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-white/15 bg-white/[0.03] p-4 transition hover:bg-white/[0.07]"
          >

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#20b8ef]/20 font-bold text-[#20b8ef]">
                  {user.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h3 className="font-bold">
                    {user.name}
                  </h3>

                  <p className="text-sm text-white/50">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5 text-sm">

                <div>
                  <p className="text-xs text-white/40">
                    City
                  </p>

                  <p className="font-semibold">
                    {user.city}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/40">
                    Trips
                  </p>

                  <p className="font-semibold">
                    {user.trips}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/40">
                    Status
                  </p>

                  <p
                    className={
                      user.status ===
                      "Active"
                        ? "font-semibold text-green-400"
                        : "font-semibold text-red-400"
                    }
                  >
                    {user.status}
                  </p>
                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

/* ========================================================= */
/* CITIES SECTION */
/* ========================================================= */

function CitiesSection({
  cities,
}: {
  cities: City[];
}) {
  return (
    <div>

      <SectionTitle>
        Popular Cities
      </SectionTitle>

      <div className="mt-5 space-y-4">

        {cities.map((city, index) => (
          <div
            key={city.name}
            className="rounded-2xl border border-white/15 p-4"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#20b8ef]/15 font-bold text-[#20b8ef]">
                  {index + 1}
                </div>

                <div>
                  <h3 className="font-bold">
                    {city.name}
                  </h3>

                  <p className="text-xs text-white/50">
                    {city.visitors.toLocaleString()}{" "}
                    visitors
                  </p>
                </div>
              </div>

              <span className="font-bold text-green-400">
                +{city.growth}%
              </span>

            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-[#20b8ef]"
                style={{
                  width: `${Math.min(
                    city.growth * 4,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

/* ========================================================= */
/* ACTIVITIES SECTION */
/* ========================================================= */

function ActivitiesSection({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <div>

      <SectionTitle>
        Popular Activities
      </SectionTitle>

      <div className="mt-5 grid gap-4 md:grid-cols-2">

        {activities.map(
          (activity, index) => (
            <div
              key={activity.name}
              className="rounded-2xl border border-white/15 p-5"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs text-white/40">
                    #{index + 1}
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {activity.name}
                  </h3>
                </div>

                <div className="text-right">

                  <p className="text-xl font-bold text-[#20b8ef]">
                    {activity.bookings}
                  </p>

                  <p className="text-xs text-white/40">
                    bookings
                  </p>

                </div>

              </div>

              <div className="mt-5">

                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-white/50">
                    Popularity
                  </span>

                  <span>
                    {activity.popularity}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white/10">

                  <div
                    className="h-full rounded-full bg-[#20b8ef]"
                    style={{
                      width: `${activity.popularity}%`,
                    }}
                  />

                </div>

              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}

/* ========================================================= */
/* ANALYTICS SECTION */
/* ========================================================= */

function AnalyticsSection() {
  return (
    <div>

      <SectionTitle>
        User Trends & Analytics
      </SectionTitle>

      {/* STATS */}

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">

        <AnalyticsCard
          label="Total Users"
          value="1,248"
          change="+18%"
        />

        <AnalyticsCard
          label="Active Users"
          value="942"
          change="+12%"
        />

        <AnalyticsCard
          label="Trips Created"
          value="3,842"
          change="+24%"
        />

        <AnalyticsCard
          label="Avg. Trips"
          value="3.1"
          change="+8%"
        />

      </div>

      {/* CHARTS */}

      <div className="mt-5 grid gap-5 xl:grid-cols-2">

        {/* PIE CHART */}

        <div className="rounded-3xl bg-[#f0f0f2] p-6 text-[#171717]">

          <h3 className="font-bold">
            User Distribution
          </h3>

          <div className="mt-7 flex flex-col items-center justify-center">

            <div
              className="relative h-52 w-52 rounded-full"
              style={{
                background:
                  "conic-gradient(#20b8ef 0deg 250deg, #70c34d 250deg 360deg)",
              }}
            >

              <div className="absolute inset-12 flex items-center justify-center rounded-full bg-[#f0f0f2]">

                <div className="text-center">
                  <p className="text-2xl font-extrabold">
                    1,248
                  </p>

                  <p className="text-xs text-black/50">
                    Users
                  </p>
                </div>

              </div>
            </div>

            <div className="mt-6 flex gap-6 text-sm">

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#20b8ef]" />
                Active
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#70c34d]" />
                Other
              </div>

            </div>
          </div>
        </div>

        {/* LINE CHART */}

        <div className="rounded-3xl bg-[#f0f0f2] p-6 text-[#171717]">

          <h3 className="font-bold">
            User Growth
          </h3>

          <div className="mt-8 h-[250px]">

            <svg
              viewBox="0 0 600 250"
              className="h-full w-full"
              preserveAspectRatio="none"
            >

              <line
                x1="40"
                y1="210"
                x2="570"
                y2="210"
                stroke="#b8b8b8"
                strokeWidth="4"
              />

              <line
                x1="40"
                y1="40"
                x2="40"
                y2="210"
                stroke="#b8b8b8"
                strokeWidth="4"
              />

              <polyline
                points="50,185 150,145 250,165 350,95 450,65 550,85"
                fill="none"
                stroke="#555"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {[
                [50, 185],
                [150, 145],
                [250, 165],
                [350, 95],
                [450, 65],
                [550, 85],
              ].map(
                ([cx, cy], index) => (
                  <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r="13"
                    fill="#c84f4f"
                  />
                )
              )}

            </svg>

          </div>
        </div>

        {/* BAR CHART */}

        <div className="rounded-3xl bg-[#f0f0f2] p-6 text-[#171717] xl:col-span-2">

          <h3 className="font-bold">
            Monthly Trips
          </h3>

          <div className="mt-8 flex h-[260px] items-end justify-center gap-5 md:gap-10">

            {[
              {
                month: "Jan",
                value: 45,
              },
              {
                month: "Feb",
                value: 65,
              },
              {
                month: "Mar",
                value: 82,
              },
              {
                month: "Apr",
                value: 58,
              },
              {
                month: "May",
                value: 94,
              },
              {
                month: "Jun",
                value: 76,
              },
            ].map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-col items-center justify-end"
              >

                <div className="mb-2 text-xs font-bold">
                  {item.value}
                </div>

                <div
                  className="w-10 rounded-t-lg bg-[#20b8ef] md:w-16"
                  style={{
                    height: `${item.value * 2}px`,
                  }}
                />

                <div className="mt-2 text-xs font-semibold">
                  {item.month}
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

/* ========================================================= */
/* SMALL COMPONENTS */
/* ========================================================= */

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-2xl font-bold">
      {children}
    </h2>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <h3 className="font-semibold">
        {title}:
      </h3>

      <p className="mt-1 text-sm leading-6 text-white/65">
        {children}
      </p>

    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs text-white/40">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}

function AnalyticsCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-4">

      <p className="text-xs text-white/45">
        {label}
      </p>

      <p className="mt-2 text-2xl font-extrabold">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold text-green-400">
        {change}
      </p>

    </div>
  );
}