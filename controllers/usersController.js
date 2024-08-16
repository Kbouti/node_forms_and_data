// controllers/usersController.js
const asyncHandler = require("express-async-handler");
const usersStorage = require("../storages/usersStorage");

// Required to apply form validation:
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const emailErr = "Must enter a valid email";
// Nice! We've validated our email

const ageRangeErr = "Must be between 18 and 120";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),

  // *********************************************************************************************************************************************************************

  // Here we need to validate (and sanitize?) our new fields
  // we've made both email and age optional with .optional()

  body("email").trim().isEmail().optional({values: "falsy"}).withMessage(`Email ${emailErr}`),

  body("age").trim().optional({values: "falsy"}).isNumeric({min: 1, max: 120}).withMessage(`Age ${ageRangeErr}`),
  // We're not sure if we've gotten the age check to work. I've gotten the message but I've also submitted with age -1. 
  // Good next step would be to output new data on home page so we can see what's happening. 

// Another good step would be to populate user info on the edit form, so you don't have to fill it all in again. 

// *********************************************************************************************************************************************************************

body("bio").trim()
// *********************************************************************************************************************************************************************
// Is this "trim()" call the reason I was having so much trouble getting the bioi to save?? I', not sure.... reading up on validation and sanitization. 
// *********************************************************************************************************************************************************************




];

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("users", {
        title: "User List",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  }),
];

exports.usersCreateGet = asyncHandler(async (req, res) => {
  res.render("users", {
    title: "Create User",
    users: usersStorage.getUsers(),
  });
});

exports.usersUpdateGet = asyncHandler(async (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("update", { title: "Update User", user, errors: [] });
});

exports.usersUpdatePost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("update", {
        errors: errors.array(),
        user: user,
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
    res.redirect("/");
  }),
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = asyncHandler(async (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
});
