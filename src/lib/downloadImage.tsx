"use client";


import * as htmlToImage from "html-to-image";


export function DownloadCardButton({ targetId }: { targetId: string }) {
  const handleDownload = async () => {
    const node = document.getElementById(targetId);
    if (!node) return;

    try {
      const dataUrl = await htmlToImage.toPng(node,{ pixelRatio:6, fontEmbedCSS: "font-sans"});
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${targetId}.png`;
      link.click();
    } catch (err) {
      console.error("Failed to capture node:", err);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Download Preview
    </button>
  );
}
