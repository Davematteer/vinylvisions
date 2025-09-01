"use client"
import {useRouter} from "next/navigation";
import { authClient } from "./auth-client";

export async function SignOut(router:ReturnType<typeof import("next/navigation").useRouter>){

    await authClient.signOut({
        fetchOptions: {
        onSuccess: () => {
            router.push("/")
        },
    },
  });
}

export const SocialsignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

export function UserSession(){

    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 

    if (!session) return

    return session

    
}
