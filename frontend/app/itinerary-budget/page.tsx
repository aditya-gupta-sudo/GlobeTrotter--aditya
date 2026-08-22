"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Activity = {
  id: number;
  title: string;
  description: string;
  expense: number;
};

type Day = {
  id: number;
  activities: Activity[];
};

const initialDays: Day[] = [
  {
    id: 1,
    activities: [
      {
        id: 1,
        title: "Airport → Hotel",
        description: "Travel from the airport to the hotel.",
        expense: 1200,
      },
      {
        id: 2,
        title: "City Sightseeing",
        description: "Explore the main attractions around the city.",
        expense: 1800,
      },
      {
        id: 3,
        title: "Dinner Experience",
        description: "Enjoy a local dinner and experience the local cuisine.",
        expense: 1500,
      },
    ],
  },
  {
    id: 2,
    activities: [
      {
        id: 4,
        title: "Mountain Trek",
        description: "Morning trek through scenic mountain trails.",
        expense: 2500,
      },
      {
        id: 5,
        title: "Local Market",
        description: "Explore local markets and discover regional products.",
        expense: 1000,
      },
      {
        id: 6,
        title: "Sunset Viewpoint",
        description: "Visit a beautiful viewpoint before sunset.",
        expense: 800,
      },
    ],
  },
];

export default function BudgetItineraryPage() {
  const router = useRouter();

  const [days, setDays] = useState<Day[]>(initialDays);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [budget, setBudget] = useState(12000);

  const [showBudgetEditor, setShowBudgetEditor] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);

  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    expense: "",
    day: 1,
  });

  /*
   * FILTER + SORT
   */
  const displayedDays = useMemo(() => {
    return days.map((day) => {
      let activities = [...day.activities];

      if (search.trim()) {
        const query = search.toLowerCase();

        activities = activities.filter(
          (activity) =>
            activity.title.toLowerCase().includes(query) ||
            activity.description.toLowerCase().includes(query)
        );
      }

      if (sort === "low") {
        activities.sort((a, b) => a.expense - b.expense);
      }

      if (sort === "high") {
        activities.sort((a, b) => b.expense - a.expense);
      }

      return {
        ...day,
        activities,
      };
    });
  }, [days, search, sort]);

  /*
   * TOTAL EXPENSE
   */
  const totalExpense = days.reduce(
    (total, day) =>
      total +
      day.activities.reduce(
        (dayTotal, activity) => dayTotal + activity.expense,
        0
      ),
    0
  );

  const remainingBudget = budget - totalExpense;

  /*
   * ADD ACTIVITY
   */
  function addActivity() {
    if (!newActivity.title.trim()) {
      return;
    }

    const expense = Number(newActivity.expense) || 0;

    setDays((currentDays) =>
      currentDays.map((day) => {
        if (day.id !== newActivity.day) {
          return day;
        }

        return {
          ...day,
          activities: [
            ...day.activities,
            {
              id: Date.now(),
              title: newActivity.title,
              description:
                newActivity.description || "New itinerary activity.",
              expense,
            },
          ],
        };
      })
    );

    setNewActivity({
      title: "",
      description: "",
      expense: "",
      day: 1,
    });

    setShowAddActivity(false);
  }

  /*
   * DELETE ACTIVITY
   */
  function deleteActivity(dayId: number, activityId: number) {
    setDays((currentDays) =>
      currentDays.map((day) => {
        if (day.id !== dayId) {
          return day;
        }

        return {
          ...day,
          activities: day.activities.filter(
            (activity) => activity.id !== activityId
          ),
        };
      })
    );
  }

  /*
   * ADD DAY
   */
  function addDay() {
    setDays((currentDays) => [
      ...currentDays,
      {
        id: currentDays.length + 1,
        activities: [],
      },
    ]);
  }

  return (
    <main className="min-h-screen bg-[#f5f8fb] text-[#152033]">
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#dce6ee] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1250px] items-center justify-between px-5 md:px-8">
          {/* LOGO */}

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08a8df] text-xl font-bold text-white">
              ◈
            </div>

            <span className="text-xl font-extrabold tracking-tight">
              Globe<span className="text-[#08a8df]">Trotter</span>
            </span>
          </button>

          {/* NAV */}

          <nav className="hidden items-center gap-1 md:flex">
            <button
              onClick={() => router.push("/explore")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#617589] transition hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Explore
            </button>

            <button
              onClick={() => router.push("/destinations")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#617589] transition hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Destinations
            </button>

            <button
              onClick={() => router.push("/experiences")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#617589] transition hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              Experiences
            </button>

            <button
              onClick={() => router.push("/trips")}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#617589] transition hover:bg-[#eefaff] hover:text-[#08a8df]"
            >
              My Trips
            </button>
          </nav>

          <button
            onClick={() => router.push("/profile")}
            className="rounded-full border border-[#d9e4ec] bg-white px-5 py-2.5 text-sm font-bold shadow-sm transition hover:border-[#08a8df] hover:text-[#08a8df]"
          >
            My account
          </button>
        </div>
      </header>

      {/* ===================================================== */}
      {/* PAGE */}
      {/* ===================================================== */}

      <div className="mx-auto max-w-[1250px] px-5 py-8 md:px-8 md:py-12">
        {/* TOP TITLE */}

        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
              Trip planner
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Itinerary & budget
            </h1>

            <p className="mt-2 text-[#6d8092]">
              Manage your activities and keep your trip expenses under control.
            </p>
          </div>

          {/* BUDGET SUMMARY */}

          <div className="rounded-2xl border border-[#dce6ee] bg-white px-6 py-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#7b8c9d]">
              Trip budget
            </p>

            <div className="mt-1 flex items-center gap-3">
              <span className="text-2xl font-extrabold">
                ₹{budget.toLocaleString("en-IN")}
              </span>

              <button
                onClick={() => setShowBudgetEditor(true)}
                className="text-sm font-bold text-[#08a8df] hover:underline"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* SEARCH + FILTER BAR */}
        {/* ===================================================== */}

        <section className="mb-8 rounded-2xl border border-[#dce6ee] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* SEARCH */}

            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#91a3b4]">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search itinerary..."
                className="h-12 w-full rounded-xl border border-[#dbe5ed] bg-[#f8fafc] pl-11 pr-4 text-sm outline-none transition focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
              />
            </div>

            {/* GROUP */}

            <button className="h-12 rounded-xl border border-[#dbe5ed] bg-white px-5 text-sm font-bold text-[#52667a] transition hover:border-[#08a8df] hover:text-[#08a8df]">
              Group by
            </button>

            {/* FILTER */}

            <button className="h-12 rounded-xl border border-[#dbe5ed] bg-white px-5 text-sm font-bold text-[#52667a] transition hover:border-[#08a8df] hover:text-[#08a8df]">
              Filter
            </button>

            {/* SORT */}

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-12 rounded-xl border border-[#dbe5ed] bg-white px-4 text-sm font-bold text-[#52667a] outline-none"
            >
              <option value="default">Sort by...</option>
              <option value="low">Expense: Low → High</option>
              <option value="high">Expense: High → Low</option>
            </select>
          </div>
        </section>

        {/* ===================================================== */}
        {/* ITINERARY CONTENT */}
        {/* ===================================================== */}

        <section className="rounded-3xl border border-[#dce6ee] bg-white p-5 shadow-[0_12px_40px_rgba(20,32,51,0.06)] md:p-8">
          {/* DESTINATION */}

          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
              Selected destination
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              Itinerary for a selected place
            </h2>

            <p className="mt-2 text-[#75889a]">
              Your journey, activities and expenses — all in one place.
            </p>
          </div>

          {/* TABLE HEADERS */}

          <div className="mb-4 hidden grid-cols-[120px_1fr_190px] gap-5 px-3 md:grid">
            <div />

            <div className="text-sm font-extrabold uppercase tracking-wider text-[#63778a]">
              Physical Activity
            </div>

            <div className="text-sm font-extrabold uppercase tracking-wider text-[#63778a]">
              Expense
            </div>
          </div>

          {/* DAYS */}

          <div className="space-y-10">
            {displayedDays.map((day) => {
              const dayTotal = day.activities.reduce(
                (sum, activity) => sum + activity.expense,
                0
              );

              return (
                <div key={day.id} className="relative">
                  {/* DAY HEADER */}

                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 items-center rounded-xl bg-[#142033] px-4 text-sm font-extrabold text-white shadow-sm">
                        Day {day.id}
                      </div>

                      <div className="h-px w-12 bg-[#dce6ee] md:w-20" />
                    </div>

                    <div className="rounded-full bg-[#eefaff] px-4 py-2 text-xs font-bold text-[#078dbd]">
                      Day total: ₹{dayTotal.toLocaleString("en-IN")}
                    </div>
                  </div>

                  {/* ACTIVITIES */}

                  {day.activities.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#cddbe5] p-8 text-center">
                      <p className="text-sm text-[#7b8d9e]">
                        No activities added for this day.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {day.activities.map((activity, index) => (
                        <div key={activity.id}>
                          <div className="grid gap-4 md:grid-cols-[120px_1fr_190px] md:gap-5">
                            {/* ACTIVITY NUMBER */}

                            <div className="hidden items-center justify-center md:flex">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#b9dceb] bg-[#f3fbfe] text-sm font-extrabold text-[#08a8df]">
                                {index + 1}
                              </div>
                            </div>

                            {/* ACTIVITY */}

                            <div className="group rounded-2xl border border-[#dce6ee] bg-[#fbfdfe] p-5 transition hover:border-[#8ed5ed] hover:shadow-md">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="text-lg font-extrabold">
                                    {activity.title}
                                  </h3>

                                  <p className="mt-1 text-sm leading-6 text-[#718497]">
                                    {activity.description}
                                  </p>
                                </div>

                                <button
                                  onClick={() =>
                                    deleteActivity(day.id, activity.id)
                                  }
                                  className="opacity-0 transition group-hover:opacity-100"
                                  title="Delete activity"
                                >
                                  ×
                                </button>
                              </div>
                            </div>

                            {/* EXPENSE */}

                            <div className="flex items-center justify-between rounded-2xl border border-[#dce6ee] bg-[#f8fafc] px-5 py-4 md:block">
                              <span className="text-xs font-bold uppercase tracking-wider text-[#8999a8] md:block">
                                Expense
                              </span>

                              <p className="mt-0 text-xl font-extrabold text-[#142033] md:mt-2">
                                ₹{activity.expense.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>

                          {/* CONNECTOR */}

                          {index < day.activities.length - 1 && (
                            <div className="ml-[59px] hidden h-7 border-l-2 border-dashed border-[#b9dceb] md:block" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ===================================================== */}
          {/* ADD ACTIVITY */}
          {/* ===================================================== */}

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-[#e3ebf1] pt-8">
            <button
              onClick={() => setShowAddActivity(true)}
              className="rounded-xl bg-[#08a8df] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,168,223,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0798ca]"
            >
              + Add activity
            </button>

            <button
              onClick={addDay}
              className="text-sm font-bold text-[#65798c] hover:text-[#08a8df]"
            >
              + Add another day
            </button>
          </div>
        </section>

        {/* ===================================================== */}
        {/* BUDGET SUMMARY */}
        {/* ===================================================== */}

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {/* TOTAL */}

          <div className="rounded-2xl border border-[#dce6ee] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#8293a4]">
              Total expenses
            </p>

            <p className="mt-2 text-3xl font-extrabold">
              ₹{totalExpense.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-sm text-[#788a9b]">
              Across all itinerary days
            </p>
          </div>

          {/* BUDGET */}

          <div className="rounded-2xl border border-[#dce6ee] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#8293a4]">
              Planned budget
            </p>

            <p className="mt-2 text-3xl font-extrabold">
              ₹{budget.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-sm text-[#788a9b]">
              Your target spending limit
            </p>
          </div>

          {/* REMAINING */}

          <div
            className={`rounded-2xl border p-6 shadow-sm ${
              remainingBudget >= 0
                ? "border-[#bce5d0] bg-[#f4fcf7]"
                : "border-[#f2c4c4] bg-[#fff7f7]"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[#8293a4]">
              {remainingBudget >= 0
                ? "Remaining budget"
                : "Over budget"}
            </p>

            <p
              className={`mt-2 text-3xl font-extrabold ${
                remainingBudget >= 0
                  ? "text-[#16834b]"
                  : "text-[#d14343]"
              }`}
            >
              ₹{Math.abs(remainingBudget).toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-sm text-[#788a9b]">
              {remainingBudget >= 0
                ? "Available for your trip"
                : "Reduce expenses to stay within budget"}
            </p>
          </div>
        </section>
      </div>

      {/* ===================================================== */}
      {/* BUDGET MODAL */}
      {/* ===================================================== */}

      {showBudgetEditor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07111dcc] p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">
                  Set trip budget
                </h2>

                <p className="mt-1 text-sm text-[#718497]">
                  Decide how much you want to spend on this trip.
                </p>
              </div>

              <button
                onClick={() => setShowBudgetEditor(false)}
                className="text-2xl text-[#738596]"
              >
                ×
              </button>
            </div>

            <label className="mt-7 block text-sm font-bold">
              Total budget
            </label>

            <div className="mt-2 flex overflow-hidden rounded-xl border border-[#dce6ee]">
              <span className="flex items-center bg-[#f3f7fa] px-4 font-bold">
                ₹
              </span>

              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="h-14 flex-1 px-4 outline-none"
              />
            </div>

            <button
              onClick={() => setShowBudgetEditor(false)}
              className="mt-6 h-13 w-full rounded-xl bg-[#08a8df] py-3.5 text-sm font-extrabold text-white"
            >
              Save budget
            </button>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* ADD ACTIVITY MODAL */}
      {/* ===================================================== */}

      {showAddActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07111dcc] p-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">
                  Add activity
                </h2>

                <p className="mt-1 text-sm text-[#718497]">
                  Add an activity and its estimated expense.
                </p>
              </div>

              <button
                onClick={() => setShowAddActivity(false)}
                className="text-2xl text-[#738596]"
              >
                ×
              </button>
            </div>

            {/* TITLE */}

            <label className="mt-7 block text-sm font-bold">
              Activity name
            </label>

            <input
              value={newActivity.title}
              onChange={(e) =>
                setNewActivity({
                  ...newActivity,
                  title: e.target.value,
                })
              }
              placeholder="e.g. Museum visit"
              className="mt-2 h-12 w-full rounded-xl border border-[#dce6ee] px-4 text-sm outline-none focus:border-[#08a8df]"
            />

            {/* DESCRIPTION */}

            <label className="mt-5 block text-sm font-bold">
              Description
            </label>

            <textarea
              value={newActivity.description}
              onChange={(e) =>
                setNewActivity({
                  ...newActivity,
                  description: e.target.value,
                })
              }
              placeholder="Add some details..."
              rows={3}
              className="mt-2 w-full resize-none rounded-xl border border-[#dce6ee] p-4 text-sm outline-none focus:border-[#08a8df]"
            />

            {/* EXPENSE + DAY */}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold">
                  Expense
                </label>

                <div className="mt-2 flex overflow-hidden rounded-xl border border-[#dce6ee]">
                  <span className="flex items-center bg-[#f3f7fa] px-4 font-bold">
                    ₹
                  </span>

                  <input
                    type="number"
                    value={newActivity.expense}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        expense: e.target.value,
                      })
                    }
                    placeholder="0"
                    className="h-12 min-w-0 flex-1 px-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold">
                  Day
                </label>

                <select
                  value={newActivity.day}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      day: Number(e.target.value),
                    })
                  }
                  className="mt-2 h-12 w-full rounded-xl border border-[#dce6ee] px-4 text-sm outline-none"
                >
                  {days.map((day) => (
                    <option key={day.id} value={day.id}>
                      Day {day.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={addActivity}
              className="mt-7 w-full rounded-xl bg-[#08a8df] py-3.5 text-sm font-extrabold text-white transition hover:bg-[#0798ca]"
            >
              Add to itinerary
            </button>
          </div>
        </div>
      )}
    </main>
  );
}