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
import { LucideTrash2, ShoppingBag, ShoppingCart, ShoppingCartIcon, SidebarCloseIcon } from "lucide-react"
import { AllCart } from "./AllCartComponent"
import { clearCart, readCart } from "@/lib/searchHistory"
import { useEffect, useState } from "react"
import { UserSession } from "@/lib/authMethods"
import { useRouter } from "next/navigation"
import { checkoutredirect, redirect } from "@/lib/payment-hook"
import { toast } from "sonner"

export function CartSheet() {
  const [cart, setCart] = useState<string>()
 
  
  const userSession = UserSession()
  const email = userSession?.user.email!
  const router = useRouter()
  
  const [cartItems, setCartItems] = useState<any[]>([])

  // Load cart items when component mounts
  useEffect(() => {
    setCartItems(readCart())
  }, [])

  // Calculate total from state
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)


  async function checkout() {
    const cartItems = readCart();
    let total = 0
    cartItems.forEach(item => total += (item.price));
    
    // Close the history sheet when checkout is clicked
    if (total === 0)
      {
        console.log(total)
        console.log(cartItems)
        return toast("No item in cart! Add before checkout!")

      }
    
    const result = checkoutredirect({ email: email, amount: (total * 100) })
    userSession ?  result : router.push("/login")
    
    // Clear cart after checkout
    
    if ((await result) === "success"){
      clearCart()
    }
    
    // Close the cart sheet as well
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="px-4">
          <Button variant="outline" className="w-full">
            <ShoppingCart />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex flex-row gap-2">
            Cart <ShoppingCartIcon className="mt-2"/>
          </SheetTitle>
          <SheetDescription>
            Items to checkout
            </SheetDescription>
            <SheetDescription>
            Total: {total}
          </SheetDescription>
        </SheetHeader>
        <AllCart />
        <SheetFooter>
          <SheetClose asChild>
          <Button onClick={checkout}>
            Checkout Cart <ShoppingBag />
          </Button>
          </SheetClose>
          <Button variant="outline" onClick={() => {
            clearCart()
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