// "use client";

// import * as htmlToImage from "html-to-image";

// export function DownloadCardButton({ targetId }: { targetId: string }) {
//   const handleDownload = async () => {
//     const node = document.getElementById(targetId);
//     if (!node) return;

//     try {
//       const dataUrl = await htmlToImage.toPng(node, { pixelRatio: 6, fontEmbedCSS: "font-sans" });

//       // Detect iOS Safari
//       const isIosSafari =
//         /iP(hone|od|ad)/.test(navigator.userAgent) &&
//         /Safari/.test(navigator.userAgent) &&
//         !/Chrome|CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent);

//       if (/Mobi|Android/i.test(navigator.userAgent) || isIosSafari) {
//         // open in new tab on mobile or iOS Safari
//         window.open(dataUrl, "_blank");
//       } else {
//         const link = document.createElement("a");
//         link.href = dataUrl;
//       link.download = `${targetId}.png`;
//         link.click();
//       }

//     } catch (err) {
//       console.error("Failed to capture node:", err);
//     }
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//     >
//       Download Preview
//     </button>
//   );
// }

"use client";
import React, { useCallback } from 'react';
import { toPng } from 'html-to-image';

export function DownloadCardButton({ targetId }: { targetId: string }) {
  const handleDownload = useCallback(() => {
    const node = document.getElementById(targetId);
    if (node === null) {
      return;
    }

    toPng(node, { 
      cacheBust: true,
      pixelRatio: 6, 
      fontEmbedCSS: "font-sans" 
    })
      .then((dataUrl) => {
        // Detect iOS Safari
        const isIosSafari =
          /iP(hone|od|ad)/.test(navigator.userAgent) &&
          /Safari/.test(navigator.userAgent) &&
          !/Chrome|CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent);

        if (/Mobi|Android/i.test(navigator.userAgent) || isIosSafari) {
          // open in new tab on mobile or iOS Safari
          window.open(dataUrl, "_blank");
        } else {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${targetId}.png`;
          link.click();
        }
      })
      .catch((err) => {
        console.error("Failed to capture node:", err);
      });
  }, [targetId]);

  return (
    <button
      onClick={handleDownload}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Download Preview
    </button>
  );
}