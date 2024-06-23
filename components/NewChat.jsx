import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";

export default function NewChat() {
    const router = useRouter();
    const { data: session } = useSession();

    async function createNewChat() {
        const doc = await addDoc(
            collection(db, "users", session.user.email, "chats"),
            {
                userId: session.user.email,
                createdAt: serverTimestamp(),
            }
        );

        router.push(`/chat/${doc.id}`);
    }

    return (
        <button
            title="New Chat"
            onClick={createNewChat}
            id="new-chat-button"
            className="transition-all duration-200 hover:bg-gray-700/50 rounded-md p-2"
        >
            <PencilSquareIcon className="h-6 w-6 text-gray-500 font-semibold" />
        </button>
    )
}
