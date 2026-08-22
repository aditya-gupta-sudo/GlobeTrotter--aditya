"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  MapPin,
  X,
  Sparkles,
} from "lucide-react";

type Story = {
  category: string;
  title: string;
  text: string;
  image: string;
  location: string;
  description: string;
  highlights: string[];
  photos: string[];
};

const stories: Story[] = [
  {
    category: "TRAVEL GUIDE",
    title: "A week in Japan",
    text: "Tokyo, Kyoto and the Japanese Alps in one unforgettable journey.",

    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",

    location: "Japan",

    description:
      "Japan is a place where ancient traditions and modern life exist side by side. Spend your mornings exploring peaceful temples, your afternoons discovering colourful streets and your evenings enjoying incredible Japanese food. A week is enough to experience some of Japan's most memorable highlights while still leaving you wanting to come back.",

    highlights: [
      "Explore Tokyo's lively streets and neighbourhoods",
      "Visit the traditional temples and gardens of Kyoto",
      "Experience the beautiful Japanese Alps",
      "Try authentic Japanese ramen, sushi and street food",
      "Discover peaceful shrines, gardens and hidden streets",
    ],

    photos: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  {
    category: "ESCAPE",
    title: "Finding paradise",
    text: "The best places to slow down and reconnect with the world.",

    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",

    location: "Tropical Escapes",

    description:
      "Sometimes the perfect adventure is simply about slowing down. Imagine waking up beside clear blue water, spending your afternoon exploring hidden beaches and watching the sunset with nowhere else to be. These destinations are perfect for travellers who want to disconnect from everyday life and reconnect with nature.",

    highlights: [
      "Relax on beautiful white-sand beaches",
      "Swim in crystal-clear tropical water",
      "Watch unforgettable sunsets by the ocean",
      "Explore hidden coastal locations",
      "Enjoy fresh local food and island culture",
    ],

    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    ],
  },

  {
    category: "ADVENTURE",
    title: "Into the mountains",
    text: "Five spectacular destinations for your next adventure.",

    image:
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1600&q=85",

    location: "Mountain Adventures",

    description:
      "For travellers looking for something more adventurous, the mountains offer endless possibilities. From challenging hikes and dramatic viewpoints to peaceful valleys and nights under the stars, mountain destinations combine incredible scenery with unforgettable experiences.",

    highlights: [
      "Hike breathtaking mountain trails",
      "Discover hidden valleys and alpine lakes",
      "Camp under the stars",
      "Experience spectacular mountain viewpoints",
      "Meet local mountain communities",
    ],

    photos: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85",
    ],
  },
];

export default function InspirationPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17202b]">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 lg:px-10">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17202b] text-white">
              <Compass size={19} />
            </span>

            <span className="text-xl font-bold">
              Globe<span className="text-[#079fc9]">Trotter</span>
            </span>
          </Link>


          {/* HOME */}

          <Link
            href="/"
            className="flex items-center gap-2 font-semibold transition hover:text-[#079fc9]"
          >
            <ArrowLeft size={17} />
            Home
          </Link>

        </div>
      </header>


      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="bg-[#111820] px-6 py-28 text-white lg:px-10">

        <div className="mx-auto max-w-[1500px]">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#24b5e8]">
            Inspiration
          </p>

          <h1 className="mt-4 text-5xl font-bold sm:text-7xl">
            Start dreaming.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Stories, guides and ideas to help you decide where your next
            adventure should take you.
          </p>

        </div>

      </section>


      {/* =========================================================
          STORIES
      ========================================================= */}

      <section className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10">

        <div className="grid gap-10 md:grid-cols-3">

          {stories.map((story) => (

            <article
              key={story.title}
              className="group"
            >

              {/* IMAGE */}

              <button
                type="button"
                onClick={() => setSelectedStory(story)}
                className="block w-full text-left"
              >

                <div className="relative h-[350px] overflow-hidden rounded-[26px]">

                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    unoptimized
                  />

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />

                </div>

              </button>


              {/* CONTENT */}

              <div className="pt-6">

                <p className="text-xs font-bold tracking-[0.2em] text-[#079fc9]">
                  {story.category}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {story.title}
                </h2>

                <p className="mt-3 leading-7 text-[#71808d]">
                  {story.text}
                </p>


                {/* READ STORY BUTTON */}

                <button
                  type="button"
                  onClick={() => setSelectedStory(story)}
                  className="mt-5 flex items-center gap-2 font-semibold transition-all hover:gap-3 hover:text-[#079fc9]"
                >
                  Read story

                  <ArrowRight
                    size={17}
                  />
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =========================================================
          STORY POPUP / FULL SCREEN OVERLAY
      ========================================================= */}

      {selectedStory && (

        <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#f7f5f0]">

          {/* =====================================================
              STORY HEADER
          ===================================================== */}

          <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md">

            <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-6 lg:px-10">

              <div className="flex items-center gap-3">

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17202b] text-white">
                  <Compass size={19} />
                </span>

                <span className="text-xl font-bold">
                  Globe<span className="text-[#079fc9]">Trotter</span>
                </span>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                className="flex items-center gap-2 rounded-full border border-[#d9d9d9] bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-[#079fc9] hover:text-[#079fc9]"
              >
                <X size={17} />
                Close story
              </button>

            </div>

          </header>


          {/* =====================================================
              STORY HERO
          ===================================================== */}

          <section className="relative h-[500px] overflow-hidden">

            <Image
              src={selectedStory.image}
              alt={selectedStory.title}
              fill
              priority
              className="object-cover"
              unoptimized
            />

            {/* Dark overlay */}

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />


            {/* HERO CONTENT */}

            <div className="absolute inset-x-0 bottom-0">

              <div className="mx-auto max-w-[1200px] px-6 pb-14 lg:px-10">

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#40c7ef]">
                  {selectedStory.category}
                </p>

                <h1 className="mt-4 max-w-4xl text-5xl font-bold text-white sm:text-7xl">
                  {selectedStory.title}
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                  {selectedStory.text}
                </p>

              </div>

            </div>

          </section>


          {/* =====================================================
              STORY CONTENT
          ===================================================== */}

          <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10">

            <div className="grid gap-12 lg:grid-cols-[1fr_340px]">


              {/* MAIN DESCRIPTION */}

              <article>

                <div className="flex items-center gap-2 text-sm font-semibold text-[#079fc9]">

                  <MapPin size={17} />

                  {selectedStory.location}

                </div>


                <h2 className="mt-5 text-3xl font-bold">
                  The journey begins
                </h2>


                <p className="mt-5 text-lg leading-9 text-[#5f6e7b]">
                  {selectedStory.description}
                </p>


                {/* =================================================
                    FAMOUS / HIGHLIGHTS
                ================================================= */}

                <h2 className="mt-12 text-3xl font-bold">
                  Things to experience
                </h2>


                <div className="mt-6 space-y-4">

                  {selectedStory.highlights.map(
                    (highlight, index) => (

                      <div
                        key={highlight}
                        className="flex items-start gap-4 rounded-2xl border border-[#e2ded5] bg-white p-5"
                      >

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e5f7fc] text-sm font-bold text-[#079fc9]">
                          {index + 1}
                        </div>

                        <div>

                          <p className="font-semibold">
                            {highlight}
                          </p>

                          <p className="mt-1 text-sm leading-6 text-[#71808d]">
                            A memorable part of this destination that is
                            worth adding to your travel plans.
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </article>


              {/* =================================================
                  SIDE CARD
              ================================================= */}

              <aside>

                <div className="sticky top-28 rounded-[26px] bg-[#17202b] p-7 text-white shadow-xl">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#079fc9]">
                    <Sparkles size={21} />
                  </div>


                  <h3 className="mt-6 text-2xl font-bold">
                    Make it your adventure
                  </h3>


                  <p className="mt-3 leading-7 text-white/60">
                    Inspired by this story? Start planning your own trip
                    and create an itinerary around the places you want
                    to experience.
                  </p>


                  <Link
                    href="/plan-trip"
                    onClick={() => setSelectedStory(null)}
                    className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-[#079fc9] px-5 py-3.5 font-bold transition hover:bg-[#078db2]"
                  >
                    Plan your trip

                    <ArrowRight size={18} />

                  </Link>

                </div>

              </aside>

            </div>

          </section>


          {/* =====================================================
              PHOTOS
          ===================================================== */}

          <section className="bg-white px-6 py-20 lg:px-10">

            <div className="mx-auto max-w-[1200px]">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#079fc9]">
                Travel moments
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                A glimpse of the journey
              </h2>


              <div className="mt-10 grid gap-5 md:grid-cols-3">

                {selectedStory.photos.map(
                  (photo, index) => (

                    <div
                      key={photo}
                      className={`relative overflow-hidden rounded-[24px] ${
                        index === 0
                          ? "h-[420px]"
                          : "h-[320px]"
                      }`}
                    >

                      <Image
                        src={photo}
                        alt={`${selectedStory.title} travel photo ${
                          index + 1
                        }`}
                        fill
                        className="object-cover transition duration-700 hover:scale-105"
                        unoptimized
                      />

                    </div>

                  )
                )}

              </div>

            </div>

          </section>


          {/* =====================================================
              BOTTOM CTA
          ===================================================== */}

          <section className="bg-[#111820] px-6 py-20 text-center text-white">

            <div className="mx-auto max-w-3xl">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#24b5e8]">
                Your turn
              </p>

              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Ready to explore?
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-white/60">
                Take inspiration from this story and start building
                your own unforgettable journey.
              </p>


              <Link
                href="/plan-trip"
                onClick={() => setSelectedStory(null)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#079fc9] px-7 py-4 font-bold transition hover:bg-[#078db2]"
              >
                Start planning

                <ArrowRight size={18} />

              </Link>

            </div>

          </section>

        </div>

      )}

    </main>
  );
}