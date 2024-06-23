import genAI from "./chatgpt";

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function query(prompt, chatHistory) {
    let chat = model.startChat({
        history: chatHistory,
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });

    let res = await chat.sendMessage(prompt)
        .then(async (result) => {
            let response = await result.response;
            let text = response.text();
            return text;
        })
        .catch((error) => {
            return `ChatGPT was unable to find an answer. Error: ${error.message}`
        })

    return res;
}