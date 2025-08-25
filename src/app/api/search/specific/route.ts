export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  

  if (!id) return NextResponse.json({ error: "Missing album id" }, { status: 400 });

  try {
    // get your token from your existing token route (change path if yours is /api/spotify-token)
    const tokenRes = await fetch(`http://localhost:3000/api/token`);
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "Failed to fetch token", details: tokenData },
        { status: 500 }
      );
    }

    // fetch album details from Spotify
    const spotifyRes = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!spotifyRes.ok) {
      const err = await spotifyRes.text();
      return NextResponse.json({ error: "Spotify error", details: err }, { status: spotifyRes.status });
    }

    const album = await spotifyRes.json();

    // OPTIONAL: shape it like your current card expects
    const payload = {
      image: album.images?.[0]?.url ?? null,
      title: album.name,
      artist: album.artists?.map((a: any) => a.name).join(", ") ?? "",
      songs: album.tracks?.items?.map((t: any) => t.name) ?? [],
      price: 0, // placeholder so your .toFixed(2) won't crash
    };

    return NextResponse.json(payload);
  } catch (e: any) {
    return NextResponse.json({ error: "Server error", message: e.message }, { status: 500 });
  }
}
