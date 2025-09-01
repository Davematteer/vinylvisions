import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CTA = () => (
  <div className="w-full py-10 sm:py-20 lg:py-40 mb-20 text-black px-4 ">
    <div className="container mx-auto max-w-4xl">
      <div className="flex flex-col text-center rounded-2xl p-4 sm:p-6 lg:p-16 gap-6 sm:gap-8 items-center shadow-lg border border-gray-200 bg-white">
        <div>
          <Badge variant="secondary" className="bg-black text-white">
            VinylVisions
          </Badge>
        </div>
        
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl tracking-tighter font-bold px-2">
            Curated Album Art & Music Posters
          </h3>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-tight text-gray-600 max-w-2xl mx-auto px-2">
            Discover rare and timeless vinyl-inspired visuals. Elevate your
            space with curated artwork that celebrates the golden era of music.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-none px-2">
          <Button className="w-full sm:w-auto sm:flex-1 sm:max-w-[200px] gap-2 sm:gap-4 bg-black text-white hover:bg-gray-800 py-3">
            Jump on a call <PhoneCall className="w-4 h-4" />
          </Button>
        <Link href="signup">
          <Button className="w-full sm:w-auto sm:flex-1 sm:max-w-[200px] gap-2 sm:gap-4 bg-gray-200 text-black hover:bg-gray-300 py-3">
            Sign up here <MoveRight className="w-4 h-4" />
          </Button>
        </Link>
        </div>
      </div>
    </div>
  </div>
);