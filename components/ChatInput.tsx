'use client'

import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { toast } from "react-hot-toast"
import { db } from '../firebase'
import useSWR from 'swr';
import ModelSelection from './ModelSelection'

type Props = {
      chatId: string;
}

const ChatInput = ({ chatId }: Props ) => {
    const [prompt, setPrompt] = useState("")
    const { data: session } = useSession()

    const { data: model } = useSWR('model', {
        fallbackData: 'text-davinci-003'
    })

    // Sneding the messages to the firebase db // THIS BELOW IS A TYPESCRIPT TRICK 
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!prompt) return;

        // This gets rid of any white SparklesIcon, white spaces can be troublesome
        const input = prompt.trim();
        setPrompt("");

        // "Message" is a Custom Type Definition that we created on the file "typings.d.ts"
        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`, //THIS IS HOW WE SIMPLY GET THE USER'S INITIALS IN CASE THEY DO NOT HAVE A PROFILE IMAGE
            }
        }

        // Adding doc to the firebase database FROM the client, 'message' is the 'message' const we created above
        // We usually pass the message below as an object but we have created that same object right above which is an Custom Type Definition 
        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), 
        message)

        // Toast notification to say 'loading'
        const notification = toast.loading('ChatGPT is thinking...');

        //Here the CLIENT queries our own API, aka we make a request to our API (our api is the askQuestion.ts endpoint file we created)
        await fetch('/api/auth/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session,
            }),
        }).then(() => {
            // Toast notification to say 'Successful'
            toast.success('ChatGPT has responded!', {
                id: notification,  
            })
        })
    };

  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm' >
        <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>
            <input 
                className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
                disabled={!session}
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                type="text" 
                placeholder='Type your message here...'
            />
            <button disabled={!prompt || !session} 
                    type='submit' 
                    className='bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed'>

                <PaperAirplaneIcon className='h-4 w-4 -rotate-45' /> 
            </button>
        </form>

        <div className='md:hidden'>
            {/* ModelSelection */}
            <ModelSelection /> 
        </div>
    </div>
  )
}

export default ChatInput
