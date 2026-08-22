"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RequireAuth } from "@/components/auth/require-auth";
import { useAuth } from "@/lib/auth-context";
import { getApiErrorMessage } from "@/lib/api";
import { getProfile, updateProfile, type ProfileUser } from "@/lib/profile";
import {
  formatTripDates,
  getTripStatus,
  listTrips,
  type Trip,
} from "@/lib/trips";

type TripCardModel = {
  id: string;
  title: string;
  destination: string;
  dates: string;
  image: string;
};

function toTripCard(trip: Trip): TripCardModel {
  return {
    id: trip.id,
    title: trip.title,
    destination: trip.description?.trim() || trip.title,
    dates: formatTripDates(trip.startDate, trip.endDate),
    image: trip.coverImage ?? "",
  };
}

function formatMemberSince(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function ProfilePage() {
  return (
    <RequireAuth>
      <ProfileContent />
    </RequireAuth>
  );
}

function ProfileContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const [profileData, tripRows] = await Promise.all([
          getProfile(),
          listTrips(),
        ]);
        setProfile(profileData);
        setName(profileData.name);
        setEmail(profileData.email);
        setTrips(tripRows);
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const plannedTrips = useMemo(
    () =>
      trips
        .filter((trip) => getTripStatus(trip.startDate, trip.endDate) !== "Completed")
        .map(toTripCard),
    [trips]
  );

  const previousTrips = useMemo(
    () =>
      trips
        .filter((trip) => getTripStatus(trip.startDate, trip.endDate) === "Completed")
        .map(toTripCard),
    [trips]
  );

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError("");

    try {
      const updated = await updateProfile({ name: name.trim() });
      setProfile(updated);
      setName(updated.name);
      setEmail(updated.email);
      setEditing(false);
    } catch (err) {
      setSaveError(getApiErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const displayName = name || profile?.name || user?.name || "";
  const displayEmail = email || profile?.email || user?.email || "";
  const avatar = profile?.avatar ?? user?.avatar;

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
              onClick={() => router.push("/trips")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#53677b] transition hover:bg-[#eef9fd] hover:text-[#08a8df]"
            >
              My Trips
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-full border border-[#08a8df] bg-[#08a8df] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0798ca]"
            >
              My account
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-[#d4e1ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#43566b] transition hover:border-red-200 hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-14">
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

        {isLoading && (
          <p className="mb-6 text-sm text-[#718096]">Loading profile...</p>
        )}
        {error && (
          <p className="mb-6 text-sm font-medium text-red-600">{error}</p>
        )}

        <section className="overflow-hidden rounded-[28px] border border-[#dbe6ef] bg-white shadow-[0_15px_50px_rgba(20,32,51,0.07)]">
          <div className="bg-gradient-to-r from-[#08a8df] to-[#55c6e9] px-6 py-8 md:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/80 bg-white shadow-xl">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-extrabold text-[#08a8df]">
                      {(displayName || "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#22c55e]">
                  <span className="text-xs text-white">✓</span>
                </div>
              </div>

              <div className="text-white">
                <p className="text-sm font-medium text-white/75">
                  GlobeTrotter member
                </p>

                <h2 className="mt-1 text-3xl font-extrabold">{displayName}</h2>

                <p className="mt-1 text-sm text-white/80">
                  Explorer · Traveller · Dreamer
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Personal information</h2>

                <p className="mt-1 text-sm text-[#718096]">Your account details</p>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="rounded-xl border border-[#cfe0eb] bg-white px-5 py-2.5 text-sm font-bold text-[#078dbd] transition hover:border-[#08a8df] hover:bg-[#eefaff]"
                >
                  ✎ Edit profile
                </button>
              )}
            </div>

            {saveError && (
              <p className="mb-4 text-sm font-medium text-red-600">{saveError}</p>
            )}

            <div className="grid gap-5 md:grid-cols-2">
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
                    {displayName}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#718096]">
                  Email
                </label>

                <div className="rounded-xl border border-[#e1eaf1] bg-[#f9fbfd] px-4 py-3.5 text-sm font-semibold">
                  {displayEmail}
                </div>
              </div>

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
                    {location || "Not available"}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#718096]">
                  Member since
                </label>

                <div className="rounded-xl border border-[#e1eaf1] bg-[#f9fbfd] px-4 py-3.5 text-sm font-semibold">
                  {profile?.createdAt
                    ? formatMemberSince(profile.createdAt)
                    : user?.createdAt
                      ? formatMemberSince(user.createdAt)
                      : ""}
                </div>
              </div>
            </div>

            {editing && (
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={isSaving}
                  className="rounded-xl bg-[#08a8df] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0798ca] disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setSaveError("");
                    if (profile) {
                      setName(profile.name);
                    }
                  }}
                  className="rounded-xl border border-[#d4e1ed] bg-white px-6 py-3 text-sm font-bold text-[#52657a] transition hover:bg-[#f8fafc]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>

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
              type="button"
              onClick={() => router.push("/plan-trip")}
              className="hidden rounded-full bg-[#08a8df] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0798ca] sm:block"
            >
              + Plan trip
            </button>
          </div>

          {!isLoading && plannedTrips.length === 0 && (
            <p className="text-sm text-[#718096]">No upcoming trips yet.</p>
          )}

          <div className="grid gap-5 md:grid-cols-3">
            {plannedTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => router.push(`/trips/${trip.id}`)}
              />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold md:text-3xl">Previous Trips</h2>

            <p className="mt-1 text-sm text-[#718096]">
              Your completed adventures and memories
            </p>
          </div>

          {!isLoading && previousTrips.length === 0 && (
            <p className="text-sm text-[#718096]">No completed trips yet.</p>
          )}

          <div className="grid gap-5 md:grid-cols-3">
            {previousTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => router.push(`/trips/${trip.id}`)}
              />
            ))}
          </div>
        </section>

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-red-200 bg-white px-7 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
          >
            Log out
          </button>
        </div>
      </section>
    </main>
  );
}

function TripCard({
  trip,
  onClick,
}: {
  trip: TripCardModel;
  onClick: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#dbe6ef] bg-white shadow-[0_8px_30px_rgba(20,32,51,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#abd9eb] hover:shadow-[0_18px_45px_rgba(8,168,223,0.12)]">
      <div className="relative h-[220px] overflow-hidden bg-[#142033]">
        {trip.image ? (
          <img
            src={trip.image}
            alt={trip.destination}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
            Destination
          </p>

          <h3 className="mt-1 text-xl font-extrabold text-white">{trip.destination}</h3>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-[#142033]">{trip.title}</h3>

        <p className="mt-1 text-xs font-semibold text-[#08a8df]">{trip.dates}</p>

        <button
          type="button"
          onClick={onClick}
          className="mt-4 w-full rounded-xl border border-[#cfe0eb] py-2.5 text-sm font-bold text-[#078dbd] transition hover:border-[#08a8df] hover:bg-[#eefaff]"
        >
          View trip →
        </button>
      </div>
    </article>
  );
}
