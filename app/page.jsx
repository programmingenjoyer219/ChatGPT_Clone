import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Home() {
  return (
    <div id='home-page' className='flex flex-col space-y-4 items-center justify-center min-h-screen text-white px-2'>
      <h1 className='font-bold text-zinc-500 text-5xl'>ChatGPT</h1>
      <Image
        src={"/chat-gpt.png"}
        alt='logo'
        height={100}
        width={100}
        className='rounded-full bg-[#88a788] p-2'
      />
      <h3 className='font-semibold text-zinc-500 text-2xl text-center'>Create a new chat to start using our flagship AI</h3>
    </div>
  )
}
