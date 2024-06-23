import openai from "@/lib/chatgpt";
import { NextResponse } from "next/server";

export async function GET(request) {
    const models = await openai.models.list().then((res) => { return res.data });
    const modelOptions = models.map((model) => {
        return {
            value: model.id,
            label: model.id
        }
    })
    return NextResponse.json({ modelOptions });
}