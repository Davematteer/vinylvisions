"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
Pagination,
PaginationContent,
PaginationItem,
PaginationLink,
} from "@/components/ui/pagination";
import { AspectRatio } from "./ui/aspect-ratio";

interface LyricsCardProps {
  song: string;
  artist: string;
}

export function LyricsCard({ song, artist }: LyricsCardProps) {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [parts, setParts] = useState<string[]>([]);
  const [selectedPart, setSelectedPart] = useState<number>(0);

  useEffect(() => {
    async function fetchLyrics() {
      const res = await fetch("/api/search/lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ song, artist }),
      });
      const data = await res.json();
      setLyrics(data.lyrics);
    }
    fetchLyrics();
  }, [song, artist]);

  useEffect(() => {
    if (lyrics) {
      // Remove [Intro], [Verse 1], [Chorus], etc.
      const cleanedLyrics = lyrics.replace(/\[[^\]]+\]/g, "").trim();
      // Split into lines and group into chunks of 4 lines
      const maxLines = 4;
      const lines = cleanedLyrics.split("\n").map(l => l.trim()).filter(Boolean);
      const splitParts: string[] = [];
      for (let i = 0; i < lines.length; i += maxLines) {
        splitParts.push(lines.slice(i, i + maxLines).join("\n"));
      }
      setParts(splitParts);
      setSelectedPart(0);
    }
  }, [lyrics]);

  return (
    <AspectRatio className="bg-gradient-to-br from-[#fbf9f7] to-[#f3f0ee]">
      <div className=" p-4 rounded-3xl shadow-2xl w-full max-w-sm h-[600px] mx-auto">
        <Card className="bg-gradient-to-br from-[#fbf9f7] to-[#f3f0ee] border-0 overflow-hidden shadow-2xl w-full h-full  transition-all duration-300 hover:shadow-3xl hover:scale-105">
          <CardContent className="p-4 text-left h-full flex flex-col justify-between relative">
            {/* Album Art Style Icon */}
            {/* <div className="absolute top-3 left-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-md"></div>
              </div>
            </div> */}

            <div className="mt-12">
              <p className="text-xl lg:text-3xl tracking-tight font-light font-sans text-black uppercase">
        
                {song}
              </p>
              <p className=" mb-4 text-base trackign-tight font-mono font-medium">
                {artist}
              </p>
              
              <div className="whitespace-pre-wrap text-xl tracking-tight text-left font-light font-sans text-black leading-snug">
                {parts.length > 0 ? parts[selectedPart] : "Loading lyrics..."}
              </div>
            </div>

            {/* Spotify Logo Style */}
            {/* <div className="absolute bottom-3 left-3">
              <div className="flex items-center space-x-1.5">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                  </div>
                </div>
                <span className="text-black font-bold text-xs tracking-wide">Music</span>
              </div>
            </div> */}
          </CardContent>
          
          {parts.length > 1 && (
            <CardFooter className="p-3 border-t-0 -translate-y-12 overflow-hidden">
              <div className="w-full overflow-x-auto scrollbar-hide">
                <Pagination className="w-max min-w-full">
                  <PaginationContent className="justify-start flex-nowrap">
                    {parts.map((_, idx) => (
                      <PaginationItem key={idx} className="flex-shrink-0">
                        <PaginationLink
                          href="#"
                          isActive={idx === selectedPart}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPart(idx);
                          }}
                          className={`w-8 h-8 rounded-full font-bold transition-all duration-300 text-sm mx-1 ${
                            idx === selectedPart
                              ? 'bg-black text-white shadow-lg scale-110'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {idx + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>
                </Pagination>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </AspectRatio>
  );
}