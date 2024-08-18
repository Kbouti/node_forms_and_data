// controllers/usersController.js
const asyncHandler = require("express-async-handler");
const usersStorage = require("../storages/usersStorage");

// Required to apply form validation:
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const emailErr = "Must enter a valid email";

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

  body("email")
    .trim()
    .isEmail()
    .optional({ values: "falsy" })
    .withMessage(`Email ${emailErr}`),

  body("age")
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage(`Age must be a number`)
    .isFloat({ min: 18, max: 120 })
    .withMessage(ageRangeErr),

  body("bio").escape().isLength({max: 200}).withMessage("Can't be longer than 200 characters"),
  // We use escape here but I'm not certain it's necessary..... But anyway, the purpose is to sanitize user entry. Redundancy can't hurt.
  // (Apparently the <%= %> syntax also sanitizes)
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
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  }),
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = asyncHandler(async (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
});


