// app.js
const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter");
const usersStorage = require("./storages/usersStorage");

const searchRouter = require("./routes/searchRouter");


const path = require("path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRouter);
app.use("/search", searchRouter);

app.get("/", (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));




// log reading

// Log reading

// Vacation commit 