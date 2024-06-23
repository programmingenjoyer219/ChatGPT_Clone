import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";

export default function ChatRow({ id }) {
    const pathName = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    const [messages, loading, error] = useCollection(
        collection(db, "users", session?.user?.email, "chats", id, "messages"),
    );

    useEffect(() => {
        if (!pathName) return;
        setActive(pathName.includes(id));
    }, [pathName])

    async function removeChat() {
        await deleteDoc(doc(db, "users", session?.user?.email, "chats", id));
        router.replace("/");
    }

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}>
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span className="flex-1 hidden md:inline-flex truncate">
                {
                    messages?.docs[0]?.data().text || "New Chat"
                }
            </span>
            <TrashIcon onClick={removeChat} className="text-gray-700 h-5 w-5 hover:text-red-500" />
        </Link>
    )
}
