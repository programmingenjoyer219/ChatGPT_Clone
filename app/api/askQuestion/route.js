import { NextResponse } from "next/server";
import query from "@/lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";

export async function POST(request) {
    const { prompt, chatId, session, chatHistory } = await request.json();

    if (!prompt) {
        return new Response(JSON.stringify({ error: 'Please provide a prompt' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!chatId) {
        return new Response(JSON.stringify({ error: 'Please provide a valid chatId' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // ChatGPT query
    const response = await query(prompt, chatHistory);

    const message = {
        text: response || "ChatGPT could not find an answer",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "/chat-gpt.png"
        }
    }

    await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(message);

    return NextResponse.json({ answer: message.text })
}