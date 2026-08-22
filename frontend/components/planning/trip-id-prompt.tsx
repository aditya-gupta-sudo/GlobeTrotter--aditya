"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function TripIdPrompt({
  title,
  description,
  actionPath,
}: {
  title: string;
  description: string;
  actionPath: "/itinerary" | "/itinerary-budget";
}) {
  const router = useRouter();
  const [tripId, setTripId] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = tripId.trim();

    if (!value) {
      return;
    }

    router.push(`${actionPath}/${value}`);
  };

  return (
    <section className="mx-auto max-w-[720px] px-5 py-16">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
        Trip required
      </p>
      <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-3 text-base leading-7 text-[#687b8e]">{description}</p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-[#dbe6ef] bg-white p-6 shadow-sm"
      >
        <label htmlFor="tripId" className="mb-2 block text-sm font-bold">
          Trip ID
        </label>
        <input
          id="tripId"
          value={tripId}
          onChange={(event) => setTripId(event.target.value)}
          placeholder="Enter the trip UUID"
          className="h-12 w-full rounded-xl border border-[#dbe6ef] px-4 text-sm outline-none focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
        />
        <button
          type="submit"
          className="mt-4 rounded-full bg-[#08a8df] px-6 py-3 text-sm font-bold text-white"
        >
          Continue
        </button>
      </form>
    </section>
  );
}
