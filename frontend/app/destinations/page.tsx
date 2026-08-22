import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Compass, MapPin } from "lucide-react";

const destinations = [
  {
    name: "Japan",
    country: "Asia",
    image:
      "https://www.lot.com/content/dam/lot/lot-com/destination-photos/japonia/Tokyo-5%20.coreimg.jpg/1723628368208/Tokyo-5%20.jpg",
  },
  {
    name: "Switzerland",
    country: "Europe",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Greece",
    country: "Europe",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Indonesia",
    country: "Asia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Iceland",
    country: "Europe",
    image:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "New Zealand",
    country: "Oceania",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#17202b]">
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

          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ArrowLeft size={17} />
            Home
          </Link>
        </div>
      </header>

      <section className="bg-[#111820] px-6 py-28 text-white lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#24b5e8]">
            Destinations
          </p>

          <h1 className="mt-4 text-5xl font-bold sm:text-7xl">
            Where will you go?
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
            From mountain escapes to tropical beaches, discover destinations
            that deserve a place on your itinerary.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-20 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination.name}
              className="group relative h-[470px] overflow-hidden rounded-[28px]"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                unoptimized
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute bottom-0 p-7 text-white">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin size={15} />
                  {destination.country}
                </div>

                <h2 className="mt-2 text-3xl font-bold">
                  {destination.name}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}