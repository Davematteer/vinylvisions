"use client";
import { useEffect, useState } from "react";
import { extractColors } from "extract-colors";
import { FinalColor } from "extract-colors/lib/types/Color";


export default function VinylPalette({ src }: { src: string }) {
  const [colors, setColors] = useState<FinalColor[]>([]);

  useEffect(() => {
    if (!src) return;

    const run = async () => {
      try {
        const extracted = await extractColors(src, { crossOrigin: "anonymous" });
        setColors(extracted);
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };

    run();
  }, [src]);

  return (
    <div className="flex gap-2 mt-4">
      {colors.map((c, i) => (
        <div
          key={i}
          className="w-8 h-8 rounded"
          style={{ backgroundColor: c.hex }}
          title={c.hex}
        />
      ))}
    </div>
  );
}
