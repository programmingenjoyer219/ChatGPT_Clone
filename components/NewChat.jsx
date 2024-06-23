import { PlusIcon } from "@heroicons/react/24/solid";
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
        <div onClick={createNewChat} className="border border-gray-700 chatRow">
            <PlusIcon className="h-4 w-4" />
            <span>New Chat</span>
        </div>
    )
}
