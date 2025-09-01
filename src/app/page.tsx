// src/app/page.tsx
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/hero";
import { CardsforHomepage } from "@/components/cardsForHomepage";
import path from "path";
import fs from "fs/promises";

export interface Cover {
  id: number;
  title: string;
  artist: string;
  type: string;
  image: string;
  price: number;
  songs: string[];
}

// Server-side read from JSON file
const getCovers = async (): Promise<Cover[]> => {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(jsonData);
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
