"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Menu, MoveRight, X, User, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { OpenSearch } from "@/app/utilities/search";
import {toast} from "sonner"
import { useRouter } from "next/navigation";
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
import { SignOut, UserSession } from "@/lib/authMethods";
import { HistorySheet } from "./historySheet";
import { HistoryCarousel } from "./historyCarousel";



export const Header = () => {
  const userSession = UserSession();
  const router = useRouter();

  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Product",
      description: "Browse Our Products",
      items: [
        { title: "Albums", href: "/albums" },
        { title: "Movies", href: "/movies" },
        { title: "Anime", href: "/anime" },
        { title: "Custom", href: "/custom" },
      ],
    },
  ];

  const [isOpen, setOpen] = useState(false);
  const [isOpenSearch, setSearchOpen] = useState(false);


  return (
    <>
    <header className="w-full z-40 fixed top-0 left-0 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="min-h-14 flex items-center justify-between">
          {/* Desktop Nav */}
          
          <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
            <NavigationMenu className="flex justify-start items-start">
              <NavigationMenuList className="flex justify-start gap-4 flex-row">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.href ? (
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>
                          <Button variant="ghost">{item.title}</Button>
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="font-medium text-sm">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[120px] p-4">
                          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                            <div className="flex flex-col text-sm h-full justify-end">
                              {item.items?.map((subItem) => (
                                <NavigationMenuLink asChild key={subItem.title}>
                                  <Link
                                    href={subItem.href}
                                    className="flex flex-row justify-between items-center hover:bg-muted py-2 rounded"
                                  >
                                    <span>{subItem.title}</span>
                                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>


     

          {/* Right-side actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSearchOpen(true)}>
            <Search /> 
            Search
            </Button>
            
            
            <div className="border-r h-6" />
            
            <Sheet>
      <SheetTrigger asChild>
      <User className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {userSession? ` Welcome ${userSession?.user.name}!` : "Account Info"}</SheetTitle>
          <SheetDescription>
          {userSession? ` Here are your account details ${userSession?.user.name}, Enjoy shopping!` : "Sign In to view account details"}
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <HistoryCarousel/>
        </div>
            <HistorySheet />   
        <SheetFooter> 
          { !userSession ? (        
          <>
            <SheetClose asChild>
              <Link href="/login">
              <Button className="w-full">
              Login
              </Button>
              </Link>
           </SheetClose>
           <SheetClose asChild>
              <Link href="/signup">
              <Button className="w-full">
              Sign Up
              </Button>
              </Link>
           </SheetClose>
          </>
          ) : ( <SheetClose asChild>
              <Link href="/" onClick={() => SignOut(router)}>
              <Button className="w-full" onClick={()=>{toast(`${userSession.user.name} signed out!`)}}>
              Logout
              </Button>
              </Link>

          </SheetClose>) }         
         
         
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
          </div>

          {/* Mobile right-side actions */}
          <div className="grid grid-cols-3 lg:hidden items-center gap-10">
{/*             
            <Button className="flex justify-start" variant="ghost" size="sm" onClick={() => setOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button> */}

              <Link 
              href="/"
              className="flex justify-start">
            <Image
            src="/logo.png"
            alt="app logo"
            width={50}
            height={50}
            />
              </Link>

              <div className="flex justify-center">

              </div>

            <div className="flex justify-end">
            <Button variant="ghost" onClick={() => setSearchOpen(true)}>
            <Search /> 
            Search
            </Button>

         {/* Sheet for mobile*/} 
            <Sheet>
              <SheetTrigger>
                <User className="w-5 h-5" />
                </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>            {userSession? ` Welcome ${userSession?.user.name}!` : "Account Info"}
                  </SheetTitle>
                  <SheetDescription>
                  {userSession? ` Here are your account details ${userSession?.user.name}, Enjoy shopping!` : "Sign In to view account details"}
                  </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <HistoryCarousel/>
        </div>
            <HistorySheet />   
        <SheetFooter>
          
        { !userSession ? (        
          <>
            <SheetClose asChild>
              <Link href="/login">
              <Button className="w-full">
              Login
              </Button>
              </Link>
           </SheetClose>
           <SheetClose asChild>
              <Link href="/signup">
              <Button className="w-full">
              Sign Up
              </Button>
              </Link>
           </SheetClose>
          </>
          ) : ( <SheetClose asChild>
              <Link href="/" onClick={() => SignOut(router)}>
              <Button className="w-full" onClick={()=>{toast(`${userSession.user.name} signed out!`)}}>
              Logout
              </Button>
              </Link>

          </SheetClose>) }   
          
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {/* {isOpen && (
          <div className="lg:hidden border-t bg-background shadow-lg py-4 gap-6 flex flex-col">
            {navigationItems.map((item) => (
              <div key={item.title}>
                <div className="flex flex-col gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex justify-between items-center py-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="text-lg font-medium">{item.title}</span>
                      <MoveRight className="w-4 h-4 shrink-0 text-muted-foreground" />
                    </Link>
                  ) : (
                    <p className="text-lg font-medium py-2">{item.title}</p>
                  )}
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="flex justify-between items-center py-2 pl-4"
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-muted-foreground">
                          {subItem.title}
                        </span>
                        <MoveRight className="w-4 h-4 shrink-0" />
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </header>
    

      <OpenSearch open={isOpenSearch} onOpenChange={setSearchOpen} />
    
    </>
  );
};