"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Compass, MapPin } from "lucide-react";
import { useState } from "react";

type ExperiencePlace = {
  name: string;
  location: string;
  description: string;
  image: string;
};

type Experience = {
  title: string;
  description: string;
  image: string;
  places: ExperiencePlace[];
};

const experiences: Experience[] = [
  {
    title: "Adventure",
    description: "For those who want their heart beating faster.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    places: [
      {
        name: "Bir",
        location: "Himachal Pradesh, India",
        description:
          "Fly above the Himalayan valleys with spectacular mountain views and an unforgettable paragliding experience.",
        image:
          "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Manali",
        location: "Himachal Pradesh, India",
        description:
          "Discover mountain trails, forests, valleys and exciting outdoor adventures surrounded by the Himalayas.",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Rishikesh",
        location: "Uttarakhand, India",
        description:
          "A perfect destination for rafting, trekking, camping and other thrilling outdoor experiences.",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Andaman Islands",
        location: "India",
        description:
          "Explore crystal-clear waters, colourful coral reefs and incredible marine life through scuba diving.",
        image:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    title: "Beach",
    description: "Slow mornings, warm water and endless horizons.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
    places: [
      {
        name: "Goa",
        location: "India",
        description:
          "Relax on beautiful beaches, enjoy spectacular sunsets and experience Goa's lively coastal atmosphere.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Andaman Islands",
        location: "India",
        description:
          "Escape to turquoise waters, white-sand beaches and peaceful tropical islands.",
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Bali",
        location: "Indonesia",
        description:
          "Enjoy tropical beaches, beautiful sunsets, island culture and peaceful coastal escapes.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Maldives",
        location: "Indian Ocean",
        description:
          "Discover crystal-clear lagoons, tropical islands and some of the world's most beautiful beaches.",
        image:
          "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    title: "Culture",
    description: "Discover cities, traditions and stories.",
    image:
      "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1600&q=85",
    places: [
      {
        name: "Jaipur",
        location: "Rajasthan, India",
        description:
          "Explore royal palaces, colourful markets, historic forts and the rich traditions of Rajasthan.",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Varanasi",
        location: "Uttar Pradesh, India",
        description:
          "Experience ancient temples, spiritual traditions and the famous ghats along the Ganges.",
        image:
          "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Delhi",
        location: "India",
        description:
          "Discover centuries of history through forts, monuments, markets and diverse local neighbourhoods.",
        image:
          "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Jaisalmer",
        location: "Rajasthan, India",
        description:
          "Experience golden forts, desert traditions, folk music and the unique culture of Rajasthan.",
        image:
          "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    title: "Nature",
    description: "Escape into landscapes that make you stop.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
    places: [
      {
        name: "Munnar",
        location: "Kerala, India",
        description:
          "Walk through endless tea plantations, misty hills and peaceful green valleys.",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Rishikesh",
        location: "Uttarakhand, India",
        description:
          "Enjoy forests, mountains and the peaceful Ganges while surrounded by spectacular natural scenery.",
        image:
          "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Himachal Pradesh",
        location: "India",
        description:
          "Discover snow-covered mountains, pine forests, peaceful valleys and beautiful hiking routes.",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Coorg",
        location: "Karnataka, India",
        description:
          "Escape into lush forests, waterfalls, coffee plantations and peaceful mountain landscapes.",
        image:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },
];

export default function ExperiencesPage() {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17202b]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17202b] text-white">
              <Compass size={19} />
            </span>

            <span className="text-xl font-bold">
              Globe<span className="text-[#079fc9]">Trotter</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 font-semibold transition hover:text-[#079fc9]"
          >
            <ArrowLeft size={17} />
            Home
          </Link>

        </div>
      </header>

      {/* =====================================================
          MAIN EXPERIENCE LIST
      ===================================================== */}

      {!selectedExperience && (
        <section className="px-6 py-24 lg:px-10">

          <div className="mx-auto max-w-[1500px]">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#079fc9]">
              Experiences
            </p>

            <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
              Travel according
              <br />
              to your curiosity.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#71808d]">
              Choose the kind of experience you're looking for and discover
              destinations that match your travel style.
            </p>

            <div className="mt-16 grid gap-6 md:grid-cols-2">

              {experiences.map((experience) => (

                <article
                  key={experience.title}
                  className="group relative h-[500px] overflow-hidden rounded-[28px]"
                >

                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 p-8 text-white">

                    <h2 className="text-4xl font-bold">
                      {experience.title}
                    </h2>

                    <p className="mt-3 max-w-md text-white/75">
                      {experience.description}
                    </p>

                    {/* WORKING EXPLORE BUTTON */}

                    <button
                      onClick={() => setSelectedExperience(experience)}
                      className="mt-6 flex items-center gap-2 font-semibold transition hover:gap-3 hover:text-[#38bdf8]"
                    >
                      Explore
                      <ArrowRight size={17} />
                    </button>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          SELECTED EXPERIENCE PAGE
      ===================================================== */}

      {selectedExperience && (
        <section className="min-h-screen px-6 py-12 lg:px-10">

          <div className="mx-auto max-w-[1400px]">

            {/* BACK BUTTON */}

            <button
              onClick={() => setSelectedExperience(null)}
              className="mb-10 flex items-center gap-2 text-sm font-bold text-[#17202b] transition hover:text-[#079fc9]"
            >
              <ArrowLeft size={18} />
              Back to experiences
            </button>

            {/* PAGE HEADING */}

            <div className="max-w-3xl">

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#079fc9]">
                {selectedExperience.title} experiences
              </p>

              <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
                Places made for{" "}
                <span className="text-[#079fc9]">
                  {selectedExperience.title.toLowerCase()}.
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-[#71808d]">
                {selectedExperience.description} Discover destinations and
                experiences that are perfect for this kind of journey.
              </p>

            </div>

            {/* =================================================
                PLACES
            ================================================= */}

            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

              {selectedExperience.places.map((place) => (

                <article
                  key={place.name}
                  className="group overflow-hidden rounded-[24px] border border-[#e4dfd5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* PHOTO */}

                  <div className="relative h-[260px] overflow-hidden">

                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      unoptimized
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-semibold text-white">

                      <MapPin size={16} />

                      {place.location}

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">
                      {place.name}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#71808d]">
                      {place.description}
                    </p>

                    <Link
                      href="/explore"
                      className="mt-6 flex items-center gap-2 text-sm font-bold text-[#079fc9] transition hover:gap-3"
                    >
                      Explore activities
                      <ArrowRight size={16} />
                    </Link>

                  </div>

                </article>

              ))}

            </div>

            {/* =================================================
                BOTTOM CTA
            ================================================= */}

            <div className="mt-16 overflow-hidden rounded-[28px] bg-[#17202b] px-8 py-12 text-white md:px-12">

              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

                <div>

                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                    Ready to explore?
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    Find experiences for your next trip.
                  </h2>

                  <p className="mt-3 max-w-xl text-white/60">
                    Browse activities, adventures and things to do and start
                    building your perfect itinerary.
                  </p>

                </div>

                <Link
                  href="/explore"
                  className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[#079fc9] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#068dad]"
                >
                  Explore activities
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}