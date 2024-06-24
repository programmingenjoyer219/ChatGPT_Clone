"use client"
import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import ChatRow from "./ChatRow";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import SidebarToggle from "./SidebarToggle";
import { useState } from "react";

export default function SideBar() {
    const [active, setActive] = useState(true);
    const { data: session } = useSession();
    const [chats, loading, error] = useCollection(
        session && query(collection(db, "users", session.user?.email, "chats"), orderBy("createdAt", "asc"))
    );

    function handleToggle() {
        setActive(a => !a);
    }
    return (
        <>
            <SidebarToggle handleToggle={handleToggle} />
            <div id="sidebar" className={`bg-[#1e1e1e] ${!active && 'translate-x-[-100%]'} w-[280px] z-[10] absolute flex flex-col h-screen transition-all duration-300 ease-out`}>

                <div id="sidebar-button-container" className="flex items-center justify-center p-4">
                    <NewChat />
                </div>

                <div
                    id="chat-history"
                    className="flex flex-col space-y-4 items-center w-full"
                >
                    {
                        loading && (
                            <div className="animate-pulse text-center text-white">
                                <p>Loading chats...</p>
                            </div>
                        )
                    }

                    {
                        chats?.docs.map(chat => {
                            return <ChatRow key={chat.id} id={chat.id} />
                        })
                    }
                </div>

                {session &&
                    <div
                        id="user-info"
                        className="flex items-center gap-4 p-4 absolute bottom-0 left-0 w-[280px]"
                    >
                        <img onClick={() => { signOut() }} title="Logout" className="rounded-full cursor-pointer h-10 w-10 hover:opacity-50 transition-all duration-200" src={`https://ui-avatars.com/api/?name=${session?.user?.email.split("@")[0]}&background=88a788&color=1e1e1e`} alt="Profile picture" />
                        <span id="user-name" className="text-[#eeeeee] text-sm">{session?.user?.email.split("@")[0]}</span>
                    </div>
                }
            </div>
        </>
    )
}
