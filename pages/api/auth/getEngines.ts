import type { NextApiRequest, NextApiResponse } from "next";
import openai from "../../../lib/chatgpt";

// This type ONTIONS is what we end up return in the select field
type Option = {
    value: string;
    label: string;
}

// And this is the return type, what we are doing here is returning a modelOptions type, this array receives a key - value pair which is stored in the array
type Data = {
    modelOptions: Option[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Here we're making a call to openAi telling it to list all the models and we're simnply passing the data from it 
    const models = await openai.listModels().then((res) => res.data.data);

    const modelOptions = models.map((model) => ({
        value: model.id,
        label: model.id,
    }));
    
    // Here we are returning the results in a response 
    res.status(200).json({
        modelOptions,
    })
}