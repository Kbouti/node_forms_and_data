// controllers/usersController.js
const asyncHandler = require("express-async-handler");
const usersStorage = require("../storages/usersStorage");

// Required to apply form validation:
const { body, validationResult } = require("express-validator");


exports.searchGet = [
    asyncHandler(async (req, res) => {
        console.log(`Search get activated`)
    })
];




exports.searchPost = [
    asyncHandler(async (req, res) => {
        console.log(`Search post activated`)
        // FUUUUUCK YEEEAHHH 
        // This runs when we submit our search form. Next step, access the search term from the request
        
    })
];