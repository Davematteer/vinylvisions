"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type SpotifyItem = {
  id: string;
  name: string;
  images?: { url: string }[];
  artists?: { name: string }[];
};

export function OpenSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpotifyItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (query.trim().length < 2) return;
  
    const controller = new AbortController();
  
    async function fetchResults() {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const text = await res.text(); // get raw response first
        console.log("Raw response:", text);
  
        const data = JSON.parse(text); // now parse manually
        setResults(data.albums?.items || []);
      } catch (err) {
        if ((err as any).name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      }
    }
  
    fetchResults();
  
    return () => controller.abort();
  }, [query]);
  

  console.log(results)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl shadow-lg md:-translate-y-30 -translate-y-100 ">
        <DialogHeader>
          <DialogTitle className="text-lg flex "><span className="font-light">Search</span></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Search albums, posters..."
            className="w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* search results */}
          <div className="max-h-64 overflow-y-auto space-y-2">
            {loading && <p className="text-sm text-gray-500">Loading...</p>}
            {!loading && results.length === 0 && query && (
              <p className="text-sm text-gray-500">No results</p>
            )}
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  router.push(`/vinylsSearch/${item.id}`)
                onOpenChange(false)}}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"

              >
                {item.images?.[0] && (
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  {item.artists && (
                    <p className="text-xs text-gray-500">
                      {item.artists.map((a) => a.name).join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
