"use client"

export interface HistoryItem {
    name: string;
    image: string;
    path: string;
    title?:string;
    artist?: string;
  }

export interface CartItem {
    name: string;
    image: string;
    path: string;
    title?:string;
    artist?: string;
    price: number;
  }
  
  // history logic
  function getHistory(): HistoryItem[] {
    return JSON.parse(localStorage.getItem("vinylHistory") || "[]");
  }
  
  export function readHistory(limit?: number): HistoryItem[] {
    const history = getHistory();
    return limit ? history.slice(0, limit) : history;
  }
  
  export function saveHistory(query: HistoryItem): void {
    let history = getHistory();
  
    // remove duplicates (based on path)
    history = history.filter((h) => h.path !== query.path);
  
    // add to front
    history.unshift(query);
  
    // cap at 30
    if (history.length > 30) history = history.slice(0, 30);
  
    localStorage.setItem("vinylHistory", JSON.stringify(history));
  }
  
  export function individualHistory(query: HistoryItem): HistoryItem | undefined {
    const history = getHistory();
    return history.find((h) => h.path === query.path);
  }
  

  // cart logic 
  function getCart(): CartItem[] {
    try {
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem("vinylCart") || "[]");
      }
    } catch (error) {
      console.error('Error reading cart:', error);
    }
    return [];
  }
  
  export function readCart(limit?: number): CartItem[] {
    const cart = getCart();
    return limit ? cart.slice(0, limit) : cart;
  }
  
  export function saveCart(query: CartItem): void {
    let cart = getCart();
  
    // remove duplicates (based on path)
    cart = cart.filter((c) => c.path !== query.path);
  
    // add to front
    cart.unshift(query);
  
    // cap at 30
    if (cart.length > 30) cart = cart.slice(0, 30);
  
    localStorage.setItem("vinylCart", JSON.stringify(cart));
  }
  
  export function clearCart(){
    localStorage.removeItem("vinylCart")
  }
