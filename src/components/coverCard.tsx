import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Cover } from "@/app/page";

export function CoverCard({cover}:{cover:Cover}){
    return (
       
<div className="grid grid-cols-1 md:grid-cols-4 md:gap-1 gap-10">
    <Link href={`vinyls/${cover.id}`} key={cover.id} className="block"> 
    <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-0">
        
        <CardContent className="p-6 transition-transform duration-500 hover:-translate-y-2 hover:scale-105">
          {/* Thin black frame */}
          <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black p-1 shadow-md">
            {/* White mat board */}
            <div className="bg-white p-2">
              {/* Album cover */}
              <div className="relative mb-2 flex justify-center">
                <Image
                  src={cover.image}
                  alt={cover.title}
                  width={160}
                  height={160}
                  className="w-full max-w-[160px] aspect-square object-cover"
                />
              </div>
              
              {/* Album info section */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-black text-black uppercase tracking-wide">
                    {cover.title}
                  </h3>
                  <div className="flex items-center space-x-0.5">
                    <div className="w-3 h-0.5 bg-black"></div>
                    <div className="w-0.5 h-0.5 bg-black"></div>
                    <div className="w-0.5 h-0.5 bg-black"></div>
                    <div className="w-0.5 h-0.5 bg-black"></div>
                  </div>
                </div>
                <p className="text-[10px] font-medium text-black">{cover.artist}</p>
              </div>
              
              {/* Track listing */}
              <div className="grid grid-cols-2 gap-x-1 gap-y-0 mb-2 text-[10px]">
                {cover.songs.slice(0, 6).map((track, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-black font-medium mr-1 flex-shrink-0">
                      {index + 1}.
                    </span>
                    <span className="text-black text-[10px]">
                      {track}
                    </span>
                  </div>
                ))}
                {cover.songs.length > 6 && (
                  <div className="col-span-2 text-[10px] text-gray-600 italic">
                    +{cover.songs.length - 6} more
                  </div>
                )}
              </div>
              
              {/* Release info */}
              <div className="flex justify-between items-end text-[10px] mb-2">
                <div className="flex-1">
                  <p className="font-bold text-black">RELEASED</p>
                  <p className="text-black">Available Now</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-bold text-black">LENGTH</p>
                  <p className="text-black">{cover.songs.length} tracks</p>
                </div>
              </div>
              
              {/* Color bar */}
              <div className="h-0.5 bg-gradient-to-r from-yellow-400 via-green-400 via-blue-400 to-purple-400"></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-2">
          <div className="w-full text-center">
            <span className="text-xs text-gray-500">From </span>
            <span className="text-base font-bold text-gray-900">
              GHc{cover.price.toFixed(2)}
            </span>
          </div>
        </CardFooter>
      </Card>
      
    </Link>
  
</div>
        
    )
}