"use client";
import * as htmlToImage from "html-to-image";
import { Download, DownloadIcon } from "lucide-react";
import { UserSession } from "./authMethods";

export const handleDownload = async (targetId: string) => {

  const node = document.getElementById(targetId);
  if (!node) return;
  
  try {
    const dataUrl = await htmlToImage.toPng(node, { 
      pixelRatio: 6, 
      fontEmbedCSS: "font-sans" 
    });
    
    // Convert data URL to blob for better mobile compatibility
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const blobUrl = URL.createObjectURL(blob);

    // Detect iOS Safari
    const isIosSafari =
      /iP(hone|od|ad)/.test(navigator.userAgent) &&
      /Safari/.test(navigator.userAgent) &&
      !/Chrome|CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent);

    if (/Mobi|Android/i.test(navigator.userAgent) || isIosSafari) {
      // Try multiple approaches for mobile
      try {
        // First try: create a temporary link and click it
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${targetId}.png`;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        // Fallback: open in new tab
        window.open(blobUrl, "_blank");
      }
    } else {
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${targetId}.png`;
      link.click();
    }

    // Clean up the blob URL
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch (err) {
    console.error("Failed to capture node:", err);
  }
};

export function DownloadCardButton({ targetId}: { targetId: string }) {
  

  return (
   <>
    <button
      onClick={() => handleDownload(targetId)}
      className="flex flex-row gap-2 justify-center bg-black text-white py-3 rounded-lg hover:bg-gray-800"
    >
      <p>Download Preview</p> <Download className="mt-2 font-extralight text-white text-sm"/>
    </button>
    
   </>
  );
}