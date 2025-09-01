import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
    
  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    // get token
    const tokenRes = await fetch(`http://localhost:3000/api/token`);
    const tokenData = await tokenRes.json();    

    if (!tokenData.access_token) {
      return NextResponse.json({ error: "Failed to fetch token", details: tokenData }, { status: 500 });
    }

    // search Spotify
    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=album&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    
    const searchData = await searchRes.json();

    return NextResponse.json(searchData);
  } catch (err: unknown) {
    if (err instanceof Error) return NextResponse.json(
      { error: "Something went wrong", message: err.message },
      { status: 500 }
    );
  }
}
