import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, amount } = await req.json();

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, amount })
    });

    const data = await res.json();
    return NextResponse.json(data);

  } catch (err:unknown) {
    if (err instanceof Error) return NextResponse.json(
      { error: `Failed to initialize transaction: ${err.message}` },
      { status: 500 }
    );
  }
}
