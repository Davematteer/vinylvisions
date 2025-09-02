"use client"

export interface HistoryItem {
    name: string;
    image: string;
    path: string;
    title?:string;
    artist?: string;
  }
  
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
  