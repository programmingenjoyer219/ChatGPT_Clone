"use client"
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

export default function Chat({ chatId }) {
    const { data: session } = useSession();
    const [messages] = useCollection(
        session && query(collection(db, "users", session?.user?.email, "chats", chatId, "messages"), orderBy("createdAt", "asc"))
    );

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {
                messages?.empty && (
                    <>
                        <p className="mt-10 text-center text-white">Type a prompt to get started</p>
                        <ArrowDownCircleIcon className="h-10 w-10 my-4 mx-auto text-white animate-bounce" />
                    </>
                )
            }

            {
                messages?.docs.map((message) => {
                    return <Message key={message.id} message={message.data()} profile={session?.user?.email} />
                })
            }
        </div>
    )
}
