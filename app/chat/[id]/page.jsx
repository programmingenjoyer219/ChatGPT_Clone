import Chat from "@/components/Chat"
import ChatInput from "@/components/ChatInput"

export default function ChatPage({ params: { id } }) {
    return (
        <div id="chat-page" className='flex flex-col h-screen overflow-hidden'>
            <Chat chatId={id} />
            <ChatInput chatId={id} />
        </div>
    )
}
