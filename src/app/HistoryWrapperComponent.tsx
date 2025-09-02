// src/components/HistorySaver.tsx
"use client";

import { useEffect } from "react";
import { saveHistory, HistoryItem } from "@/lib/searchHistory";

export function HistoryWrapperComponent({ item }: { item: HistoryItem }) {
  useEffect(() => {
    saveHistory(item);
  }, [item]);

  return null; // nothing to render
}
