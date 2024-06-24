"use client"
import { db } from "@/firebase";
import { PaperAirplaneIcon, ArrowUpCircleIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp, query, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react"
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import { useCollection } from "react-firebase-hooks/firestore";

export default function ChatInput({ chatId }) {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();
    const [messages] = useCollection(
        session && query(collection(db, "users", session?.user?.email, "chats", chatId, "messages"), orderBy("createdAt", "asc"))
    );

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

        // data.text.user._id = "ChatGPT" ---> role: "model"

        // let modData = {
        //     role: "user",
        //     parts: [{ text: data.text.text }],
        // }

        // setup chatHistory
        let chatHistory = messages?.docs.map((message) => {
            let data = message.data()
            let modData = {
                role: data.user._id === "ChatGPT" ? "model" : "user",
                parts: [{ text: data.text }],
            }
            return modData;
        });

        // Toast Notification -> loading
        const notification = toast.loading("ChatGPT is thinking...");

        await fetch("/api/askQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: input, chatId, session, chatHistory
            })
        }).then(() => {
            toast.success("ChatGPT has responded", { id: notification })
        }).catch((err) => {
            console.error(err);
        })
    }

    return (
        <form onSubmit={sendMessage} className='p-2 my-4 bg-zinc-700 space-x-4 rounded-full mx-4 flex'>
            <input disabled={!session} className="bg-transparent text-white flex-1 pl-2 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300" onChange={(e) => { setPrompt(e.target.value) }} type="text" placeholder='Message ChatGPT' value={prompt} />
            <button type='submit' disabled={!prompt || !session} className="hover:opacity-50 text-white font-bold rounded disabled:text-gray-300 disabled:cursor-not-allowed">
                <ArrowUpCircleIcon className="h-8 w-8" />
            </button>
        </form>
    )
}
