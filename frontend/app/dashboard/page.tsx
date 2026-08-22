"use client";

import Link from "next/link";
import { Compass, LogOut } from "lucide-react";
import { RequireAuth } from "@/components/auth/require-auth";
import { useAuth } from "@/lib/auth-context";

function DashboardContent() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f8fd] text-[#079bc2]">
              <Compass className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">
              Globe<span className="text-[#079bc2]">Trotter</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#079bc2]">
          Dashboard
        </p>
        <h1 className="text-4xl font-black tracking-tight">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-3 max-w-xl text-base text-slate-500">
          You are signed in as {user?.email}.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/plan-trip"
            className="rounded-2xl border border-slate-200 bg-white p-6 font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-[#079bc2]"
          >
            Plan a trip
          </Link>
          <Link
            href="/trips"
            className="rounded-2xl border border-slate-200 bg-white p-6 font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-[#079bc2]"
          >
            My trips
          </Link>
          <Link
            href="/itinerary"
            className="rounded-2xl border border-slate-200 bg-white p-6 font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-[#079bc2]"
          >
            Itinerary
          </Link>
          <Link
            href="/itinerary-budget"
            className="rounded-2xl border border-slate-200 bg-white p-6 font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-[#079bc2]"
          >
            Budget
          </Link>
          <Link
            href="/profile"
            className="rounded-2xl border border-slate-200 bg-white p-6 font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-[#079bc2] sm:col-span-2"
          >
            Profile
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  );
}
