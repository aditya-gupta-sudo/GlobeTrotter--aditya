"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  MapPin,
  PlaneTakeoff,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f9fd]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =========================================================
            LEFT SIDE — BEACH HERO
        ========================================================= */}

        <section
          className="relative hidden min-h-screen overflow-hidden bg-cover bg-center lg:block"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=95')",
          }}
        >
          {/* Main black cinematic overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Slightly darker bottom area */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

          {/* Decorative circle */}
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/15" />

          {/* Another subtle circle */}
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full border border-white/10" />

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div className="relative z-10 flex min-h-screen flex-col p-10 xl:p-14">

            {/* ===================================================
                LOGO
            =================================================== */}

            <div className="flex items-center gap-3 text-white">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Compass className="h-6 w-6 text-white" />
              </div>

              <span className="text-xl font-bold tracking-tight">
                Globe<span className="text-[#38bdf8]">Trotter</span>
              </span>

            </div>


            {/* ===================================================
                HERO CONTENT
            =================================================== */}

            <div className="flex flex-1 items-center">

              <div className="w-full max-w-xl">

                {/* Small heading */}

                <div className="mb-5 flex items-center gap-3">

                  <div className="h-[2px] w-10 bg-[#38bdf8]" />

                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/85">
                    Your next adventure
                  </span>

                </div>


                {/* Main heading */}

                <h1 className="text-5xl font-black leading-[1.02] tracking-tight text-white xl:text-6xl">

                  The world is

                  <br />

                  <span className="text-[#38bdf8]">
                    waiting.
                  </span>

                </h1>


                {/* Description */}

                <p className="mt-7 max-w-lg text-lg leading-8 text-white/85">
                  Discover places worth remembering, build your perfect
                  itinerary, and make every journey count.
                </p>


                {/* =================================================
                    DESTINATION CARDS
                ================================================= */}

                <div className="relative mt-12 h-64">

                  {/* =================================================
                      MOUNTAIN PHOTO
                  ================================================= */}

                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      z-10
                      h-56
                      w-[340px]
                      rotate-[-4deg]
                      overflow-hidden
                      rounded-3xl
                      border-[4px]
                      border-white/35
                      shadow-2xl
                      transition-all
                      duration-500
                      hover:z-30
                      hover:rotate-0
                      hover:scale-105
                    "
                  >

                    <img
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=95"
                      alt="Mountain destination"
                      className="h-full w-full object-cover"
                    />

                    {/* Dark bottom gradient */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    {/* Location */}

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-semibold text-white">

                      <MapPin className="h-4 w-4" />

                      Explore the world

                    </div>

                  </div>


                  {/* =================================================
                      BEACH PHOTO
                  ================================================= */}

                  <div
                    className="
                      absolute
                      right-8
                      top-8
                      z-20
                      h-48
                      w-[270px]
                      rotate-[5deg]
                      overflow-hidden
                      rounded-3xl
                      border-[4px]
                      border-white/35
                      shadow-2xl
                      transition-all
                      duration-500
                      hover:z-30
                      hover:rotate-0
                      hover:scale-105
                    "
                  >

                    <img
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=95"
                      alt="Beach destination"
                      className="h-full w-full object-cover"
                    />

                    {/* Slight overlay */}

                    <div className="absolute inset-0 bg-black/5" />

                  </div>


                  {/* =================================================
                      NEXT DESTINATION CARD
                  ================================================= */}

                  <div
                    className="
                      absolute
                      bottom-0
                      right-16
                      z-30
                      rounded-2xl
                      border
                      border-white/25
                      bg-black/60
                      px-5
                      py-3
                      shadow-2xl
                      backdrop-blur-xl
                    "
                  >

                    <p className="text-[11px] font-medium uppercase tracking-wide text-white/60">
                      Next destination
                    </p>

                    <div className="mt-1 flex items-center gap-3">

                      <span className="font-semibold text-white">
                        Somewhere beautiful
                      </span>

                      {/* ✈️ AIRPLANE */}

                      <PlaneTakeoff
                        className="h-5 w-5 text-[#38bdf8]"
                        strokeWidth={2.5}
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* ===================================================
                LEFT FOOTER
            =================================================== */}

            <div className="flex items-center justify-between text-sm text-white/65">

              <span>
                Plan smarter. Travel farther.
              </span>

              <span className="flex items-center gap-2">

                <Sparkles className="h-4 w-4" />

                Made for explorers

              </span>

            </div>

          </div>

        </section>


        {/* =========================================================
            RIGHT SIDE — LOGIN
        ========================================================= */}

        <section className="flex min-h-screen items-center justify-center bg-[#f5f9fd] px-6 py-12 sm:px-10">

          <div className="w-full max-w-[480px]">

            {/* ===================================================
                MOBILE LOGO
            =================================================== */}

            <div className="mb-12 flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#079bc2] text-white">

                <Compass className="h-5 w-5" />

              </div>

              <span className="text-xl font-bold text-slate-900">

                Globe<span className="text-[#079bc2]">
                  Trotter
                </span>

              </span>

            </div>


            {/* ===================================================
                LOGIN HEADING
            =================================================== */}

            <div className="mb-9">

              <p className="mb-2 text-sm font-bold text-[#079bc2]">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl">
                Ready for your next trip?
              </h2>

              <p className="mt-3 text-base text-slate-500">
                Sign in and continue planning your adventure.
              </p>

            </div>


            {/* ===================================================
                LOGIN FORM
            =================================================== */}

            <form className="space-y-6">

              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      pl-12
                      pr-4
                      text-sm
                      text-slate-900
                      shadow-sm
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-[#079bc2]
                      focus:ring-4
                      focus:ring-[#079bc2]/10
                    "
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-[#079bc2] hover:underline"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      pl-12
                      pr-12
                      text-sm
                      text-slate-900
                      shadow-sm
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-[#079bc2]
                      focus:ring-4
                      focus:ring-[#079bc2]/10
                    "
                  />

                  {/* SHOW / HIDE PASSWORD */}

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      transition-colors
                      hover:text-slate-700
                    "
                  >

                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}

                  </button>

                </div>

              </div>


              {/* =================================================
                  SIGN IN BUTTON
              ================================================= */}

              <button
                type="submit"
                className="
                  group
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-[#079bc2]
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-[#079bc2]/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#078eaf]
                  hover:shadow-xl
                "
              >

                Sign in

                <ArrowRight
                  className="
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </button>

            </form>


            {/* ===================================================
                OR DIVIDER
            =================================================== */}

            <div className="my-8 flex items-center gap-4">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-sm text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>


            {/* ===================================================
                CREATE ACCOUNT
            =================================================== */}

            <p className="text-center text-sm text-slate-500">

              Don't have an account?{" "}

              <Link
                href="/register"
                className="font-bold text-[#079bc2] hover:underline"
              >
                Create one
              </Link>

            </p>


            {/* ===================================================
                TERMS
            =================================================== */}

            <p className="mt-9 text-center text-xs leading-6 text-slate-400">

              By continuing, you agree to our{" "}

              <a
                href="#"
                className="text-[#079bc2] hover:underline"
              >
                Terms of Service
              </a>{" "}

              and{" "}

              <a
                href="#"
                className="text-[#079bc2] hover:underline"
              >
                Privacy Policy
              </a>
              .

            </p>

          </div>

        </section>

      </div>
    </main>
  );
}   