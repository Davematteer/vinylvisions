// src/app/api/search/lyrics/route.ts
import Genius from "genius-lyrics";

const client = new Genius.Client(process.env.GENIUS_API_KEY!);

export async function POST(req: Request) {
  try {
    const { song, artist } = await req.json();

    if (!song || !artist) {
      return new Response(JSON.stringify({ error: "Missing song or artist" }), { status: 400 });
    }

    const results = await client.songs.search(`${song} ${artist}`);
    const songObj = results[0];
    const lyrics = songObj ? await songObj.lyrics() : null;


    return new Response(JSON.stringify({ lyrics }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch lyrics" }), { status: 500 });
  }
}
