'use client'

import { PlusIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"; //MUST BE USED IN NEXT 13 AND UP
import { db } from "../firebase";


function NewChat() {
  const {data: session} = useSession();
  const router = useRouter();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats'), 
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp()
      }
    );

    router.push(`/chat/${doc.id}`); // this is where we are redirected to whenever we create new chat, this is called DYNAMIC ROUTES, /chat/'a random id'
  }

  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow" >
        <PlusIcon className="h-4 w-4" />
        <p>New Chat</p>
    </div>
  )
}

export default NewChat