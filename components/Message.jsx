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

export default function Message({ message }) {
    const isChatGpt = message.user.name == "ChatGPT";
    const createMarkup = (html) => {
        return { __html: DOMPurify.sanitize(html) };
    };
    return (
        <div className={`py-5 text-white ${isChatGpt && "bg-[#434654]"}`}>
            <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
                <img src={message.user.avatar} alt="" className='h-8 w-8' />
                <p className='pt-1 text-sm' dangerouslySetInnerHTML={createMarkup(convertToHtml(message.text))}></p>
            </div>
        </div>
    )
}
