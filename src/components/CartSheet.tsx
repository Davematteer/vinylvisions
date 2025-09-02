import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LucideTrash2, ShoppingBag, ShoppingCartIcon, SidebarCloseIcon } from "lucide-react"
import Link from "next/link"
import { AllCart } from "./AllCartComponent"
import { clearCart } from "@/lib/searchHistory"
import { useState } from "react"

export function CartSheet() {

  const [cart, setCart] = useState<string>()
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="px-4">
        <Button variant="outline" className="w-full">
          View Cart
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex flex-row gap-2">Cart <ShoppingCartIcon className="mt-2"/></SheetTitle>
          <SheetDescription>
           Items to checkout 
          </SheetDescription>
        </SheetHeader>
       <AllCart />
        <SheetFooter>
       
          <SheetClose asChild>
          <Button>
               Checkout Cart <ShoppingBag />
            </Button>
          </SheetClose>
          <Button variant="outline" onClick={() => {clearCart()
            setCart("")
          }}>
               Clear Cart <LucideTrash2 />
            </Button>
          <SheetClose asChild>
            <Button>
               Back<SidebarCloseIcon />
              </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
