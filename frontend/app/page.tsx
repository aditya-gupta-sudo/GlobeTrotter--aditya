"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Compass,
  MapPin,
  Search,
  Sparkles,
  Plane,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    title: "Adventure",
    subtitle: "Chase something unforgettable",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Beach escapes",
    subtitle: "Slow down by the sea",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Culture",
    subtitle: "Discover places with a story",
    image:
      "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Nature",
    subtitle: "Go where the wild begins",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
  },
];

const destinations = [
  {
    title: "Japan",
    location: "Asia",
    description: "Ancient traditions, neon nights and unforgettable food.",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Santorini",
    location: "Greece",
    description: "Whitewashed villages above the Aegean Sea.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Swiss Alps",
    location: "Switzerland",
    description: "Mountain air, dramatic landscapes and quiet escapes.",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=85",
  },
];

const articles = [
  {
    category: "TRAVEL GUIDE",
    title: "7 days in Japan",
    description:
      "A first-timer's journey through Tokyo, Kyoto and the Japanese Alps.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    category: "WEEKEND ESCAPE",
    title: "A different side of Goa",
    description:
      "Beaches, hidden cafés and slow mornings away from the crowds.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    category: "ADVENTURE",
    title: "Into the mountains",
    description:
      "Five destinations for your next great outdoor adventure.",
    image:
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17202b]">
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="absolute left-0 top-0 z-50 w-full">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-white transition-opacity hover:opacity-80"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/20 backdrop-blur-md">
              <Compass size={22} strokeWidth={1.8} />
            </span>

            <span className="text-xl font-bold tracking-tight">
              Globe<span className="text-[#24b5e8]">Trotter</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 rounded-full border border-white/20 bg-black/15 px-7 py-3 backdrop-blur-md lg:flex">
            <Link
              href="/explore"
                className="text-sm font-medium text-white/90 transition hover:text-white"
                >
                Explore
            </Link>

           <Link
              href="/destinations"
              className="text-sm font-medium text-white/90 transition hover:text-white"
  >
    Destinations
  </Link>

  <Link
    href="/experiences"
    className="text-sm font-medium text-white/90 transition hover:text-white"
  >
    Experiences
  </Link>

  <Link
    href="/inspiration"
    className="text-sm font-medium text-white/90 transition hover:text-white"
  >
    Inspiration
  </Link>

  <Link
    href="/login"
    className="text-sm font-medium text-white/90 transition hover:text-white"
  >
    My account
  </Link>
</nav>

          {/* Right actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/15 text-white backdrop-blur-md transition hover:bg-white/15">
              <Search size={19} />
            </button>

            <Link
              href="/login"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#17202b] transition hover:bg-white/90"
            >
              Plan a trip
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="mx-4 rounded-3xl border border-white/20 bg-[#111820]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-1">
              {[
                ["Explore", "/explore"],
                ["Destinations", "/destinations"],
                ["Experiences", "/experiences"],
                ["Inspiration", "/inspiration"],
                ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-white transition hover:bg-white/10"
                >
                  {label}
                </Link>
              ))}

              <Link
                href="/login"
                className="mt-2 rounded-xl bg-[#24b5e8] px-4 py-3 text-center font-semibold text-white"
              >
                Plan a trip
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative flex min-h-[780px] items-end overflow-hidden sm:min-h-screen">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=90"
          alt="Beautiful mountain landscape"
          fill
          priority
          className="object-cover object-center"
          unoptimized
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Subtle blue tint */}
        <div className="absolute inset-0 bg-[#07151c]/10" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-28 lg:px-10 lg:pb-36">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-[2px] w-12 bg-[#24b5e8]" />

              <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/90">
                Your next adventure
              </span>
            </div>

            <h1 className="max-w-4xl text-6xl font-bold leading-[0.92] tracking-[-0.045em] text-white sm:text-7xl lg:text-[110px]">
              The world is
              <br />
              <span className="text-[#24b5e8]">waiting.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">
              Discover places worth remembering, build your perfect
              itinerary, and make every journey count.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#explore"
                className="group flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-[#17202b] transition hover:bg-[#24b5e8] hover:text-white"
              >
                Start exploring
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/login"
                className="flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Plan your trip
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#explore"
          className="absolute bottom-8 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/50 bg-black/10 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
        >
          <ArrowDown size={19} />
        </a>
      </section>

      {/* =========================================================
          SEARCH / INTRO
      ========================================================= */}
      <section id="explore" className="relative z-20 -mt-10 px-5">
        <div className="mx-auto max-w-[1250px]">
          <div className="rounded-[28px] bg-white p-4 shadow-[0_20px_70px_rgba(0,0,0,0.12)] sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-4 rounded-2xl bg-[#f1f5f7] px-5 py-4">
                <Search className="text-[#607080]" size={22} />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#71808d]">
                    Discover
                  </p>

                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full bg-transparent text-base font-medium text-[#17202b] outline-none placeholder:text-[#8b98a3]"
                  />
                </div>
              </div>

              <button className="rounded-2xl bg-[#079fc9] px-8 py-5 font-semibold text-white transition hover:bg-[#078eb4]">
                Explore destinations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#079fc9]">
              Travel differently
            </p>

            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Don't just visit.
              <br />
              <span className="text-[#079fc9]">Experience.</span>
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-[#667584] sm:text-xl">
              GlobeTrotter helps you discover incredible destinations and turn
              inspiration into real journeys. Find somewhere new, build your
              itinerary, and keep every part of your trip in one beautiful
              place.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          EXPERIENCES
      ========================================================= */}
      <section id="experiences" className="overflow-hidden bg-[#ebe9e3] py-24 lg:py-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#079fc9]">
                Explore your way
              </p>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Find your kind of adventure.
              </h2>
            </div>

            <button className="flex items-center gap-2 font-semibold text-[#17202b] transition hover:text-[#079fc9]">
              View all experiences
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((experience) => (
              <article
                key={experience.title}
                className="group relative h-[430px] overflow-hidden rounded-[26px]"
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <h3 className="text-2xl font-bold">{experience.title}</h3>

                  <p className="mt-2 text-sm text-white/75">
                    {experience.subtitle}
                  </p>

                  <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:bg-[#24b5e8]">
                    <ArrowRight size={17} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          DESTINATIONS
      ========================================================= */}
      <section id="destinations" className="px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#079fc9]">
              Trending destinations
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Somewhere new is
              <br />
              calling your name.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {destinations.map((destination, index) => (
              <article
                key={destination.title}
                className={`group relative overflow-hidden rounded-[28px] ${
                  index === 0 ? "lg:mt-12" : ""
                }`}
              >
                <div className="relative h-[520px]">
                  <Image
                    src={destination.image}
                    alt={destination.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-3 flex items-center gap-2 text-sm text-white/75">
                      <MapPin size={15} />
                      {destination.location}
                    </div>

                    <h3 className="text-4xl font-bold">{destination.title}</h3>

                    <p className="mt-3 max-w-sm leading-6 text-white/75">
                      {destination.description}
                    </p>

                    <button className="mt-6 flex items-center gap-2 font-semibold">
                      Discover
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PERSONAL TRIPS
      ========================================================= */}
      <section className="bg-[#111820] px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#24b5e8]/15 text-[#24b5e8]">
              <Sparkles size={22} />
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#24b5e8]">
              Your journeys
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Turn inspiration
              <br />
              into a trip.
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-white/60">
              Save places you love, build itineraries and keep your upcoming
              adventures organized in one place.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-[#17202b] transition hover:bg-[#24b5e8] hover:text-white"
            >
              Start planning
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative h-[300px] overflow-hidden rounded-[25px] sm:h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&q=85"
                alt="Mountain trip"
                fill
                className="object-cover"
                unoptimized
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <p className="text-xs uppercase tracking-widest text-white/60">
                  Upcoming
                </p>

                <h3 className="mt-1 text-2xl font-bold">Swiss Alps</h3>

                <p className="mt-1 text-sm text-white/70">
                  7 days · 4 destinations
                </p>
              </div>
            </div>

            <div className="relative mt-0 h-[300px] overflow-hidden rounded-[25px] sm:mt-12 sm:h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85"
                alt="Japan trip"
                fill
                className="object-cover"
                unoptimized
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <p className="text-xs uppercase tracking-widest text-white/60">
                  Saved
                </p>

                <h3 className="mt-1 text-2xl font-bold">Japan</h3>

                <p className="mt-1 text-sm text-white/70">
                  10 places saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INSPIRATION
      ========================================================= */}
      <section id="inspiration" className="px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#079fc9]">
                Travel inspiration
              </p>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Ideas for your
                <br />
                next journey.
              </h2>
            </div>

            <button className="flex items-center gap-2 font-semibold transition hover:text-[#079fc9]">
              Explore all stories
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <article key={article.title} className="group">
                <div className="relative h-[320px] overflow-hidden rounded-[24px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    unoptimized
                  />
                </div>

                <div className="pt-6">
                  <p className="text-xs font-bold tracking-[0.2em] text-[#079fc9]">
                    {article.category}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight">
                    {article.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#71808d]">
                    {article.description}
                  </p>

                  <button className="mt-5 flex items-center gap-2 font-semibold">
                    Read story
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[32px]">
          <div className="relative h-[550px]">
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=90"
              alt="Traveler looking at a landscape"
              fill
              className="object-cover"
              unoptimized
            />

            <div className="absolute inset-0 bg-black/45" />

            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <div className="max-w-3xl text-white">
                <Plane
                  size={32}
                  className="mx-auto mb-7 rotate-[-12deg] text-[#24b5e8]"
                />

                <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  Where will you go next?
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/75">
                  Your next adventure is closer than you think.
                </p>

                <Link
                  href="/login"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-[#17202b] transition hover:bg-[#24b5e8] hover:text-white"
                >
                  Plan your next trip
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-black/10 bg-[#f7f5f0] px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 md:flex-row md:items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17202b] text-white">
              <Compass size={19} />
            </span>

            <span className="text-lg font-bold">
              Globe<span className="text-[#079fc9]">Trotter</span>
            </span>
          </Link>

          <p className="text-sm text-[#71808d]">
            Plan smarter. Travel farther.
          </p>

          <div className="flex gap-6 text-sm text-[#71808d]">
            <Link href="#" className="hover:text-[#079fc9]">
              About
            </Link>

            <Link href="#" className="hover:text-[#079fc9]">
              Privacy
            </Link>

            <Link href="#" className="hover:text-[#079fc9]">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}