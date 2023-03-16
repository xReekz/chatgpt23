'use client' // THIS IS NECESSARY FOR US TO GET SERVER/CLIENT ACCESS ON COMPONENTS

import { collection, orderBy, query } from "firebase/firestore"
import { useSession, signOut } from "next-auth/react"
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from "../firebase"
import ChatRow from "./ChatRow"
import ModelSelection from "./ModelSelection"
import NewChat from "./NewChat"


function Sidebar() {

  //IF WE HAVE A SESSION RUNNING WE CAN ACCESS IT BY THE USESESSION HOOK
  // (data:session) is a way of renaming the const data variable, data contains the session info we need, there are two variables we can use which are data and state 
  const { data: session } = useSession();
 
  // Fetching Chat Rows and automatically ordering them, If we create a new chat it will be on the bottom and it will be the one highlighted, (dependencies: ChatRow)
  const [chats, loading, error] = useCollection(
    session && query(collection(db, 'users', session.user?.email!, 'chats'),
    orderBy('createdAt', 'asc')
  ))  

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* NewChat Button */}
          <NewChat />
          <div className="hidden sm:inline">
            {/* ModelSelection */}
            <ModelSelection />

          </div>

          <div className="flex flex-col space-y-2 my-2">

            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}

              {/* Map through the ChatRows */}
            {chats?.docs.map(chat => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session &&(
        // Here we're getting the users google profile pic(because we're only allowing users to login with a google account)
        // If needed we can add >>>{session.user?.image! || OUR DEFAULT PIC}<<< in case there's no active session
        <img
        onClick={() => signOut()} 
        className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" 
        src={session.user?.image!} alt="" /> 
      )}
    </div>
  )
}

export default Sidebar