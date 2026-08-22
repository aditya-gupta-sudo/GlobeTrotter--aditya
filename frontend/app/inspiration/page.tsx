import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";

const stories = [
  {
    category: "TRAVEL GUIDE",
    title: "A week in Japan",
    text: "Tokyo, Kyoto and the Japanese Alps in one unforgettable journey.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    category: "ESCAPE",
    title: "Finding paradise",
    text: "The best places to slow down and reconnect with the world.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    category: "ADVENTURE",
    title: "Into the mountains",
    text: "Five spectacular destinations for your next adventure.",
    image:
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function InspirationPage() {
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

      <section className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          {stories.map((story) => (
            <article key={story.title} className="group">
              <div className="relative h-[350px] overflow-hidden rounded-[26px]">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>

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

                <button className="mt-5 flex items-center gap-2 font-semibold">
                  Read story
                  <ArrowRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}