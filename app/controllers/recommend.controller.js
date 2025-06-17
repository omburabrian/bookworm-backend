//  A.I. API for generating book recommendations
//  ( This version of RECOMMENDations uses the cohere.com AI API. )
const { generateText } = require('../services/cohereClient.js');

async function askMe(prompt) {

    //  This was successful:
    // return 'You got to the askMe() with this prompt: \"'
    //     + prompt + '\"';

    //  const prompt = "What is the capital of France?";
    const response = await generateText(prompt);
    console.log(response);

    return response;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  Test:  Ask any question and return the response.
exports.get = (req, res) => {
    res.send('You got the get... again.');
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  Test:  Ask any question and return the response.
exports.ask = (req, res) => {

    //  This was successful:
    //  res.send('You got the POST to ASK.');

    // Validate request
    if (req.body.prompt === undefined) {
        const error = new Error("No prompt provided");
        error.statusCode = 400;
        throw error;
    }

    //  The prompt was recieved and successfully sent as response:
    /*
    else {
        let myMessage = 'This was your prompt: \"';
        myMessage += req.body.prompt;
        myMessage += '\"';
        
        res.send(myMessage);
    }
    //  */


    console.log('About to . . . askMe() . . . ');

    //  TODO:   Add .then() to return the response.
    askMe(req.body.prompt)
        .then((data) => {
            res.send(data);
        })
        .catch((anError) => {
            res.status(500).send({
                message:
                    anError.message || "Unknown error encountered",
            });
        });
};
