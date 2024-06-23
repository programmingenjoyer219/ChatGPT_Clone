"use client"
import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react"
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

export default function ChatInput({ chatId }) {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();
    // useSWR to get model
    const { data: model } = useSWR("model", { fallbackData: "gpt-3.5-turbo-16k" })

    async function sendMessage(e) {
        e.preventDefault();
        if (!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email,
                name: session?.user?.name,
                avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db, "users", session?.user?.email, "chats", chatId, "messages"), message);

        // Toast Notification -> loading
        const notification = toast.loading("ChatGPT is thinking...");

        await fetch("/api/askQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(() => {
            // Toast Notification -> successfull
            toast.success("ChatGPT has responded", { id: notification })
        }).catch((err) => {
            console.error(err);
        })
    }

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>
                <input disabled={!session} className="bg-transparent flex-1 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300" onChange={(e) => { setPrompt(e.target.value) }} type="text" placeholder='Type your message here...' value={prompt} />
                <button type='submit' disabled={!prompt || !session} className="bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                </button>
            </form>
            <div className="sm:hidden">
                <ModelSelection />
            </div>
        </div>
    )
}
