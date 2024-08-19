// controllers/usersController.js
const asyncHandler = require("express-async-handler");
const usersStorage = require("../storages/usersStorage");

// Required to apply form validation:
const { body, validationResult } = require("express-validator");

exports.searchGet = [
  asyncHandler(async (req, res) => {
    console.log(`Search get activated`);
  }),
];

exports.searchPost = [
  asyncHandler(async (req, res) => {
    const searchTerm = req.body.search;

    console.log(`Search post activated. Search term: ${searchTerm}`);

    // Next we need to access storage?
    // We have user storage imported already.....

// Ok this works to render a list of search results but I'm not sure we're utilizing the get and post requesets like we're supposed to. 
// I think what we want to do is......
// Create a middleware function that takes the searchTerm and the users data and outputs the data we want. 
// Then process a get request to render a view based on the search. 
// Nahhh I think we're good. With users we used a get request to get the form, then post request from the form to update our data. 
// In this case I've placed the search form on the home page, so all we need is the post request that gets results and renders a new view. 
// Moving on......

    res.render("../views/searchResults", {searchTerm, users: usersStorage.getUsers()});
    // res.redirect("/");
  }),
];
