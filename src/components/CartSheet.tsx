import { Button } from "@/components/ui/button"
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
import { AllCart } from "./AllCartComponent"
import { clearCart, readCart } from "@/lib/searchHistory"
import { useState } from "react"
import { UserSession } from "@/lib/authMethods"
import { useRouter } from "next/navigation"
import { redirect } from "@/lib/payment-hook"

export function CartSheet({isOpen, setIsOpen}:{isOpen:boolean, setIsOpen: (v: boolean) => void}) {

  const [cart, setCart] = useState<string>()
  
  const cartItems = readCart();
  const userSession = UserSession()
  const email = userSession?.user.email!
  const router = useRouter()

  function checkoutRedirect(){
    
  }
  function checkout(){
    let total = 0
    cartItems.forEach(item => total += item.price );
    
    userSession ? redirect({ email:email, amount:(total *100) }) : router.push("/login") 
    // at the end clear cart after checkout 
    setIsOpen(false)
    clearCart()
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
          <Button onClick={checkout}>
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
