const { Router } = require("express");
const searchController = require("../controllers/searchController")
const searchRouter = Router();


searchRouter.get("/", searchController.searchGet)
searchRouter.post("/", searchController.searchPost)

module.exports = searchRouter;