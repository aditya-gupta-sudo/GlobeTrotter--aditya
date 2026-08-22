"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Trip = {
  id: number;
  title: string;
  destination: string;
  dates: string;
  image: string;
};

const plannedTrips: Trip[] = [
  {
    id: 1,
    title: "Swiss Alps Adventure",
    destination: "Switzerland",
    dates: "12 Jun - 20 Jun",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    title: "Bali Escape",
    destination: "Bali",
    dates: "10 Jul - 18 Jul",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    title: "European Summer",
    destination: "Paris",
    dates: "03 Aug - 12 Aug",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
  },
];

const previousTrips: Trip[] = [
  {
    id: 4,
    title: "Dubai Adventure",
    destination: "Dubai",
    dates: "18 Sep - 24 Sep",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    title: "Tokyo Journey",
    destination: "Tokyo",
    dates: "02 Mar - 10 Mar",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    title: "Greek Islands",
    destination: "Greece",
    dates: "14 Apr - 22 Apr",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85",
  },
];

export default function ProfilePage() {
  const router = useRouter();

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("Aditya Gupta");
  const [email, setEmail] = useState("adityagupta86@gmail.com");
  const [location, setLocation] = useState("Surat, India");

  const handleSave = () => {
    setEditing(false);
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
              onClick={() => router.push("/trips")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              My Trips
            </button>
          </nav>

          {/* Account */}
          <button
            onClick={() => setEditing(true)}
            className="rounded-full border border-[#08a8df] bg-[#08a8df] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0798ca]"
          >
            My account
          </button>
        </div>
      </header>

      {/* PAGE */}
      <section className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-14">
        {/* Page title */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
            Your account
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            My Profile
          </h1>

          <p className="mt-3 text-base text-[#687b8e] md:text-lg">
            Manage your profile and keep track of all your journeys.
          </p>
        </div>

        {/* PROFILE CARD */}
        <section className="overflow-hidden rounded-[28px] border border-[#dbe6ef] bg-white shadow-[0_15px_50px_rgba(20,32,51,0.07)]">
          {/* Profile top */}
          <div className="bg-gradient-to-r from-[#08a8df] to-[#55c6e9] px-6 py-8 md:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/80 bg-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=85"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#22c55e]">
                  <span className="text-xs text-white">✓</span>
                </div>
              </div>

              {/* Name */}
              <div className="text-white">
                <p className="text-sm font-medium text-white/75">
                  GlobeTrotter member
                </p>

                <h2 className="mt-1 text-3xl font-extrabold">
                  {name}
                </h2>

                <p className="mt-1 text-sm text-white/80">
                  Explorer · Traveller · Dreamer
                </p>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="p-6 md:p-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Personal information
                </h2>

                <p className="mt-1 text-sm text-[#718096]">
                  Your account details
                </p>
              </div>

              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-xl border border-[#cfe0eb] bg-white px-5 py-2.5 text-sm font-bold text-[#078dbd] transition hover:border-[#08a8df] hover:bg-[#eefaff]"
                >
                  ✎ Edit profile
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#718096]">
                  Full name
                </label>

                {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#dbe6ef] bg-white px-4 text-sm font-medium outline-none focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                  />
                ) : (
                  <div className="rounded-xl border border-[#e1eaf1] bg-[#f9fbfd] px-4 py-3.5 text-sm font-semibold">
                    {name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#718096]">
                  Email
                </label>

                {editing ? (
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#dbe6ef] bg-white px-4 text-sm font-medium outline-none focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                  />
                ) : (
                  <div className="rounded-xl border border-[#e1eaf1] bg-[#f9fbfd] px-4 py-3.5 text-sm font-semibold">
                    {email}
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#718096]">
                  Location
                </label>

                {editing ? (
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#dbe6ef] bg-white px-4 text-sm font-medium outline-none focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                  />
                ) : (
                  <div className="rounded-xl border border-[#e1eaf1] bg-[#f9fbfd] px-4 py-3.5 text-sm font-semibold">
                    {location}
                  </div>
                )}
              </div>

              {/* Member */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#718096]">
                  Member since
                </label>

                <div className="rounded-xl border border-[#e1eaf1] bg-[#f9fbfd] px-4 py-3.5 text-sm font-semibold">
                  January 2026
                </div>
              </div>
            </div>

            {/* Edit actions */}
            {editing && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSave}
                  className="rounded-xl bg-[#08a8df] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0798ca]"
                >
                  Save changes
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="rounded-xl border border-[#d4e1ed] bg-white px-6 py-3 text-sm font-bold text-[#52657a] transition hover:bg-[#f8fafc]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>

        {/* PREPLANNED TRIPS */}
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">
                Preplanned Trips
              </h2>

              <p className="mt-1 text-sm text-[#718096]">
                Trips you have planned for the future
              </p>
            </div>

            <button
              onClick={() => router.push("/plan-trip")}
              className="hidden rounded-full bg-[#08a8df] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0798ca] sm:block"
            >
              + Plan trip
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {plannedTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => router.push("/trips")}
              />
            ))}
          </div>
        </section>

        {/* PREVIOUS TRIPS */}
        <section className="mt-12">
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold md:text-3xl">
              Previous Trips
            </h2>

            <p className="mt-1 text-sm text-[#718096]">
              Your completed adventures and memories
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {previousTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => router.push("/trips")}
              />
            ))}
          </div>
        </section>

        {/* LOGOUT */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => router.push("/login")}
            className="rounded-full border border-red-200 bg-white px-7 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
          >
            Log out
          </button>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------ */
/* TRIP CARD */
/* ------------------------------------------------ */

function TripCard({
  trip,
  onClick,
}: {
  trip: Trip;
  onClick: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#dbe6ef] bg-white shadow-[0_8px_30px_rgba(20,32,51,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#abd9eb] hover:shadow-[0_18px_45px_rgba(8,168,223,0.12)]">
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.destination}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
            Destination
          </p>

          <h3 className="mt-1 text-xl font-extrabold text-white">
            {trip.destination}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[#142033]">
          {trip.title}
        </h3>

        <p className="mt-1 text-xs font-semibold text-[#08a8df]">
          {trip.dates}
        </p>

        <button
          onClick={onClick}
          className="mt-4 w-full rounded-xl border border-[#cfe0eb] py-2.5 text-sm font-bold text-[#078dbd] transition hover:border-[#08a8df] hover:bg-[#eefaff]"
        >
          View trip →
        </button>
      </div>
    </article>
  );
}