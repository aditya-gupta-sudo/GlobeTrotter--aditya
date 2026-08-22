"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RequireAuth } from "@/components/auth/require-auth";
import { getApiErrorMessage } from "@/lib/api";
import { listTrips, toDateInputValue } from "@/lib/trips";

type CalendarEvent = {
  tripId: string;
  title: string;
  startDate: string;
  endDate: string;
  color: string;
};

const EVENT_COLORS = ["#08a8df", "#7c5cff", "#16a085", "#f39c12", "#e74c3c", "#2c3e50"];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isDateBetween(date: string, start: string, end: string) {
  return date >= start && date <= end;
}

export default function CalendarPage() {
  return (
    <RequireAuth>
      <CalendarContent />
    </RequireAuth>
  );
}

function CalendarContent() {
  const router = useRouter();

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Date");
  const [tripEvents, setTripEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const trips = await listTrips();
        setTripEvents(
          trips.map((trip, index) => ({
            tripId: trip.id,
            title: trip.title,
            startDate: toDateInputValue(trip.startDate),
            endDate: toDateInputValue(trip.endDate),
            color: EVENT_COLORS[index % EVENT_COLORS.length],
          }))
        );
      } catch (err) {
        setTripEvents([]);
        setError(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const previousMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: previousMonthDays - i,
        currentMonth: false,
        dateObject: new Date(currentYear, currentMonth - 1, previousMonthDays - i),
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        currentMonth: true,
        dateObject: new Date(currentYear, currentMonth, i),
      });
    }

    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        date: nextDay,
        currentMonth: false,
        dateObject: new Date(currentYear, currentMonth + 1, nextDay),
      });

      nextDay++;
    }

    return days;
  }, [currentMonth, currentYear]);

  const visibleEvents = useMemo(() => {
    let events = [...tripEvents];

    if (search.trim()) {
      const query = search.toLowerCase();

      events = events.filter((event) => event.title.toLowerCase().includes(query));
    }

    if (sort === "Name") {
      events.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "Date") {
      events.sort((a, b) => a.startDate.localeCompare(b.startDate));
    }

    return events;
  }, [search, sort, tripEvents]);

  function previousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function goToToday() {
    const now = new Date();

    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  }

  function getEventsForDate(date: Date) {
    const dateString = formatDate(date);

    return visibleEvents.filter((event) =>
      isDateBetween(dateString, event.startDate, event.endDate)
    );
  }

  function isToday(date: Date) {
    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

  function openTripDetails(tripId: string) {
    router.push(`/trips/${tripId}`);
  }

  return (
    <main className="min-h-screen bg-[#101010] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-[1450px]">
        <header className="mb-6 rounded-[22px] border border-white/20 bg-[#151515]">
          <div className="flex h-[78px] items-center justify-between border-b border-white/20 px-6 md:px-9">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-lg">
                ◈
              </div>

              <span className="text-xl font-semibold tracking-tight">
                Globe<span className="text-[#20b8ef]">Trotter</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-lg hover:bg-white/10"
            >
              👤
            </button>
          </div>

          <div className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:px-9">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/50">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bar ......"
                className="h-12 w-full rounded-xl border border-white/25 bg-transparent pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#20b8ef]"
              />
            </div>

            <button
              type="button"
              className="h-12 rounded-xl border border-white/25 px-6 text-sm font-semibold hover:bg-white/10"
            >
              Group by
            </button>

            <button
              type="button"
              className="h-12 rounded-xl border border-white/25 px-6 text-sm font-semibold hover:bg-white/10"
            >
              Filter
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-12 rounded-xl border border-white/25 bg-[#151515] px-5 text-sm font-semibold outline-none"
            >
              <option value="Date">Sort by Date</option>
              <option value="Name">Sort by Name</option>
            </select>
          </div>
        </header>

        <section className="rounded-[22px] border border-white/20 bg-[#151515] p-5 md:p-8">
          <h1 className="mb-7 text-center text-3xl font-semibold">Calendar View</h1>

          {isLoading && (
            <p className="mb-6 text-center text-sm text-white/60">Loading trips...</p>
          )}
          {error && (
            <p className="mb-6 text-center text-sm font-medium text-red-400">{error}</p>
          )}

          <div className="mx-auto max-w-[1120px] overflow-hidden rounded-xl bg-white text-[#151515] shadow-2xl">
            <div className="flex items-center justify-between px-6 py-7 md:px-9">
              <button
                type="button"
                onClick={previousMonth}
                className="flex h-11 w-11 items-center justify-center rounded-full text-3xl hover:bg-black/5"
                aria-label="Previous month"
              >
                ←
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold md:text-3xl">
                  {monthNames[currentMonth]} {currentYear}
                </h2>

                <button
                  type="button"
                  onClick={goToToday}
                  className="mt-2 text-xs font-bold uppercase tracking-wider text-[#08a8df] hover:underline"
                >
                  Today
                </button>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                className="flex h-11 w-11 items-center justify-center rounded-full text-3xl hover:bg-black/5"
                aria-label="Next month"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 border-t border-[#e3e3e3]">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="border-r border-[#e3e3e3] px-2 py-4 text-center text-xs font-bold md:text-sm"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const dateString = formatDate(day.dateObject);
                const events = getEventsForDate(day.dateObject);

                return (
                  <div
                    key={`${dateString}-${index}`}
                    className={`relative min-h-[105px] border-r border-t border-[#e3e3e3] p-2 md:min-h-[135px] md:p-3 ${
                      !day.currentMonth ? "bg-[#f7f7f7] text-[#b6b6b6]" : "bg-white"
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                        isToday(day.dateObject) ? "bg-[#08a8df] text-white" : ""
                      }`}
                    >
                      {day.date}
                    </div>

                    <div className="mt-2 space-y-1">
                      {events.map((event) => {
                        const isStart = dateString === event.startDate;
                        const isEnd = dateString === event.endDate;

                        return (
                          <button
                            key={event.tripId}
                            type="button"
                            onClick={() => openTripDetails(event.tripId)}
                            className="group w-full text-left"
                          >
                            <div
                              className={`truncate px-2 py-1.5 text-[10px] font-bold text-white transition hover:opacity-80 md:text-xs ${
                                isStart ? "rounded-l-md" : ""
                              } ${isEnd ? "rounded-r-md" : ""}`}
                              style={{
                                backgroundColor: event.color,
                              }}
                            >
                              {isStart ? event.title : ""}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-7 max-w-[1120px]">
            <h3 className="mb-4 text-lg font-semibold">Your trips</h3>

            {!isLoading && !error && visibleEvents.length === 0 && (
              <p className="text-sm text-white/55">No trips to show on the calendar.</p>
            )}

            <div className="flex flex-wrap gap-3">
              {visibleEvents.map((event) => (
                <button
                  key={event.tripId}
                  type="button"
                  onClick={() => openTripDetails(event.tripId)}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: event.color,
                    }}
                  />

                  {event.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
