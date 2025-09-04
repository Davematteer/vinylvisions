// src/app/vinyls/[id]/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LyricsCard } from "@/components/lyricsCard";
import PayButton from "@/lib/payment-hook";
import { DownloadCardButton } from "@/lib/downloadImage";
import path from "path";
import fs from "fs/promises";
import { CartItem, HistoryItem, saveHistory } from "@/lib/searchHistory";
import { HistoryWrapperComponent } from "@/app/HistoryWrapperComponent";
import { AddtoCartButton } from "@/app/AddtoCartButton";

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

export default async function Vinyl({ params }: { params: { id: string } }) {
  const { id } = await params;

  // fetch all covers from JSON
  const covers = await getCovers();
  const vinyl = covers.find((c) => c.id === parseInt(id));

  if (!vinyl) return <p>Vinyl not found</p>;

  const historyitem:HistoryItem = {
    name:(vinyl.title as string),
    image: (vinyl.image as string),
    path:(`/vinyls/${id}` as string),
    artist:(vinyl.artist as string),
    title:(vinyl.title as string)};

    const cartitem:CartItem = {
      name:(vinyl.title as string),
      image: (vinyl.image as string),
      path:(`/vinyls/${id}` as string),
      artist:(vinyl.artist as string),
      title:(vinyl.title as string),
      price:(vinyl.price)};
  

    // i did this incase it doesnt parse 
  return (
    <main className="min-h-screen flex justify-center items-start py-20">
      <section className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: Album Preview */}
        <Carousel className="w-full max-w-lg">
          <CarouselContent className="flex justify-between">
            <CarouselItem>
              <Card className="bg-gradient-to-br from-[#fbf9f7] to-[#f3f0ee] overflow-hidden shadow-lg">
                <CardContent className="p-8 lg:p-10" id={vinyl.title}>
                  <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black p-2 shadow-xl">
                    <div className="bg-white p-6">
                      <div className="relative mb-6 flex justify-center">
                        <Image
                          src={vinyl.image}
                          alt={vinyl.title}
                          width={400}
                          height={400}
                          className="w-full max-w-[350px] aspect-square object-cover shadow-lg"
                        />
                      </div>

                      <div className="mb-3">
                        <p className="text-xl lg:text-3xl tracking-tight font-light font-sans text-black uppercase">
                          {vinyl.title}
                        </p>
                        <p className="text-base lg:text-lg font-medium text-gray-700">
                          {vinyl.artist}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 text-xs lg:text-sm">
                        {vinyl.songs.slice(0, 10).map((track, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-black font-semibold mr-2">
                              {index + 1}.
                            </span>
                            <span className="text-black tracking-tight">{track}</span>
                          </div>
                        ))}
                      </div>

                      <div className="h-1 bg-gradient-to-r from-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <LyricsCard
                artist={vinyl.artist}
                song={vinyl.title}
                image={vinyl.image}
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* RIGHT: Payment / Details */}
        <div className="flex flex-col justify-start gap-6 p-10">
          <p className="text-6xl font-light">{vinyl.title}</p>
          <p className="text-xl font-light text-gray-800">{vinyl.artist}</p>
          <p className="text-2xl font-light text-gray-900">
            GHc{vinyl.price.toFixed(2)}
          </p>

          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <select className="w-full border rounded p-2">
              <option>A4 - Print Only (Unframed)</option>
              <option>A3 - Print Only (Unframed)</option>
              <option>A2 - Print Only (Unframed)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <div className="flex items-center border rounded w-32">
              <button className="px-3 py-1 border-r">-</button>
              <input
                type="number"
                defaultValue={1}
                className="w-full text-center outline-none"
              />
              <button className="px-3 py-1 border-l">+</button>
            </div>
          </div>

          <AddtoCartButton item={cartitem}/>
          
          <PayButton amount={vinyl.price * 100} />
          <DownloadCardButton targetId={vinyl.title} />
          <HistoryWrapperComponent item={historyitem} />
        </div>
      </section>
    </main>
  );
}
