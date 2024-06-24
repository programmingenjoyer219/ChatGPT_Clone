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
            <button onClick={() => { signIn("google"); console.log("signIn button clicked") }} className="text-[#88a788] border border-[#88a788] font-bold text-2xl py-2 px-3 rounded-md transition-all duration-200 ease-out hover:bg-[#88a788] hover:text-white active:opacity-75">Sign in to use ChatGPT</button>
        </div>
    )
}
