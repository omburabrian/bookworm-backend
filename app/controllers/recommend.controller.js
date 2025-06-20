//  A.I. API for generating book recommendations
//  ( This version of RECOMMENDations uses the cohere.com AI API. )
const { generateText } = require('../services/cohereClient.js');

const mockBookList = [
    {
        title: "Book One from backend",
        authors: [
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
        authors: [
            {
                name: "Doe2, John2"
            },
        ],
        description: "This is a science fiction story. from backend"
    },
    {
        title: "Book Three from backend",
        authors: [
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

    console.log('recommend.controller:askMe(prompt) = ' + prompt);
    console.log('about to generateText(prompt) . . . ');

    const response = await generateText(prompt);
    console.log(response);

    return response;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function stripJsonTags(aJsonString) {


    //  console.log('function stripJsonTags(aJsonString) { = ' + aJsonString);

    let openingBracketPosition = aJsonString.indexOf('[', 0);

    //  (*&^%$#@!!!!  Had extra .text. in here!)
    let closingBracketPosition = aJsonString.lastIndexOf(']');

    let returnString = aJsonString.slice(openingBracketPosition, closingBracketPosition + 1);

    //  console.log('function stripJsonTags() { returnString = ' + returnString);

    return returnString
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function getPromptWithBookTitleList(bookTitleList) {

    //  ToDo:  VERIY:  Assuming bookTitleList a JSON array of strings containing book titles

    // let prompt_first_half =
    //     'I need a list of book recommendations based on the following JSON array of book titles: ';

    let prompt_first_half =
        'Return a COMPLETE, RAW JSON array of book recommendations similar to the following JSON array of book titles, but not the same titles: ';
    // let prompt_second_half =
    //     ' The recommendation list needs to be a JSON array of book objects with these 3 attributes:'
    //     + 'title, authors, description.'
    //     + 'Each book\’s authors attribute is a nested JSON array of author objects with this attribute:'
    //     + 'name -- With the last name listed first, separated by a comma, followed by the rest of the name.';

    let prompt_second_half =
        //  ' The returned list should be a complete JSON array of book objects with these 3 attributes: '
        ' The returned list should be a complete, raw JSON array of book objects with these 3 attributes: '
        + ' title, authors, description. '
        + ' Each book\’s authors attribute is a JSON array of author objects with this attribute: '
        + ' name -- With the last name listed first, separated by a comma, followed by the rest of the name. '
        //  + ' Return only a raw JSON array, '
        //  + ' without any Markdown or code block indicators. '
//        + ' Do not include any Markdown or code block indicators. '
        + ' Do not include any Markdown or code block indicators '
        + ' like "```json" or "```". '
        //  It is STILL returning these markdown indicators.  Will have to strip them off each end, 'manually'.
        + ' Do not include any additional text, explanations, or descriptions outside the JSON array. '
        + ' Output strictly in JSON format. '
        // + ' Example format: '
        // + ' [{ '
        // + ' "title": "Book Title", '
        // + ' "authors": [{"name": "Lastname, Firstname"}], '
        // + ' "description": "Book description here." '
        // + ' }] '
        + ' Generate the JSON array now. ';

    /*
    only the JSON array without any Markdown or code block indicators.
    //  */

    let stringifiedJsonList = JSON.stringify(bookTitleList);

    let prompt =
        prompt_first_half
        + stringifiedJsonList
        + prompt_second_half;

    /*
    Example JSON list of book titles:
        [
            ‘The Cat in the Hat’,
            ‘Green Eggs and Ham’,
            ‘Are you my mother?’,
            ‘if you give a mouse a cookie’
        ]
    //  */

    return prompt;
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

    /*
        let returnJson = [
        {
            title: "Book One from backend",
            authors: [
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
            authors: [
                {
                    name: "Doe2, John2"
                },
            ],
            description: "This is a science fiction story. from backend"
        },
        {
            title: "Book Three from backend",
            authors: [
                {
                    name: "Doe3, John3"
                },
                {
                    name: "Peterman3, Jay3"
                },
            ],
            description: "This is an autobiography. from backend"
        },
    ];
    //  */


    //  /*
    let returnJson = [
        {
            "title": "Goodnight Moon",
            "authors": [
                {
                    "name": "Brown, Margaret Wise"
                }
            ],
            "description": "A classic bedtime story that gently says goodnight to everything around a little rabbit's room."
        },
        {
            "title": "Where the Wild Things Are",
            "authors": [
                {
                    "name": "Sendak, Maurice"
                }
            ],
            "description": "A beloved tale about a boy named Max who embarks on a magical adventure to an island filled with wild creatures."
        },
        {
            "title": "The Very Hungry Caterpillar",
            "authors": [
                {
                    "name": "Carle, Eric"
                }
            ],
            "description": "A colorful story about a caterpillar's journey as it eats its way through various foods before transforming into a butterfly."
        },
        {
            "title": "Corduroy",
            "authors": [
                {
                    "name": "Freeman, Don"
                }
            ],
            "description": "A heartwarming story about a teddy bear named Corduroy who lives in a department store and his search for a missing button."
        }
    ];
    //  */

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

    console.log('ask(req, res) -- About to . . . askMe() . . . ');

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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  Get book recommendations based on list of book titles
exports.getFromTitles = (req, res) => {

    const criteriaAttribute = req.params.criteriaAttribute;

    console.log(
        'getFromTitles(req.params.criteriaAttribute) = '
        + criteriaAttribute
    );


    //  The req.body.bookList will contain the criteria.
    //  recommendCriteriaJson.value.bookList

    console.log(req.body);
    console.log(req.body.bookList);

    //  TODO:  Does the titleList need to be transformed?
    //  Todo:  

    const prompt = getPromptWithBookTitleList(req.body.bookList);

    //  Testing @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##############################
    //  This prompt looks good on the console.log()
    // console.log('recommendation.controller:getFromTitles(req, res) : prompt = ' + prompt);
    // console.log('now askMe() . . . ')

    //  askMe(req.body.prompt)
    askMe(prompt)
        .then((data) => {

            //  Strip off the markdown indicators surrounding the JSON.
            //  The prompt won't do this for some reason.

            //  console.log('data = >>>\"' + data + '\"<<<');

            //  Add some space at the end.
            let temporaryString = data.slice() + '   ';
            //  console.log('temporaryString = >>>\"' + temporaryString + '\"<<<');

            let data4 = stripJsonTags(temporaryString);
            //  console.log('data4 = >>>\"' + data4 + '\"<<<');

            // let jsonTag_open = '```json';
            // let jsonTag_close = '```';
            // let data2 = '';
            // let jsonOnly = '';


            // if (data.slice(0, jsonTag_open.length) === jsonTag_open) {
            //     data2 = data.slice(jsonTag_open.length);
            // } else {
            //     data2 = data;
            // }

            // if (data2.slice(data2.length - jsonTag_close) === jsonTag_close) {
            //     data3 = data2.slice(0, data2.length - jsonTag_close.length);
            // } else {
            //     data3 = data2;
            // }

            //  res.send(data);
            res.send(data4);
        })
        .catch((anError) => {
            res.status(500).send({
                message:
                    anError.message || "Unknown error encountered",
            });
        });
};
