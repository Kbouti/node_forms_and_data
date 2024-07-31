// controllers/usersController.js
const asyncHandler = require("express-async-handler");
const usersStorage = require("../storages/usersStorage");

exports.usersCreateGet = asyncHandler(async (req, res) => {
  res.render("users", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
});

exports.usersCreatePost = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  usersStorage.addUser({firstName, lastName});
  res.redirect("/");
});
