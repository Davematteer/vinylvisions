"use client"

import { useRouter } from "next/navigation"
import { UserSession } from "./authMethods"
import { Wallet } from "lucide-react"
import { toast } from "sonner"

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

export async function checkoutredirect({ email, amount }: { email: string; amount: number }): Promise<string> {
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
      return "error";
    }

    const { access_code } = data.data
    
    // Load Paystack only on the client
    const { default: PaystackPop } = await import("@paystack/inline-js")
    const popup = new PaystackPop()
    
    // Wrap in a Promise to handle the async callbacks
    return new Promise((resolve) => {
      popup.resumeTransaction(access_code, {
        onSuccess: (transaction) => {
          console.log('Payment completed:', transaction)
          toast.success('Payment successful! Verifying...')
          resolve("success") // Resolve the Promise with "success"
        },
        
        onCancel: () => {
          console.log('Payment cancelled by user')
          toast.error('Payment was cancelled')
          resolve("cancelled") // Resolve with "cancelled"
        },
        
        onError: (error) => {
          console.error('Payment error:', error)
          toast.error('Payment failed. Please try again.')
          resolve("error") // Resolve with "error"
        }
      })
    })
    
  } catch (err) {
    console.error("Payment error:", err)
    toast.error('Payment initialization failed')
    return "error"
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
      className="flex flex-row gap-2 justify-center bg-black text-white py-3 rounded-lg hover:bg-gray-800"
      onClick={() => {
        (userSession ? redirect({ email, amount }) : router.push("/login") )
      }}
    >
      Buy Now <Wallet className="font-extralight text-white text-sm"/>
    </button>
  )
}
