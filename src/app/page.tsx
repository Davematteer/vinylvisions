
import { CTA } from "@/components/CTA"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image"
import Link from "next/link" // ✅ import Link
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { CardsforHomepage } from "@/components/cardsForHomepage"
import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity/client"



export interface Cover {
  id: number,
  title: string,
  artist: string,
  type: string,
  image: string,
  price: number
  songs: string[]
}
const getCovers = async () => {
  try {
    const COVERS_QUERY = `*[_type == "cover"]{"id":_id,
  title,
  artist,
  type,
  image{asset -> {url}},
  price,
  songs}
`;
    
    // const res = await fetch("http://localhost:5000/covers");
    const options = { next: { revalidate: 30 } };
    const covers = await client.fetch<Cover[]>(COVERS_QUERY, {}, options);
    return covers;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const covers = await getCovers();
 
  
  return (
    <main className="min-h-screen p-2">
      <Hero />
      <div className="w-full mx-auto">
        <div className="text-center mb-8">
          <p className="text-gray-600 text-base">Curated Album Art & Music Posters</p>
        </div>
          <CardsforHomepage covers={covers!}/>        
      </div>
      
        <CTA />
    </main>
  )
}
