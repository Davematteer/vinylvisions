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
import { AllHistory } from "./AllHistoryComponent"

export function HistorySheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="px-4">
        <Button variant="outline" className="w-full">
          View History
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>History</SheetTitle>
          <SheetDescription>
           Search History 
          </SheetDescription>
        </SheetHeader>
       <AllHistory />
        <SheetFooter>
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
