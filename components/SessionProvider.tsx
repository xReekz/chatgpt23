// THIS IS THE WAY OF GETTING A SESSION (LOGIN) FROM NEXT.JS 13 AND UP 
'use client'
import { Session } from "next-auth"
import { SessionProvider as Provider } from 'next-auth/react'

type Props = {
    children: React.ReactNode;
    session: Session | null;
}

export function SessionProvider({ children, session }: Props) {
    return (
        <Provider>
            {/* children represents whatever is inside the SessionProvider tags, in this cases we can see what's inside in the layout.tsx file */}
            {children} 
        </Provider>
    )
}