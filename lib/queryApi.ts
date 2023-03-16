import openai from './chatgpt'

const query = async (prompt: string, chatId: string, model: string) => {
    //HERE WE COULD MAKE A CALL TO GET ALL THE PREVIOWS ANSWER FORM THE CHAT, UP TO US TO IMPLEMENT SAID FEATURE
    

    // THIS IS WHERE WE PASS WHAT THE USER TYPED IN, WE'RE MAKING A REQUEST TO THE CHATGPT API - AKA - A COMPLETION
    const res = await openai
    .createCompletion({
        model,
        prompt,
        // TEMPERATURE DETERMINES LOGICAL OR CREATIVE ANSWERS - I BELIEVE IT GOES FROM 0 TO 1 0 BEING LOGICAL AND DIRECT WHILE 1 BEING CREATIVE
        temperature: 0.9,
        // THIS VALUE WORKED ALONGSIDE TEMPERATURE GIVES US DIFFERENT TYPES OF ANSWERS
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
        (err) => 
            `ChatGPT was unable to find an answer for that! (Error: ${err.message})`); // HERE THE BOT GIVES US MANY ANSWERS AND BY CHOSING THE [0] POSITION WE ARE TAKING THE FIRST ONE 

    return res;
};

export default query;