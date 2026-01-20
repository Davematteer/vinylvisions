"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Canvas, FabricText, Rect } from "fabric";
import { useEffect, useRef } from "react";

export default function CustomPrint() {
  const fabricRef = useRef<Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // create fabric canvas
    const canvas = new Canvas(canvasRef.current);
    fabricRef.current = canvas;

    // create text
    const helloWorld = new FabricText("Slow Down Its not ready");
    canvas.add(helloWorld);
    canvas.centerObject(helloWorld)

    const addRectangle = () => {
        const rect = new Rect({
          top: 50,
          left: 50,
          width: 50,
          height: 50,
          fill: "red"
        });
  
        fabricRef.current!.add(rect);
      };
      addRectangle()
    const World = new FabricText("Second text included");
    canvas.add(World);
    canvas.centerObject(World)
    // cleanup
    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []);

  return (
    <main className="min-h-screen flex justify-center items-start py-20 px-4">
      <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* LEFT: Print Preview (16:20 aspect ratio) */}

              <Card className="bg-gradient-to-br from-[#fbf9f7] to-[#f3f0ee] overflow-hidden shadow-lg">
                <CardContent className="p-8 lg:p-10">
        <div className="flex justify-center items-start">
          <div id="my-node" className="bg-gradient-to-br  h-130 md:h-144.5 w-80 md:w-110 from-gray-800 via-gray-900 to-black p-2">
            <div id="printing" className="bg-white p-8 h-125.5 md:h-140">
              <div className="relative mb-67.5 flex justify-center">
                {/* 16:20 aspect ratio canvas */}
                <canvas 
                  ref={canvasRef} 
                  className="w-full max-w-[400px] " 
                  width={790}
                  height={500}
                  style={{ aspectRatio: '16/20' } 
                }
                />
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

                      {/* <div className="h-1 bg-gradient-to-r from-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full"></div> */}
                </CardContent>
              </Card>

        {/* RIGHT: Product Details & Options */}
        <div className="flex flex-col justify-start gap-6">
          {/* Size Selection */}
          <div className="flex flex-col justify-start gap-6 p-10">
          <p className="text-6xl font-light">Custom</p>
          <p className="text-xl font-light text-gray-800">Uploader</p>
          <p className="text-2xl font-light text-gray-900">
            GHc 350
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
</div>
          {/* Action Buttons Placeholder */}
          <div className="flex flex-col gap-3 mt-4">
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
            <button className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Download Preview
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
