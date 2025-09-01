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
import Image from "next/image";

interface LyricsCardProps {
  song: string;
  artist: string;
  image: string;
}

export function LyricsCard({ song, artist, image }: LyricsCardProps) {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [parts, setParts] = useState<string[]>([]);
  const [selectedPart, setSelectedPart] = useState<number>(0);

  useEffect(() => {
    async function fetchLyrics() {
      const res = await fetch(`https://vinylvisions.vercel.app/api/search/lyrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ song, artist }),
      });
      
      if (!res.ok) {
        const text = await res.text();
        console.error('API error:', text);
        throw new Error('Failed to fetch lyrics');
      }
      
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
      <div className="p-4 rounded-3xl w-full max-w-sm h-[600px] mx-auto">
        <Card className="bg-gradient-to-br from-[#fbf9f7] to-[#f3f0ee] border-0 overflow-hidden shadow-2xl w-full h-full transition-all duration-300 hover:shadow-3xl hover:scale-105">
          <CardContent className="p-4 text-left h-full flex flex-col justify-between relative">
            {/* Header with Album Art and Song Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
                  {image && (
                    <Image
                      src={image}
                      alt="cover_img"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="text-xl lg:text-2xl tracking-tight font-light font-sans text-black uppercase leading-tight">
                    {song}
                  </p>
                  <p className="text-base tracking-tight font-mono font-medium text-gray-700 mt-1">
                    {artist}
                  </p>
                </div>
              </div>
            </div>

            {/* Lyrics Content */}
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="whitespace-pre-wrap text-xl tracking-tight text-left font-light font-sans text-black leading-relaxed">
                {parts.length > 0 ? parts[selectedPart] : "Loading lyrics..."}
              </div>
            </div>
          </CardContent>
          
          {parts.length > 1 && (
            <CardFooter className="p-3 border-t-0 -translate-y-8 overflow-hidden">
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