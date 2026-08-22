"use client";

import { useCallback, useEffect, useState } from "react";
import { getApiErrorMessage } from "@/lib/api";
import {
  assignActivityToStop,
  listActivitiesByCity,
  type Activity,
} from "@/lib/catalog-activities";
import { listCities, type City } from "@/lib/cities";
import {
  createTripStop,
  deleteTripStop,
  listTripStops,
  type TripStop,
} from "@/lib/stops";
import { toDateInputValue } from "@/lib/trips";

export function TripStopsPanel({
  tripId,
  defaultArrival,
  defaultDeparture,
}: {
  tripId: string;
  defaultArrival: string;
  defaultDeparture: string;
}) {
  const [stops, setStops] = useState<TripStop[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [cityId, setCityId] = useState("");
  const [arrivalDate, setArrivalDate] = useState(toDateInputValue(defaultArrival));
  const [departureDate, setDepartureDate] = useState(
    toDateInputValue(defaultDeparture)
  );
  const [stopOrder, setStopOrder] = useState(1);

  const [activityStopId, setActivityStopId] = useState<string | null>(null);
  const [cityActivities, setCityActivities] = useState<Activity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  const cityName = (id: string) => {
    const city = cities.find((item) => item.id === id);
    return city ? `${city.name}, ${city.country}` : id;
  };

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const [stopRows, cityRows] = await Promise.all([
        listTripStops(tripId),
        listCities(),
      ]);
      setStops(stopRows);
      setCities(cityRows);
      setStopOrder(stopRows.length + 1);
      setCityId((current) => current || cityRows[0]?.id || "");
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleAddStop = async () => {
    setError("");
    setSuccess("");

    if (!cityId) {
      setError("Select a city.");
      return;
    }

    setIsSaving(true);

    try {
      await createTripStop(tripId, {
        cityId,
        arrivalDate,
        departureDate,
        stopOrder,
      });
      setSuccess("Stop added.");
      await load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteStop = async (stopId: string) => {
    setError("");
    setSuccess("");

    try {
      await deleteTripStop(stopId);
      setSuccess("Stop removed.");
      await load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const openActivities = async (stop: TripStop) => {
    setActivityStopId(stop.id);
    setIsLoadingActivities(true);
    setError("");

    try {
      const rows = await listActivitiesByCity(stop.cityId);
      setCityActivities(rows);
    } catch (err) {
      setCityActivities([]);
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoadingActivities(false);
    }
  };

  const handleAssign = async (activityId: string) => {
    if (!activityStopId) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await assignActivityToStop(activityStopId, {
        activityId,
        dayNumber: 1,
      });
      setSuccess("Activity added to this stop.");
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <section className="mt-8 rounded-[28px] border border-[#dbe6ef] bg-white p-6 shadow-[0_15px_50px_rgba(20,32,51,0.07)] md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold">Stops</h2>
          <p className="mt-1 text-sm text-[#718096]">
            Cities on this trip, in visit order.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/itinerary/${tripId}`}
            className="rounded-full border border-[#d4e1ed] px-4 py-2 text-sm font-semibold text-[#43566b]"
          >
            Itinerary
          </a>
          <a
            href={`/itinerary-budget/${tripId}`}
            className="rounded-full border border-[#d4e1ed] px-4 py-2 text-sm font-semibold text-[#43566b]"
          >
            Budget
          </a>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-[#718096]">Loading stops...</p>
      ) : stops.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#dbe6ef] px-4 py-6 text-sm text-[#718096]">
          No stops yet. Add a city below.
        </p>
      ) : (
        <ul className="space-y-3">
          {stops.map((stop) => (
            <li
              key={stop.id}
              className="rounded-2xl border border-[#dbe6ef] bg-[#fbfdff] p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#08a8df]">
                    Stop {stop.stopOrder}
                  </p>
                  <p className="text-lg font-bold">{cityName(stop.cityId)}</p>
                  <p className="text-sm text-[#718096]">
                    {toDateInputValue(stop.arrivalDate)} →{" "}
                    {toDateInputValue(stop.departureDate)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void openActivities(stop)}
                    className="rounded-full border border-[#d4e1ed] px-4 py-2 text-sm font-semibold"
                  >
                    Add activity
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDeleteStop(stop.id)}
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {activityStopId === stop.id && (
                <div className="mt-4 border-t border-[#e8eef3] pt-4">
                  {isLoadingActivities ? (
                    <p className="text-sm text-[#718096]">Loading activities...</p>
                  ) : cityActivities.length === 0 ? (
                    <p className="text-sm text-[#718096]">
                      No catalog activities for this city.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {cityActivities.map((activity) => (
                        <li
                          key={activity.id}
                          className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2"
                        >
                          <div>
                            <p className="font-semibold">{activity.title}</p>
                            <p className="text-xs text-[#718096]">
                              {activity.category} · {activity.duration} min ·{" "}
                              {activity.estimatedCost}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => void handleAssign(activity.id)}
                            className="text-sm font-bold text-[#08a8df]"
                          >
                            Assign
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 grid gap-3 border-t border-[#e8eef3] pt-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-bold">City</label>
          <select
            value={cityId}
            onChange={(event) => setCityId(event.target.value)}
            className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm"
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold">Stop order</label>
          <input
            type="number"
            min={1}
            value={stopOrder}
            onChange={(event) => setStopOrder(Number(event.target.value))}
            className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold">Arrival</label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(event) => setArrivalDate(event.target.value)}
            className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold">Departure</label>
          <input
            type="date"
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
            className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => void handleAddStop()}
        disabled={isSaving || cities.length === 0}
        className="mt-4 rounded-full bg-[#08a8df] px-6 py-3 text-sm font-bold text-white disabled:opacity-70"
      >
        {isSaving ? "Adding stop..." : "Add stop"}
      </button>
    </section>
  );
}
