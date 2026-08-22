"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RequireAuth } from "@/components/auth/require-auth";
import { getApiErrorMessage } from "@/lib/api";
import { TripStopsPanel } from "@/components/planning/trip-stops-panel";
import {
  deleteTrip,
  formatTripDates,
  getTrip,
  getTripStatus,
  toDateInputValue,
  updateTrip,
  type Trip,
  type TripVisibility,
} from "@/lib/trips";

export default function TripDetailsPage() {
  return (
    <RequireAuth>
      <TripDetailsContent />
    </RequireAuth>
  );
}

function TripDetailsContent() {
  const params = useParams<{ tripId: string }>();
  const router = useRouter();
  const tripId = params.tripId;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visibility, setVisibility] = useState<TripVisibility>("PRIVATE");

  const loadTrip = useCallback(async () => {
    if (!tripId) {
      setError("Trip not found.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await getTrip(tripId);
      setTrip(data);
      setTitle(data.title);
      setDescription(data.description ?? "");
      setCoverImage(data.coverImage ?? "");
      setStartDate(toDateInputValue(data.startDate));
      setEndDate(toDateInputValue(data.endDate));
      setVisibility(data.visibility);
    } catch (err) {
      setTrip(null);
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    void loadTrip();
  }, [loadTrip]);

  const handleSave = async () => {
    if (!tripId) {
      return;
    }

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!startDate || !endDate) {
      setError("Start date and end date are required.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("End date must be on or after start date.");
      return;
    }

    setIsSaving(true);

    try {
      const updated = await updateTrip(tripId, {
        title: title.trim(),
        description: description.trim() ? description.trim() : null,
        coverImage: coverImage.trim() ? coverImage.trim() : null,
        startDate,
        endDate,
        visibility,
      });

      setTrip(updated);
      setIsEditing(false);
      setSuccess("Trip updated successfully.");
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!tripId) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      await deleteTrip(tripId);
      router.replace("/trips");
    } catch (err) {
      setIsDeleting(false);
      setConfirmDelete(false);
      setError(getApiErrorMessage(err));
    }
  };

  const status = trip
    ? getTripStatus(trip.startDate, trip.endDate)
    : "Upcoming";

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#142033]">
      <header className="sticky top-0 z-50 border-b border-[#dce7f1] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1100px] items-center justify-between px-5 md:px-8">
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

          <button
            type="button"
            onClick={() => router.push("/trips")}
            className="rounded-full border border-[#d4e1ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#43566b] transition hover:border-[#08a8df] hover:text-[#08a8df]"
          >
            ← Back to trips
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
        {isLoading && (
          <div className="rounded-3xl border border-[#dbe6ef] bg-white px-6 py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#08a8df] border-t-transparent" />
            <p className="mt-4 text-sm text-[#718096]">Loading trip...</p>
          </div>
        )}

        {!isLoading && error && !trip && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center">
            <h1 className="text-2xl font-bold text-red-700">Unable to load trip</h1>
            <p className="mt-3 text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={() => router.push("/trips")}
              className="mt-6 rounded-full bg-[#08a8df] px-6 py-3 text-sm font-bold text-white"
            >
              Return to My Trips
            </button>
          </div>
        )}

        {!isLoading && trip && (
          <>
            {success && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <div className="overflow-hidden rounded-[28px] border border-[#dbe6ef] bg-white shadow-[0_15px_50px_rgba(20,32,51,0.07)]">
              <div className="relative h-64 bg-gradient-to-br from-[#08a8df] to-[#0b6f94]">
                {trip.coverImage ? (
                  <img
                    src={trip.coverImage}
                    alt={trip.title}
                    className="h-full w-full object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                      {status}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                      {trip.visibility}
                    </span>
                  </div>
                  <h1 className="text-3xl font-extrabold md:text-4xl">{trip.title}</h1>
                  <p className="mt-2 text-sm font-medium text-white/80">
                    {formatTripDates(trip.startDate, trip.endDate)}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {!isEditing ? (
                  <>
                    <p className="text-base leading-7 text-[#52657a]">
                      {trip.description || "No description added yet."}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setError("");
                          setSuccess("");
                          setIsEditing(true);
                        }}
                        className="rounded-full bg-[#08a8df] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0798ca]"
                      >
                        Edit trip
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setError("");
                          setConfirmDelete(true);
                        }}
                        className="rounded-full border border-red-200 bg-white px-6 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                      >
                        Delete trip
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="grid gap-5">
                    <div>
                      <label htmlFor="title" className="mb-2 block text-sm font-bold">
                        Title
                      </label>
                      <input
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm outline-none focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="mb-2 block text-sm font-bold">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-[#dbe6ef] px-4 py-3 text-sm outline-none focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                      />
                    </div>

                    <div>
                      <label htmlFor="coverImage" className="mb-2 block text-sm font-bold">
                        Cover image URL
                      </label>
                      <input
                        id="coverImage"
                        value={coverImage}
                        onChange={(event) => setCoverImage(event.target.value)}
                        placeholder="https://"
                        className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm outline-none focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="startDate" className="mb-2 block text-sm font-bold">
                          Start date
                        </label>
                        <input
                          id="startDate"
                          type="date"
                          value={startDate}
                          onChange={(event) => setStartDate(event.target.value)}
                          className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm outline-none focus:border-[#08a8df]"
                        />
                      </div>
                      <div>
                        <label htmlFor="endDate" className="mb-2 block text-sm font-bold">
                          End date
                        </label>
                        <input
                          id="endDate"
                          type="date"
                          value={endDate}
                          onChange={(event) => setEndDate(event.target.value)}
                          className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm outline-none focus:border-[#08a8df]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="visibility" className="mb-2 block text-sm font-bold">
                        Visibility
                      </label>
                      <select
                        id="visibility"
                        value={visibility}
                        onChange={(event) =>
                          setVisibility(event.target.value as TripVisibility)
                        }
                        className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm font-semibold outline-none focus:border-[#08a8df]"
                      >
                        <option value="PRIVATE">PRIVATE</option>
                        <option value="PUBLIC">PUBLIC</option>
                      </select>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => void handleSave()}
                        disabled={isSaving}
                        className="rounded-full bg-[#08a8df] px-6 py-3 text-sm font-bold text-white disabled:opacity-70"
                      >
                        {isSaving ? "Saving..." : "Save changes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setError("");
                          setTitle(trip.title);
                          setDescription(trip.description ?? "");
                          setCoverImage(trip.coverImage ?? "");
                          setStartDate(toDateInputValue(trip.startDate));
                          setEndDate(toDateInputValue(trip.endDate));
                          setVisibility(trip.visibility);
                        }}
                        className="rounded-full border border-[#d4e1ed] px-6 py-3 text-sm font-bold text-[#43566b]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <TripStopsPanel
              tripId={trip.id}
              defaultArrival={trip.startDate}
              defaultDeparture={trip.endDate}
            />
          </>
        )}
      </section>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">Delete this trip?</h2>
            <p className="mt-2 text-sm text-[#718096]">
              This cannot be undone. The trip will be removed from your account.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                disabled={isDeleting}
                className="rounded-full border border-[#d4e1ed] px-5 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={isDeleting}
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-70"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
