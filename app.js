// app.js
const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter");
const usersStorage = require("./storages/usersStorage");


const path = require("path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

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


// *********************************************************************************************************************************************************************
// Notes in controllers/usercontroller.js
// *********************************************************************************************************************************************************************


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

// We've attempted to link stylesheet but css ruels don't seem to be applying on all views.
// I'm wondering if I should try to establish a template view and then extend other views on top of that:
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Template_primer

// read about pug layouts 8/11
// The question is why won't our style.css work in the users.ejs view???
// The div exists with the proper class applied. The head has a link to the stylesheet. I changed the path from "./style.css" (As it works in index.ejs) to "../public/style.css" as a direct file path. Still nothing

// CSS only works in index view