// src/components/HistorySaver.tsx
// i just removed we have add to cart button delete this later 
"use client";

import { useEffect } from "react";
import {  CartItem, saveCart } from "@/lib/searchHistory";
import { toast } from "sonner";

export function AddtoCartButton({ item }: { item: CartItem }) {
  

  return (
    <button className="bg-gray-100 text-black py-3 rounded-lg hover:bg-white" onClick={()=>{
      toast("Item added to cart!", {
          action: {
          label: "Undo",
          onClick: () => console.log("Remove from card"),
        },
      })
      saveCart(item)
      }}>
            Add to Cart
          </button>
  ); 
}
