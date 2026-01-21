"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Canvas, FabricImage, FabricText, Image, Rect } from "fabric";
import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";

export default function CustomPrint() {
  const fabricRef = useRef<Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDesignActive, setDesignActive] = useState(true);
  const [isPaymentActive, setPaymentActive] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // create fabric canvas
    const canvas = new Canvas(canvasRef.current,{
      backgroundColor: "#ffffff",
    });
    fabricRef.current = canvas;

    canvas.selection = true;
canvas.preserveObjectStacking = true;
canvas.set({
  allowTouchScrolling: false,
});


    FabricText.ownDefaults.fontFamily = 'Mono'
    // create text

      
    
    
    //FabricImage.fromURL('/covers/babyJhus.jpg');
          
      
    // cleanup
    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []);
  

  // Image editting functions 
  const addImage = () =>{
      if (!fabricRef.current) return;

       FabricImage.fromURL('/covers/FYN.png').then((img) => {
        // Scale the image to fit nicely
        img.scaleToWidth(200);
        img.set({
          left: 100,
          top: 100
        });

        fabricRef.current!.add(img);
        fabricRef.current!.renderAll();
      }).catch((err) => {
        console.error('Failed to load image:', err);
      });
  }

  const addText = () =>{
    const World = new FabricText("Second text included");
    fabricRef.current!.add(World);
    fabricRef.current!.centerObject(World)

  }

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


//-------------------------------------------------------------

//Download function
  const downloadCanvas = () => {
    if (!fabricRef.current) return;
  
    const canvas = fabricRef.current;
  
    // Export canvas as PNG
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 5, // ↑ increases resolution (retina / print preview)
    });
  
    // Create a temporary download link
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "custom-print.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <main className="min-h-screen flex justify-center items-start py-20 px-4">
      <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* LEFT: Print Preview (16:20 aspect ratio) */}

              <Card className="bg-gradient-to-br from-[#fbf9f7] to-[#f3f0ee] overflow-hidden shadow-lg">
                <CardContent className="p-8 lg:p-10">
        <div className="flex justify-center items-start">
          <div id="my-node" className="bg-gradient-to-br  h-117 md:h-144.5 w-79.5 md:w-110 from-gray-800 via-gray-900 to-black p-2">
            <div id="printing" className="bg-white p-8 h-111 md:h-140">
            <div className="relative scale-72 scale-y-80 md:scale-100 w-full max-w-[308px] md:max-w-[430px] aspect-[16/20]  md:p-0">
  <canvas
    ref={canvasRef}
    className="w-full h-full   -translate-x-23.5 -translate-y-28 md:-translate-y-8 md:-translate-x-8"
    width={425}
    height={560}
  />
</div>
              
            </div>
          </div>
        </div>

                      {/* <div className="h-1 bg-gradient-to-r from-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full"></div> */}
                </CardContent>
              </Card>

        {/* RIGHT: Controls Column */}
<div className="flex flex-col gap-8">

{/* Tabs */}
<div className="flex gap-4 border-b pb-2">
  <button
    onClick={() => {
      setDesignActive(true);
      setPaymentActive(false);
    }}
    className={`px-4 py-2 font-medium ${
      isDesignActive ? "border-b-2 border-black" : "text-gray-400"
    }`}
  >
    Design
  </button>

  <button
    onClick={() => {
      setPaymentActive(true);
      setDesignActive(false);
    }}
    className={`px-4 py-2 font-medium ${
      isPaymentActive ? "border-b-2 border-black" : "text-gray-400"
    }`}
  >
    Payment
  </button>
</div>

{/* DESIGN SECTION */}
{isDesignActive && (
  <div className="flex flex-col gap-6 p-6 border rounded-xl">
    <h2 className="text-xl font-semibold">Design Tools</h2>
    <p className="text-sm text-gray-500 leading-snug">
  For best results, create and edit designs on a laptop or desktop computer.
</p>

    <button
      onClick={addImage}
      className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg"
    >
      <Upload size={18} />
      Add Image
    </button>

    <button className="px-4 py-3 border rounded-lg" onClick={addText}>
      Add Text
    </button>

    <button className="px-4 py-3 border rounded-lg" onClick={addRectangle}>
      Add Shape
    </button>
  </div>
)}

{/* PAYMENT SECTION */}
{isPaymentActive && (
  <div className="flex flex-col justify-start gap-6">
    {/* (UNCHANGED PAYMENT JSX — pasted exactly as you had it) */}
    <div className="flex flex-col justify-start gap-6 p-10">
      <p className="text-6xl font-light">Custom</p>
      <p className="text-xl font-light text-gray-800">Uploader</p>
      <p className="text-2xl font-light text-gray-900">GHc 350</p>

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

    <div className="flex flex-col gap-3 mt-4">
      <button className="w-full bg-black text-white py-3 rounded-lg font-medium">
        Add to Cart
      </button>
      <button
  onClick={downloadCanvas}
  className="w-full border py-3 rounded-lg font-medium"
>
  Download Preview
</button>

    </div>
  </div>
)}
</div>

      </section>
    </main>
  );
}
