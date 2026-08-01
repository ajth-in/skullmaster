"use client";

import { useState } from "react";
import Skeleton, { markAsSkull } from "@/skeletons/registry";
import { useLoading } from "@/components/LoadingProvider";
import { ImageCard } from "@/components/ImageCard";

const IMAGES = [
  { name: "MountainRange", seed: "mountains", w: 600, h: 400, title: "Mountain Range" },
  { name: "DeepOcean", seed: "ocean", w: 400, h: 600, title: "Deep Ocean" },
  { name: "CityLights", seed: "city", w: 500, h: 350, title: "City Lights" },
  { name: "ForestCanopy", seed: "forest", w: 450, h: 450, title: "Forest Canopy" },
];

function LoadingToggle() {
  const { isLoading, toggleLoading } = useLoading();
  return (
    <button
      onClick={toggleLoading}
      className="fixed left-4 top-4 z-[1000] border-[3px] border-black bg-white px-5 py-2 text-sm font-bold uppercase tracking-wide text-black shadow-[5px_5px_0_#000] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0_#000]"
    >
      {isLoading ? "Hide" : "Show"}
    </button>
  );
}

function Hero() {
  const { isLoading } = useLoading();

  if (isLoading) return <Skeleton name="Hero" />;

  return (
    <section className="border-[3px] border-black bg-lime-300 p-8" {...markAsSkull("Hero")}>
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black tracking-tight">SKULLMASTER</h1>
        <p className="text-xl font-bold">Next.js + Tailwind CSS</p>
        <p className="max-w-xl text-black/80">
          A collection of common web components reimagined with bold, unapologetic design.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="border-[3px] border-black bg-black px-4 py-2 font-bold text-white shadow-[4px_4px_0_#000] transition active:translate-x-[2px] active:translate-y-[2px]">
            Get Started
          </button>
          <button className="border-[3px] border-black bg-white px-4 py-2 font-bold text-black shadow-[4px_4px_0_#000] transition active:translate-x-[2px] active:translate-y-[2px]">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

function ComponentsShowcase() {
  return (
    <section className="mt-8" {...markAsSkull("Components", { isTransparent: true })}>
      <h2 className="mb-4 text-2xl font-black">Common Components</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border-[3px] border-black bg-white p-4">
          <h3 className="mb-3 font-black">Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <button className="border-[3px] border-black bg-black px-3 py-1 font-bold text-white">
              Primary
            </button>
            <button className="border-[3px] border-black bg-white px-3 py-1 font-bold">
              Secondary
            </button>
            <button className="border-[3px] border-dashed border-black px-3 py-1 font-bold">
              Outline
            </button>
            <button className="border-[3px] border-black bg-red-600 px-3 py-1 font-bold text-white">
              Danger
            </button>
            <button className="border-[3px] border-black bg-white px-3 py-1 font-bold opacity-50">
              Disabled
            </button>
          </div>
        </div>

        <div className="border-[3px] border-black bg-white p-4">
          <h3 className="mb-3 font-black">Badges &amp; Alerts</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="border-2 border-black bg-black px-2 py-0.5 text-xs font-bold text-white">
              Default
            </span>
            <span className="border-2 border-black bg-lime-300 px-2 py-0.5 text-xs font-bold">
              Success
            </span>
            <span className="border-2 border-black bg-yellow-300 px-2 py-0.5 text-xs font-bold">
              Warning
            </span>
            <span className="border-2 border-black bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              Danger
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="border-2 border-black bg-yellow-300 px-3 py-2 text-sm font-bold">
              ⚠️ Check your input.
            </div>
            <div className="border-2 border-black bg-lime-300 px-3 py-2 text-sm font-bold">
              ✅ Operation completed!
            </div>
          </div>
        </div>

        <div className="border-[3px] border-black bg-white p-4">
          <h3 className="mb-3 font-black">Progress</h3>
          <progress
            className="h-4 w-full border-[3px] border-black [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:bg-lime-400"
            value={75}
            max={100}
          />
          <p className="mt-2 text-sm font-bold">75% complete</p>
        </div>

        <ImageCard />
      </div>
    </section>
  );
}

function ImagesGrid() {
  const { isLoading } = useLoading();

  if (isLoading) {
    return (
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-black">Image Gallery</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {IMAGES.map((img) => (
            <div key={img.seed} {...markAsSkull(img.name)}>
              <Skeleton name={img.name} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-black">Image Gallery</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {IMAGES.map((img) => (
          <div
            key={img.seed}
            className="overflow-hidden border-[3px] border-black bg-white"
            {...markAsSkull(img.name)}
          >
            <img
              className="h-48 w-full object-cover"
              src={`https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`}
              alt={img.title}
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="font-black">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<"components" | "images">("components");

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <LoadingToggle />
      <nav className="mb-8 flex gap-2">
        <button
          onClick={() => setActiveTab("components")}
          className={`border-[3px] border-black px-4 py-1 font-bold ${
            activeTab === "components" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Components
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`border-[3px] border-black px-4 py-1 font-bold ${
            activeTab === "images" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Images
        </button>
      </nav>

      {activeTab === "components" ? (
        <>
          <Hero />
          <ComponentsShowcase />
        </>
      ) : (
        <ImagesGrid />
      )}

      <footer className="mt-12 border-t-[3px] border-black pt-4 text-sm font-bold">
        <p>Built with Next.js + Tailwind CSS &bull; Neo Brutalism Edition</p>
      </footer>
    </main>
  );
}
