//  A.I. API for generating book recommendations
//  ( This version of RECOMMENDations uses the cohere.com AI API. )
const { generateText } = require('../services/cohereClient.js');

const mockBookList = [
    {
        title: "Book One from backend",
        author: [
            {
                name: "Doe, John"
            },
            {
                name: "Peterman, Jay"
            }
        ],
        description: "This is a mystery. from backend"
    },
    {
        title: "Book Two from backend",
        author: [
            {
                name: "Doe2, John2"
            },
        ],
        description: "This is a science fiction story. from backend"
    },
    {
        title: "Book Three from backend",
        author: [
            {
                name: "Doe3, John3"
            },
            {
                name: "Peterman3, Jay3"
            },
        ],
        description: "This is an autobigraphy. from backend"
    },
];



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


    //  Will axios automatically stringify this, etc.?
    //  res.send(mockBookList.value);


    /*

    //  Create a mock return value:  generations[0].text
    let returnJson = {
        generations: [
            {
                text: "Well, what do we have here?!"
            },
        ],
    };
    //  */


    let returnJson = [
    {
        title: "Book One from backend",
        author: [
            {
                name: "Doe, John"
            },
            {
                name: "Peterman, Jay"
            }
        ],
        description: "This is a mystery. from backend"
    },
    {
        title: "Book Two from backend",
        author: [
            {
                name: "Doe2, John2"
            },
        ],
        description: "This is a science fiction story. from backend"
    },
    {
        title: "Book Three from backend",
        author: [
            {
                name: "Doe3, John3"
            },
            {
                name: "Peterman3, Jay3"
            },
        ],
        description: "This is an autobigraphy. from backend"
    },
];


res.send(returnJson);


    //  res.send(JSON.stringify(returnJson));

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
