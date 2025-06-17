const { CohereClientV2 } = require('cohere-ai');
//  import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

async function generateText(prompt) {

    //  This was successful:
    //  return 'cohereClient.js: async function generateText(prompt) {';

    //  The prompt is still good at this point:
    // console.log('generteText(prompt) = ');
    // console.log(prompt);
    // console.log(' . . . ');

    //  This returned a response.body = 1;
    const response = await cohere.generate({
        model: 'command',
        prompt: prompt,
        //  maxTokens: 50,
        maxTokens: 1000,
        temperature: 0.2, // Low temperature for deterministic output
    });

    //  This worked.  But tells me there is no BODY in the response.
    //  return response;
    //  return response.body;
    return response.generations[0].text;
}

module.exports = { generateText };
