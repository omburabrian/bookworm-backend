module.exports = (app) => {

    //    const Review = require("../controllers/review.controller.js");
    const Recommend = require("../controllers/recommend.controller.js");

    //  TODO:  Add authenticated routes after testing without.
    //    const { authenticateRoute } = require("../authentication/authentication.js");

    var router = require("express").Router();

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //  PUBLIC ROUTES

    //  Test reaching the controller and returning a value.
    //  SUCCESS.
    router.get(
        "/recommend/testget",
        Recommend.get
    );

    //  Ask any question  ('question' = req.body.prompt)
    router.post(
        "/recommend/ask",
        Recommend.ask
    );

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    app.use("/bookwormapi", router);
};