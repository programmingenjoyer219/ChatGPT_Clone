import DOMPurify from 'dompurify';

function convertToHtml(text) {
    // Convert **bold** to <strong>
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert *italic* to <em>
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert newlines to <br> tags
    html = html.replace(/\n/g, '<br>');

    return html;
}

export default function Message({ message, profile }) {
    const isChatGpt = message.user.name == "ChatGPT";
    const createMarkup = (html) => {
        return { __html: DOMPurify.sanitize(html) };
    };
    return (
        <div className={`py-5 text-white px-4`}>
            <div className={`flex space-x-5 p-6 rounded-3xl max-w-2xl mx-auto ${!isChatGpt && "bg-zinc-700"}`}>
                <img src={!isChatGpt ? `https://ui-avatars.com/api/?name=${profile.split("@")[0]}&background=88a788&color=1e1e1e` : "/chat-gpt.png"} alt="" className='h-8 w-8 rounded-full bg-zinc-700 p-1' />
                <p className='pt-1 text-md' dangerouslySetInnerHTML={createMarkup(convertToHtml(message.text))}></p>
            </div>
        </div>
    )
}
