// app.js
const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter");
const usersStorage = require("./storages/usersStorage");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRouter);
app.get("/", (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));




// Assignment: 
// Add user details
// Expand the User model we created to include more details. Implement the following fields and validations to your model:
//     Email (required, must be formatted properly)
//     Age (optional, must be a number between 18 and 120)
//     Bio (optional, maximum 200 characters)
// Don’t forget to update the view to display these new fields!

// I've added fields for the new information on the form view, but we haven't altered the user model yet. Still much work to do
// Need to also display the new user info, and add fields to update form
// And validate those fields
// Also populate placeholder values in update form

// Also we should probably link a stylesheet so we can organize our form fields in a less confusing way....