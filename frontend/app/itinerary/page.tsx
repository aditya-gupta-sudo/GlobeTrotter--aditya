"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ItinerarySection = {
  id: number;
  title: string;
  description: string;
  dateRange: string;
  budget: string;
};

export default function ItineraryPage() {
  const router = useRouter();

  const [sections, setSections] = useState<ItinerarySection[]>([
    {
      id: 1,
      title: "Section 1",
      description: "",
      dateRange: "xxx to yyy",
      budget: "Budget of this section",
    },
    {
      id: 2,
      title: "Section 2",
      description: "",
      dateRange: "xxx to yyy",
      budget: "Budget of this section",
    },
    {
      id: 3,
      title: "Section 3",
      description: "",
      dateRange: "xxx to yyy",
      budget: "Budget of this section",
    },
  ]);

  const addSection = () => {
    const nextNumber = sections.length + 1;

    setSections([
      ...sections,
      {
        id: nextNumber,
        title: `Section ${nextNumber}`,
        description: "",
        dateRange: "xxx to yyy",
        budget: "Budget of this section",
      },
    ]);
  };

  const updateSection = (
    id: number,
    field: keyof ItinerarySection,
    value: string
  ) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === id
          ? {
              ...section,
              [field]: value,
            }
          : section
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#142033]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#dce7f1] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 md:px-10">
          
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08a8df] text-white shadow-sm">
              <span className="text-xl">◈</span>
            </div>

            <span className="text-xl font-bold tracking-tight">
              Globe<span className="text-[#08a8df]">Trotter</span>
            </span>
          </button>

          {/* Back */}
          <button
            onClick={() => router.push("/plan-trip")}
            className="rounded-full border border-[#d4e1ed] bg-white px-5 py-2.5 text-sm font-semibold text-[#43566b] transition hover:border-[#08a8df] hover:text-[#08a8df]"
          >
            ← Back to trip
          </button>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
        
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#08a8df]">
            Build your journey
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-[#142033] md:text-5xl">
            Build Itinerary
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#64748b] md:text-lg">
            Organize your trip into sections and keep every part of your
            journey in one place.
          </p>
        </div>

        {/* Itinerary container */}
        <div className="overflow-hidden rounded-[28px] border border-[#dbe7f1] bg-white shadow-[0_20px_60px_rgba(20,32,51,0.08)]">
          
          {/* Container header */}
          <div className="border-b border-[#dbe7f1] bg-[#f9fbfd] px-6 py-5 md:px-8">
            <h2 className="text-xl font-bold text-[#142033]">
              Your itinerary
            </h2>

            <p className="mt-1 text-sm text-[#718096]">
              Add travel, hotels, activities and other plans to each section.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-5 p-5 md:p-8">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="rounded-2xl border border-[#d8e4ee] bg-[#fbfdff] p-5 transition hover:border-[#b9d9eb] hover:shadow-[0_8px_30px_rgba(8,168,223,0.07)] md:p-6"
              >
                
                {/* Section heading */}
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e5f6fd] text-sm font-bold text-[#08a8df]">
                      {index + 1}
                    </div>

                    <input
                      value={section.title}
                      onChange={(e) =>
                        updateSection(
                          section.id,
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full border-none bg-transparent text-xl font-bold text-[#142033] outline-none placeholder:text-[#94a3b8]"
                      placeholder="Section title"
                    />
                  </div>

                  <span className="hidden rounded-full bg-[#eaf7fc] px-3 py-1 text-xs font-semibold text-[#078dbd] sm:block">
                    Trip section
                  </span>
                </div>

                {/* Description */}
                <textarea
                  value={section.description}
                  onChange={(e) =>
                    updateSection(
                      section.id,
                      "description",
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="Describe this part of your trip..."
                  className="mb-5 w-full resize-none rounded-xl border border-[#dbe6ef] bg-white px-4 py-3 text-sm leading-6 text-[#52657a] outline-none transition placeholder:text-[#9aa9b8] focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                />

                {/* Date + Budget */}
                <div className="grid gap-4 md:grid-cols-2">
                  
                  {/* Date */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#718096]">
                      Date Range
                    </label>

                    <input
                      value={section.dateRange}
                      onChange={(e) =>
                        updateSection(
                          section.id,
                          "dateRange",
                          e.target.value
                        )
                      }
                      placeholder="e.g. 12 June - 15 June"
                      className="h-12 w-full rounded-xl border border-[#dbe6ef] bg-white px-4 text-sm font-medium text-[#26384d] outline-none transition placeholder:text-[#a0adba] focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#718096]">
                      Budget
                    </label>

                    <input
                      value={section.budget}
                      onChange={(e) =>
                        updateSection(
                          section.id,
                          "budget",
                          e.target.value
                        )
                      }
                      placeholder="e.g. ₹25,000"
                      className="h-12 w-full rounded-xl border border-[#dbe6ef] bg-white px-4 text-sm font-medium text-[#26384d] outline-none transition placeholder:text-[#a0adba] focus:border-[#08a8df] focus:ring-4 focus:ring-[#08a8df]/10"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add section */}
            <button
              onClick={addSection}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#b9d9e9] bg-[#f8fcff] py-5 text-base font-bold text-[#078dbd] transition hover:border-[#08a8df] hover:bg-[#eefaff]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff5fc] text-xl transition group-hover:bg-[#08a8df] group-hover:text-white">
                +
              </span>

              Add another Section
            </button>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          
          <button
            onClick={() => router.push("/plan-trip")}
            className="rounded-xl border border-[#d4e1ed] bg-white px-7 py-3.5 text-sm font-bold text-[#52657a] transition hover:border-[#b7cbd9] hover:bg-[#f8fafc]"
          >
            Back
          </button>

          <button
            onClick={() => {
              console.log("Itinerary:", sections);
              alert("Itinerary saved!");
            }}
            className="rounded-xl bg-[#08a8df] px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(8,168,223,0.22)] transition hover:bg-[#0798ca] hover:shadow-[0_10px_25px_rgba(8,168,223,0.3)]"
          >
            Save itinerary →
          </button>
        </div>
      </section>
    </main>
  );
}