import { HistoryItem, readHistory } from "@/lib/searchHistory";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
  } from "./ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";

export function HistoryCarousel(){
    
    const [api, setApi] = useState<CarouselApi>();

    const history = readHistory(10)

    return(
        <div>
         <Carousel className="w-full">
          <CarouselContent className="gap-1">
            {history.map((h:HistoryItem) => (
              <CarouselItem
                key={h.path}
                className="basis-1/3 sm:basis-1/3  pl-1"
              >
                <Link href={h.path} className="block group">
                  <Card className="bg-white hover:bg-gradient-to-b hover:from-gray-100 hover:to-gray-300 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-none group-hover:scale-[1.02] transform rounded-none">
                    <CardContent className="p-4">
                      <div className="relative mb-3 flex justify-center">
                        <div className="relative  p-2 rounded-none">
                          <Image
                            src={(h.image)}
                            alt={h.title || ""}
                            width={350}
                            height={350}
                            className="relative w-full max-w-[140px] aspect-square object-h transition-transform duration-300 group-hover:scale-105 rounded-none"
                            style={{ 
                              border: '2px solid #e5e7eb'
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-center space-y-1">
                        <h3 className="text-xs font-bold text-gray-900 truncate leading-tight">
                          {h.title}
                        </h3>
                        <p className="text-[10px] text-gray-600 truncate font-medium">
                          {h.artist}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        

    </div>
    )
}