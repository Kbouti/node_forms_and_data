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

  // Here we need to validate our new fields
  body("email").trim().isEmail().withMessage(`Email ${emailErr}`),

  body("age").trim().isNumeric({min: 1, max: 120}).withMessage(`Age ${ageRangeErr}`),
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
    const { firstName, lastName } = req.body;
    usersStorage.addUser({ firstName, lastName });
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
    const { firstName, lastName } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect("/");
  }),
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = asyncHandler(async (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
});
