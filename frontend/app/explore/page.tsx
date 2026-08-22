"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  MapPin,
  Search,
} from "lucide-react";

const places = [
  {
    name: "Swiss Alps",
    location: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Santorini",
    location: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Kyoto",
    location: "Japan",
    image:
      "https://assets.simplotel.com/simplotel/image/upload/w_3333,h_5000/x_0,y_1757,w_3333,h_1877,r_0,c_crop,q_80,fl_progressive/w_500,f_auto,c_fit/neemrana-hotels/a_beach_during_sunset_with_a_painted_sky_zbanml",
  },
  {
    name: "Bali",
    location: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17202b]">
      {/* NAVBAR */}
      <header className="border-b border-black/10 bg-white">
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
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft size={17} />
            Home
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90"
          alt="Mountain landscape"
          fill
          className="object-cover"
          unoptimized
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-end px-6 pb-16 lg:px-10">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#24b5e8]">
              Explore the world
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              Find somewhere
              <br />
              unforgettable.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/80">
              Discover destinations, hidden gems and experiences for your next
              adventure.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="-mt-8 relative z-20 px-6">
        <div className="mx-auto max-w-[1100px] rounded-3xl bg-white p-4 shadow-xl">
          <div className="flex items-center gap-4 rounded-2xl bg-[#f1f5f7] px-5 py-4">
            <Search size={22} className="text-[#607080]" />

            <input
              type="text"
              placeholder="Search destinations, countries or experiences..."
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>
      </section>

      {/* PLACES */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#079fc9]">
          Discover
        </p>

        <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
          Places worth going.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {places.map((place) => (
            <article
              key={place.name}
              className="group overflow-hidden rounded-[25px] bg-white shadow-sm"
            >
              <div className="relative h-[360px]">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 text-sm text-white/75">
                    <MapPin size={14} />
                    {place.location}
                  </div>

                  <h3 className="mt-2 text-2xl font-bold">
                    {place.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between p-5">
                <span className="font-semibold">Discover</span>

                <ArrowRight
                  size={18}
                  className="text-[#079fc9]"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}