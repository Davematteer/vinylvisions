
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
    const res = await fetch("http://localhost:5000/covers");
    return res.json();
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
          <CardsforHomepage covers={covers}/>        
      </div>
      
        <CTA />
    </main>
  )
}
