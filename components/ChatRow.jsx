import { TrashIcon } from "@heroicons/react/24/outline"
import { collection, deleteDoc, doc, query, orderBy } from "firebase/firestore";
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
        session && query(collection(db, "users", session?.user?.email, "chats", id, "messages"), orderBy("createdAt", "asc"))
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
        <Link href={`/chat/${id}`} className={`font-medium w-[90%] px-4 py-2 flex items-center justify-between rounded-md transition-all duration-200 hover:bg-zinc-700/50 ${active && 'bg-zinc-700/50'}`}>
            <span className="text-[#eeeeee] truncate">
                {
                    messages?.docs[0]?.data().text.substring(0, 24) || "New Chat"
                }
            </span>
            <TrashIcon title="Delete Chat" onClick={removeChat} className="text-gray-500 h-5 w-5 hover:text-red-500" />
        </Link>
    )
}
