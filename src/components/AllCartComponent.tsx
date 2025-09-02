import { CartItem, readCart } from "@/lib/searchHistory";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export function AllCart() {
  const cart = readCart();

  return (
    <>
      <div className="w-full max-h-[500px] overflow-y-auto p-2">
        <div className="grid grid-cols-2 gap-3">
          {cart.map((h: CartItem) => (
            <div key={h.path}>
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
                          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105 rounded-none border border-gray-200"
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
