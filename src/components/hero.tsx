"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction:false,
          stopOnFocusIn:false,

        }),
      ]}
    >
      // ...
    </Carousel>
  )
}
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { LyricsCard } from "./lyricsCard";
import { useState } from "react";
import { OpenSearch } from "@/app/utilities/search";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {

  
  const [isOpenSearch, setSearchOpen] = useState(false);

  return (
   <>
    <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
        
        <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
          <div>
            <Badge variant="outline">We&apos;re live!</Badge>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-5xl md:text-7xl max-w-lg tracking-tighter font-light">
              VinylVisions!
            </p>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md px-5 md:px-0">
              VinylVisions brings timeless music to life through stunning visuals. We curate the finest album art and music posters, helping you celebrate the sound and style you love. Discover a collection designed to inspire, connect, and elevate your space.
            </p>
          </div>
          <div className="mt-5">
            {

              /*
            <Button size="lg" className="gap-4" onClick={()=>setSearchOpen(true)}>
              Browse Here <MoveRight className="w-4 h-4" />
            </Button>
              */
            }
              
            <Link href="/customUpload" className="gap-4">
            <Button size="lg" className="gap-4">
              Custom Design<MoveRight className="w-4 h-4" />
            </Button>
            </Link>
          </div>
        </div>
  
        <div className="rounded-md aspect-square flex justify-center items-center ">
          <Carousel
            className="flex justify-center items-center md:p-20 p-2"
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/covers/the_villain_i_never_was_by_black_sherif_ca5.png"
                  alt="image"
                  width={350}
                  height={300}
                  className="transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl rounded-2xl p-6 shadow-md hover:scale-105 hover:shadow-2xl"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/covers/to_pimp_a_butterfly_by_kendrick_lamar_76a.png"
                  alt="image"
                  width={350}
                  height={300}
                  className="transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl rounded-2xl p-6 shadow-md hover:scale-105 hover:shadow-2xl"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/covers/beauty_behind_the_madness_by_the_weeknd_b70.png"
                  alt="image"
                  width={350}
                  height={300}
                  className="transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl rounded-2xl p-6 shadow-md hover:scale-105 hover:shadow-2xl"
                />
              </CarouselItem>
              <CarouselItem className="md:translate-y-0 -translate-y-10">
                <LyricsCard artist="Rema" song="FYN" image="/covers/FYN.png" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  </div>

      <OpenSearch open={isOpenSearch} onOpenChange={setSearchOpen} />
   </>
  )
  
};
