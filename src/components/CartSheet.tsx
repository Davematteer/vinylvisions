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
import { SidebarCloseIcon } from "lucide-react"
import Link from "next/link"
import { AllCart } from "./AllCartComponent"

export function CartSheet() {
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
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
           Items to checkout 
          </SheetDescription>
        </SheetHeader>
       <AllCart />
        <SheetFooter>
       
          <SheetClose asChild>
          <Button variant="outline">
              <SidebarCloseIcon /> Checkout Cart
            </Button>
          </SheetClose>
          <Button variant="outline">
              <SidebarCloseIcon /> Clear Cart
            </Button>
          <SheetClose asChild>
            <Button variant="outline">
              <SidebarCloseIcon /> Back
              </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
