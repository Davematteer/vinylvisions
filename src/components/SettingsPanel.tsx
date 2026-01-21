import {Canvas, FabricImage, FabricObject, FabricText, Rect, TEvent, TFiller, TPointerEvent} from "fabric"
import { Circle, Square, Type, Upload } from "lucide-react";
import { useEffect, useState } from "react"

export function SettingsPanel({canvas}:{canvas:Canvas|null}){
    const [selectedObject, setSelectedObject] = useState<FabricObject|null>(null);
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [diameter, setDiameter] = useState("")
    const [colour, setColour] = useState<string|null|TFiller>("")

    // useEffect for determining if an object is selected 
    useEffect(() =>{
        if (!canvas) return;
        
        canvas.on("selection:created",(event)=>{
            handleObjectSelection(event.selected[0])

        })

        canvas.on("selection:updated",(event) =>{
            handleObjectSelection(event.selected[0])
        })
        canvas.on("selection:cleared",(event)=>{
            setSelectedObject(null);
            clearSettings()            
        })
        canvas.on("object:modified",(event)=>{
            handleObjectSelection(event.target)
        })
        canvas.on("object:scaling",(event)=>{
            handleObjectSelection(event.target)
        })
    },[canvas])

    const clearSettings= () => {
        setColour("");
        setHeight("");
        setWidth("");
        setDiameter("");
    }

    const handleObjectSelection = (object:FabricObject) =>{
        if (!object) return ;
        setSelectedObject(object)
        const type = object.type

        switch (type){
            case "rect":
               setHeight(Math.round(object.height * object.scaleY) as unknown as string) 
               setWidth(Math.round(object.width * object.scaleX) as unknown as string) 
               setColour(object.fill)
               setDiameter("");
            break

            case "circle":
                setDiameter(Math.round((object as any).radius *2  * object.scaleX) as unknown as string)
                setColour(object.fill)
                setHeight("")
                setWidth("")
            
            case "Image":
                setHeight(Math.round(object.height * object.scaleY) as unknown as string) 
               setWidth(Math.round(object.width * object.scaleX) as unknown as string) 
               setDiameter("");
            break
            
            default:
        }
    }
  // Image editting functions 
  const addImage = () =>{
      if (!canvas) return;

       FabricImage.fromURL('/covers/FYN.png').then((img) => {
        // Scale the image to fit nicely
        img.scaleToWidth(200);
        img.set({
          left: 100,
          top: 100
        });

        canvas.add(img);
      }).catch((err) => {
        console.error('Failed to load image:', err);
      });
  }

  const addText = () =>{
    if (!canvas) return;
    
    const World = new FabricText("Second text included");
    //fabricRef.current!.add(World);
    //fabricRef.current!.centerObject(World)
    canvas?.add(World)
    canvas?.centerObject(World);

  }

    const addRectangle = () => {
        const rect = new Rect({
          top: 50,
          left: 50,
          width: 50,
          height: 50,
          fill: "red"
        });
  
        //fabricRef.current!.add(rect);
        canvas?.add(rect)
      };


//-------------------------------------------------------------


    return (
        <>
  <div className="flex flex-col gap-6 p-6 border rounded-xl">
    <h2 className="text-xl font-semibold">Design Tools</h2>
    <p className="text-sm text-gray-500 leading-snug">
  For best results, create and edit designs on a laptop or desktop computer.
</p>

<div  className="
    flex gap-4 overflow-x-auto
    md:grid md:grid-cols-8 md:gap-4 md:overflow-visible
    md:px-0
  "
>
<button
    onClick={addImage}
    className="
      flex-shrink-0 w-12 h-12
      flex items-center justify-center
      bg-black text-white rounded-lg
      transition-all duration-200 ease-out
      hover:-translate-y-1 active:translate-y-0.5
    "
  >
    <Upload size={18} />
  </button>
  
    <button
      onClick={addText}
      className="
      flex-shrink-0 w-12 h-12
      flex items-center justify-center
      bg-black text-white rounded-lg
      transition-all duration-200 ease-out
      hover:-translate-y-1 active:translate-y-0.5
    "
  >
      <Type size={18} />
    </button>

    <button
      onClick={addRectangle}
      className="
      flex-shrink-0 w-12 h-12
      flex items-center justify-center
      bg-black text-white rounded-lg
      transition-all duration-200 ease-out
      hover:-translate-y-1 active:translate-y-0.5
    "
  >
      <Square size={18} />
    </button>

    <button
      onClick={addRectangle}
      className="
      flex-shrink-0 w-12 h-12
      flex items-center justify-center
      bg-black text-white rounded-lg
      transition-all duration-200 ease-out
      hover:-translate-y-1 active:translate-y-0.5
    "
  >      <Circle size={18} />
    </button>
</div>
  </div>
        </>
    )

}