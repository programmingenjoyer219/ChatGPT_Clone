"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function Login() {
    return (
        <div className="bg-[#11a37f] h-screen flex flex-col items-center justify-center text-center space-y-4">
            <Image
                src={"/chat-gpt.png"}
                alt="Logo"
                height={150}
                width={150}
            />
            <button onClick={() => { signIn("google"); console.log("signIn button clicked") }} className="text-white font-bold text-3xl animate-pulse">Sign in to use ChatGPT</button>
        </div>
    )
}
