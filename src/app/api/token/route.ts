// app/api/spotify-token/route.ts
import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function GET() {
  const now = Date.now();

  // if cached token is still valid, return it
  if (cachedToken && now < tokenExpiry) {
    return NextResponse.json({ access_token: cachedToken });
  }

  // otherwise request a new one
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  console.log(process.env.SPOTIFY_CLIENT_ID)
  console.log(process.env.SPOTIFY_CLIENT_SECRET)
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  // cache it
  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000; // ms

  return NextResponse.json({ access_token: cachedToken });
}
