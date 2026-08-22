import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";

const experiences = [
  {
    title: "Adventure",
    description: "For those who want their heart beating faster.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Beach",
    description: "Slow mornings, warm water and endless horizons.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Culture",
    description: "Discover cities, traditions and stories.",
    image:
      "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Nature",
    description: "Escape into landscapes that make you stop.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function ExperiencesPage() {
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

                  <button className="mt-6 flex items-center gap-2 font-semibold">
                    Explore
                    <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}