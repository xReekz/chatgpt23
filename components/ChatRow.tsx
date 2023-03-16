import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, query } from "firebase/firestore"
import { orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link"; //<Link></Link> These are React links, a default react component which allows us to iterate though multiple URL's 
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase"; // db allows us to query our firebase database

// This is really important to prevent a lot of bugs, always create unique emails 
type Props = {
    id: string;
}

// Here we are determining if the chat is active, if the chat layout of it and etc
const ChatRow = ({ id }: Props) => {

  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession(); // This is how we get the session 
  const [active, setActive] = useState(false);

  // Use Effect to check if we're active or not
  useEffect(() => {
    if(!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname] );

  const removeChat = async() => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace("/");
  }

  // Fetching the messages which is a call to useCollections, or a Query
  // const [messages] = useCollection(query(
  //   collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
  //   orderBy('createdAt', 'asc')
  // ));
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^THIS ALSO WORKS BUT HE CHOSE TO DO THIS SAME THING IN THE DideBar component
  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
  );

  return (
    <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && "bg-gray-700/50"}`} >
        
        <ChatBubbleLeftIcon className="h-5 w-5" /> 
        {/* The truncate tailwind class basically means that if the tag gets cut too short it will show literally a ... in its place */}
        {/* The messages variable condition we have below calls for the last text bit of the message being queried, and if there's none just show New Chat instead */}
        <p className="flex-1 hidden md:inline-flex truncate">{messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}</p>  
        <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-700 hover:text-red-700" />
    </Link>
  )
}

export default ChatRow