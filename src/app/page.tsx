// src/app/page.tsx
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/hero";
import { CardsforHomepage } from "@/components/cardsForHomepage";

export interface Cover {
  id: number;
  title: string;
  artist: string;
  type: string;
  image: string;
  price: number;
  songs: string[];
}

// Server-side fetch from JSON file
const getCovers = async (): Promise<Cover[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/data.json`);
  if (!res.ok) throw new Error("Failed to fetch covers");
  const data = await res.json();
  return data.covers;
};

export default async function Home() {
  const covers = await getCovers();

  return (
    <main className="min-h-screen p-2">
      <Hero />
      <div className="w-full mx-auto">
        <div className="text-center mb-8">
          <p className="text-gray-600 text-base">
            Curated Album Art & Music Posters
          </p>
        </div>
        <CardsforHomepage covers={covers} />
      </div>
      <CTA />
    </main>
  );
}
