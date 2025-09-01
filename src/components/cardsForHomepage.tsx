"use client";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Cover } from "@/app/page";


export function CardsforHomepage({ covers }: { covers: Cover[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const interval = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 3000); // Slightly longer interval for better UX
    return () => clearTimeout(interval);
  }, [api, current]);

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
    
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="gap-1">
            {covers.map((cover: Cover) => (
              <CarouselItem
                key={cover.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-1"
              >
                <Link href={`vinyls/${cover.id}`} className="block group">
                  <Card className="bg-white hover:bg-gradient-to-b hover:from-gray-100 hover:to-gray-300 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-none group-hover:scale-[1.02] transform rounded-none">
                    <CardContent className="p-4">
                      <div className="relative mb-3 flex justify-center">
                        <div className="relative  p-2 rounded-none">
                          <Image
                            src={(cover.image)}
                            alt={cover.title}
                            width={350}
                            height={350}
                            className="relative w-full max-w-[140px] aspect-square object-cover transition-transform duration-300 group-hover:scale-105 rounded-none"
                            style={{ 
                              border: '2px solid #e5e7eb'
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-center space-y-1">
                        <h3 className="text-xs font-bold text-gray-900 truncate leading-tight">
                          {cover.title}
                        </h3>
                        <p className="text-[10px] text-gray-600 truncate font-medium">
                          {cover.artist}
                        </p>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="px-4 py-2 border-t border-gray-200">
                      <div className="w-full text-center">
                        <span className="text-[10px] text-gray-500 font-medium">From </span>
                        <span className="text-sm font-bold text-gray-900 tracking-tight">
                          GHc{cover.price.toFixed(2)}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Optional: Carousel indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {covers.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(current / Math.ceil(covers.length / 6)) === Math.floor(index / Math.ceil(covers.length / 6))
                  ? 'bg-black w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}