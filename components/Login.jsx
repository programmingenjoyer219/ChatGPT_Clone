"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function Login() {
    return (
        <div className="bg-[#222222] h-screen flex flex-col items-center justify-center text-center space-y-4">
            <Image
                src={"/chat-gpt.png"}
                alt="Logo"
                height={150}
                width={150}
                className="rounded-full bg-[#88a788] p-2"
            />
            <button onClick={() => { signIn("google"); console.log("signIn button clicked") }} className="text-[#88a788] font-bold text-3xl animate-pulse">Sign in to use ChatGPT</button>
        </div>
    )
}
