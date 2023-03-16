// THIS IS WHERE AND HOW WE CREATE OUR API ENDPOINTS
// THE DATA COMES FROM THE ChatInput.tsx FILE

import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import query from '../../../lib/queryApi';
import { adminDb } from '../../../firebaseAdmin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    // This is after the request to our own API endpoint on ChatInput.tsx
    //The first thing we do is we strip out all the values that we passed through
    const { prompt, chatId, model, session } = req.body;

    // On these TWO conditions we are basically checking if the values we need have actually been populated
    if (!prompt) {
        res.status(400).json({ answer: "Please provide a prompt!"});
        return;
    }

    if (!chatId) {
        res.status(400).json({ answer: "Please provide a valid chat ID!"});
        return;
    }

    // THEN we -> ChatGPT Query
    const response = await query(prompt, chatId, model);

    // ChatGPT will the give us back an answer or a 'response' which packages it into a message
    const message: Message = {
      text: response || "ChatGPT was unable to find an answer for that!",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: 'ChatGPT',
        name: 'ChatGPT',
        avatar: 'https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png',
      }
    };

    // We then add the message from the ADMIN special previlege files we created, and add it into the firestore database 
    await adminDb.collection('users').doc(session?.user?.email).collection('chats').doc(chatId).collection('messages').add(message);

    // And then we return the answer in the form of text 
  res.status(200).json({ answer: message.text  })
}
