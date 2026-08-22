"use client";

import Link from "next/link";
import { useState } from "react";

const destinations = [
  {
    title: "Explore",
    description:
      "Discover places, cities and destinations worth remembering.",
    href: "/explore",
    icon: "⌕",
  },
  {
    title: "Destinations",
    description:
      "Find your next destination and explore what it has to offer.",
    href: "/destinations",
    icon: "◉",
  },
  {
    title: "Experiences",
    description:
      "Discover exciting activities and experiences around the world.",
    href: "/experiences",
    icon: "✦",
  },
  {
    title: "Inspiration",
    description:
      "Get inspired and find ideas for your next adventure.",
    href: "/inspiration",
    icon: "✧",
  },
];

const planningOptions = [
  {
    title: "Plan a new trip",
    description:
      "Choose a destination, dates and activities to build your trip.",
    href: "/plan-trip",
    icon: "＋",
  },
  {
    title: "My itineraries",
    description:
      "View and manage the itineraries you have created.",
    href: "/itinerary",
    icon: "☰",
  },
  {
    title: "Budget itinerary",
    description:
      "Plan your activities while keeping track of your travel budget.",
    href: "/itinerary-budget",
    icon: "₹",
  },
  {
    title: "My trips",
    description:
      "See your ongoing, upcoming and completed trips.",
    href: "/trips",
    icon: "✈",
  },
];

const personalOptions = [
  {
    title: "My Profile",
    description:
      "View and edit your profile and personal travel information.",
    href: "/profile",
    icon: "●",
  },
  {
    title: "Community",
    description:
      "Share experiences and discover what other travelers are doing.",
    href: "/community",
    icon: "◎",
  },
  {
    title: "Calendar",
    description:
      "See your trips and activities in a calendar view.",
    href: "/calendar",
    icon: "▣",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-[#101828]">

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="relative min-h-[720px] overflow-hidden bg-[#102331]">

        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=85')",
            }}
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        </div>

        {/* ================================================== */}
        {/* NAVIGATION */}
        {/* ================================================== */}

        <header className="relative z-20 mx-auto flex max-w-[1500px] items-center justify-between px-6 py-7 lg:px-12">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 text-xl text-white">
              ◈
            </div>

            <span className="text-2xl font-bold text-white">
              Globe
              <span className="text-[#20b8ef]">
                Trotter
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-2 backdrop-blur-md lg:flex">

            <NavLink href="/explore">
              Explore
            </NavLink>

            <NavLink href="/destinations">
              Destinations
            </NavLink>

            <NavLink href="/experiences">
              Experiences
            </NavLink>

            <NavLink href="/inspiration">
              Inspiration
            </NavLink>

            <NavLink href="/trips">
              My trips
            </NavLink>

            <NavLink href="/community">
              Community
            </NavLink>

          </nav>

          {/* Right Navigation */}

          <div className="hidden items-center gap-3 lg:flex">

            <Link
              href="/calendar"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              title="Calendar"
            >
              ▣
            </Link>

            <Link
              href="/profile"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              title="Profile"
            >
              ●
            </Link>

            <Link
              href="/plan-trip"
              className="rounded-full bg-white px-7 py-3 font-semibold text-[#101828] transition hover:scale-105"
            >
              Plan a trip
            </Link>

          </div>

          {/* Mobile menu button */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-xl text-white lg:hidden"
          >
            ☰
          </button>
        </header>

        {/* ================================================== */}
        {/* MOBILE MENU */}
        {/* ================================================== */}

        {menuOpen && (
          <div className="absolute left-5 right-5 top-24 z-30 rounded-3xl border border-white/20 bg-[#101820]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden">

            <div className="flex flex-col gap-2">

              <MobileLink
                href="/explore"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Explore
              </MobileLink>

              <MobileLink
                href="/destinations"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Destinations
              </MobileLink>

              <MobileLink
                href="/experiences"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Experiences
              </MobileLink>

              <MobileLink
                href="/inspiration"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Inspiration
              </MobileLink>

              <MobileLink
                href="/trips"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                My trips
              </MobileLink>

              <MobileLink
                href="/community"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Community
              </MobileLink>

              <MobileLink
                href="/calendar"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Calendar
              </MobileLink>

              <MobileLink
                href="/profile"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                My Profile
              </MobileLink>

              <Link
                href="/plan-trip"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="mt-2 rounded-xl bg-[#20b8ef] px-5 py-3 text-center font-bold text-white"
              >
                Plan a trip
              </Link>

            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* HERO CONTENT */}
        {/* ================================================== */}

        <div className="relative z-10 mx-auto flex min-h-[600px] max-w-[1500px] items-center px-6 pb-24 pt-16 lg:px-12">

          <div className="max-w-[760px] text-white">

            <div className="mb-7 flex items-center gap-4">

              <div className="h-[2px] w-14 bg-[#20b8ef]" />

              <span className="text-sm font-bold uppercase tracking-[0.3em]">
                Your next adventure
              </span>

            </div>

            <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-[92px]">

              The world is

              <span className="block text-[#20b8ef]">
                waiting.
              </span>

            </h1>

            <p className="mt-8 max-w-[650px] text-lg leading-8 text-white/85 md:text-xl">

              Discover places worth remembering,
              build your perfect itinerary, and
              make every journey count.

            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                href="/explore"
                className="rounded-full bg-white px-8 py-4 font-bold text-[#101828] shadow-xl transition hover:-translate-y-1"
              >
                Start exploring
                <span className="ml-3">
                  →
                </span>
              </Link>

              <Link
                href="/plan-trip"
                className="rounded-full border border-white/50 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#101828]"
              >
                Plan your trip
              </Link>

            </div>

          </div>
        </div>

        {/* ================================================== */}
        {/* FLOATING TRAVEL PLANE */}
        {/* ================================================== */}

        <div className="pointer-events-none absolute bottom-24 left-0 z-10 w-full overflow-hidden">

          <div className="travel-plane">
            ✈
          </div>

        </div>

        {/* Bottom information */}

        <div className="absolute bottom-7 left-6 right-6 z-10 flex items-center justify-between text-sm text-white/70 lg:left-12 lg:right-12">

          <span>
            Plan smarter. Travel farther.
          </span>

          <span className="hidden md:block">
            ✦ Made for explorers
          </span>

        </div>

      </section>

      {/* ================================================== */}
      {/* QUICK ACCESS */}
      {/* ================================================== */}

      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="font-bold uppercase tracking-[0.2em] text-[#20a9dc]">
              Discover
            </p>

            <h2 className="mt-2 text-4xl font-black md:text-5xl">
              Start your journey
            </h2>

          </div>

          <p className="max-w-[500px] text-[#667085]">
            Explore destinations, experiences and
            inspiration to find the perfect place
            for your next adventure.
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {destinations.map(
            (item) => (
              <FeatureCard
                key={item.title}
                {...item}
              />
            )
          )}

        </div>

      </section>

      {/* ================================================== */}
      {/* TRIP PLANNING */}
      {/* ================================================== */}

      <section className="bg-[#101f2a] px-6 py-20 text-white lg:px-10">

        <div className="mx-auto max-w-[1400px]">

          <div className="mb-10">

            <p className="font-bold uppercase tracking-[0.2em] text-[#20b8ef]">
              Your journey
            </p>

            <h2 className="mt-2 text-4xl font-black md:text-5xl">
              Plan everything in one place
            </h2>

            <p className="mt-4 max-w-[650px] text-white/60">
              Create trips, build itineraries, manage
              budgets and keep track of every part of
              your journey.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {planningOptions.map(
              (item) => (
                <DarkFeatureCard
                  key={item.title}
                  {...item}
                />
              )
            )}

          </div>

        </div>

      </section>

      {/* ================================================== */}
      {/* MY TRAVEL SPACE */}
      {/* ================================================== */}

      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">

        <div className="mb-10">

          <p className="font-bold uppercase tracking-[0.2em] text-[#20a9dc]">
            Your space
          </p>

          <h2 className="mt-2 text-4xl font-black md:text-5xl">
            Your travel world
          </h2>

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {personalOptions.map(
            (item) => (
              <PersonalCard
                key={item.title}
                {...item}
              />
            )
          )}

        </div>

      </section>

      {/* ================================================== */}
      {/* FEATURED TRIP */}
      {/* ================================================== */}

      <section className="px-6 pb-20 lg:px-10">

        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[35px] bg-[#dcecf4]">

          <div className="grid lg:grid-cols-2">

            <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16">

              <p className="font-bold uppercase tracking-[0.2em] text-[#159cca]">
                Continue your adventure
              </p>

              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                Your next trip is waiting.
              </h2>

              <p className="mt-5 max-w-[520px] leading-7 text-[#667085]">
                Continue planning your trip,
                explore your saved destinations or
                create an entirely new adventure.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  href="/trips"
                  className="rounded-full bg-[#101828] px-7 py-4 font-bold text-white transition hover:scale-105"
                >
                  View my trips
                </Link>

                <Link
                  href="/plan-trip"
                  className="rounded-full border border-[#101828]/20 bg-white px-7 py-4 font-bold transition hover:bg-[#101828] hover:text-white"
                >
                  Create new trip
                </Link>

              </div>

            </div>

            <div
              className="min-h-[360px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85')",
              }}
            />

          </div>

        </div>

      </section>

      {/* ================================================== */}
      {/* FOOTER */}
      {/* ================================================== */}

      <footer className="bg-[#0b1720] px-6 py-12 text-white lg:px-10">

        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 md:flex-row">

          <div>

            <Link
              href="/"
              className="text-2xl font-bold"
            >
              Globe
              <span className="text-[#20b8ef]">
                Trotter
              </span>
            </Link>

            <p className="mt-3 max-w-[350px] text-sm leading-6 text-white/50">
              Discover places, plan unforgettable
              trips and make every journey count.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm">

            <Link
              href="/explore"
              className="text-white/60 transition hover:text-white"
            >
              Explore
            </Link>

            <Link
              href="/destinations"
              className="text-white/60 transition hover:text-white"
            >
              Destinations
            </Link>

            <Link
              href="/experiences"
              className="text-white/60 transition hover:text-white"
            >
              Experiences
            </Link>

            <Link
              href="/inspiration"
              className="text-white/60 transition hover:text-white"
            >
              Inspiration
            </Link>

            <Link
              href="/trips"
              className="text-white/60 transition hover:text-white"
            >
              My trips
            </Link>

            <Link
              href="/community"
              className="text-white/60 transition hover:text-white"
            >
              Community
            </Link>

            <Link
              href="/calendar"
              className="text-white/60 transition hover:text-white"
            >
              Calendar
            </Link>

            <Link
              href="/profile"
              className="text-white/60 transition hover:text-white"
            >
              Profile
            </Link>

          </div>

        </div>

        <div className="mx-auto mt-10 max-w-[1400px] border-t border-white/10 pt-6 text-xs text-white/40">
          © 2026 GlobeTrotter. Made for explorers.
        </div>

      </footer>

    </main>
  );
}

/* ====================================================== */
/* NAV LINK */
/* ====================================================== */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}

/* ====================================================== */
/* MOBILE LINK */
/* ====================================================== */

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-xl px-4 py-3 font-medium text-white/80 hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}

/* ====================================================== */
/* FEATURE CARD */
/* ====================================================== */

function FeatureCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-[#dbe4ea] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f7fd] text-xl text-[#159cca]">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#667085]">
        {description}
      </p>

      <div className="mt-6 font-bold text-[#159cca] transition group-hover:translate-x-1">
        Explore →
      </div>

    </Link>
  );
}

/* ====================================================== */
/* DARK FEATURE CARD */
/* ====================================================== */

function DarkFeatureCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#20b8ef]/50 hover:bg-white/[0.08]"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#20b8ef]/10 text-xl text-[#20b8ef]">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/55">
        {description}
      </p>

      <div className="mt-6 font-bold text-[#20b8ef] transition group-hover:translate-x-1">
        Open →
      </div>

    </Link>
  );
}

/* ====================================================== */
/* PERSONAL CARD */
/* ====================================================== */

function PersonalCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-[#dbe4ea] bg-white p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#101f2a] text-white">
          {icon}
        </div>

        <span className="text-xl text-[#20a9dc] transition group-hover:translate-x-2">
          →
        </span>

      </div>

      <h3 className="mt-7 text-2xl font-black">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-[#667085]">
        {description}
      </p>

    </Link>
  );
}

/* ====================================================== */
/* PLANE ANIMATION */
/* ====================================================== */
<style jsx global>{`
  @keyframes flyAcross {
    0% {
      transform: translateX(-120px) translateY(20px) rotate(-5deg);
    }

    25% {
      transform: translateX(25vw) translateY(-15px) rotate(2deg);
    }

    50% {
      transform: translateX(50vw) translateY(10px) rotate(-2deg);
    }

    75% {
      transform: translateX(75vw) translateY(-20px) rotate(3deg);
    }

    100% {
      transform: translateX(calc(100vw + 120px))
        translateY(10px)
        rotate(-3deg);
    }
  }

  .travel-plane {
    position: absolute;
    left: 0;
    font-size: 32px;
    color: white;
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.35));
    animation: flyAcross 18s linear infinite;
  }
`}</style>