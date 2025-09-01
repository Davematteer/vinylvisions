"use client"

import { useRouter } from "next/navigation"
import { UserSession } from "./authMethods"

type PaymentResponse = {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export async function redirect({ email, amount }: { email: string; amount: number }) {
  try {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        amount, // must be in kobo (5000 = ₦50)
      }),
    })

    const data: PaymentResponse = await res.json()

  if (!data.data) {
    console.error("Paystack error:", data.message);
    return;
  }
    const { access_code } = data.data

    // 👇 load Paystack only on the client
    const { default: PaystackPop } = await import("@paystack/inline-js")

    const popup = new PaystackPop()
    popup.resumeTransaction(access_code)
  } catch (err) {
    console.error("Payment error:", err)
  }
}

export default function PayButton({
  amount,
}: {
  amount: number
}) {
  const userSession = UserSession()
  const email = userSession?.user.email!
  const router = useRouter()

  return (
    <button
      className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
      onClick={() => {
        (userSession ? redirect({ email, amount }) : router.push("/login") )
      }}
    >
      Buy Now
    </button>
  )
}
