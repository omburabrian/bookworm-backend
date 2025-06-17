const { CohereClientV2 } = require('cohere-ai');
//  import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

async function generateText(prompt) {
    const response = await cohere.generate({
        model: 'command',
        prompt: prompt,
        maxTokens: 50,
    });
    return response.body.generations[0].text;
}

module.exports = { generateText };
