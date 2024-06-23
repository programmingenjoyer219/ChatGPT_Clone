import openai from "./chatgpt";

export default async function query(prompt, model) {
    const res = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "system", content: prompt }],
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
        .then((res) => { return res.choices[0].message.content })
        .catch((error) => {
            return `ChatGPT was unable to find an answer. Error: ${error.message}`
        })

    return res;
}