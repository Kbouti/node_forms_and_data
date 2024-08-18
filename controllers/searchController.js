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

    res.render("../views/searchResults");
    // res.redirect("/");
  }),
];
