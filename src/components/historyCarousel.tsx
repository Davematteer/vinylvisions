import { HistoryItem, readHistory } from "@/lib/searchHistory";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { HistoryIcon } from "lucide-react";

export function HistoryCarousel() {
  const history = readHistory(10);

  return (
    <>
     <div className="flex flex-row items-center gap-1">
    <span className="font-light font-sans text-muted-foreground text-sm">
        History
    </span>
    <HistoryIcon className="w-4 h-4 text-muted-foreground" />
    </div>

    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 p-2">
       
        {history.map((h: HistoryItem) => (
          <div key={h.path} className="min-w-[140px] sm:min-w-[160px]">
            <Link href={h.path} className="block group">
              <Card className="bg-white hover:bg-gradient-to-b hover:from-gray-100 hover:to-gray-300 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-none group-hover:scale-[1.02] transform rounded-none">
                <CardContent className="p-4">
                  <div className="relative mb-3 flex justify-center">
                    <div className="relative p-2 rounded-none">
                      <Image
                        src={h.image}
                        alt={h.title || ""}
                        width={350}
                        height={350}
                        className="relative w-full max-w-[140px] aspect-square object-cover transition-transform duration-300 group-hover:scale-105 rounded-none"
                        style={{
                          border: "2px solid #e5e7eb",
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
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
