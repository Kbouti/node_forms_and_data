// routes/usersRouter.js
const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);

// Add router for update paths:
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);

// Add router for delete path:
usersRouter.post("/:id/delete", usersController.usersDeletePost);


// Add router for search function:
usersRouter.get("/search", usersController.usersSearchGet);
usersRouter.post("/search", usersController.usersSearchPost);



module.exports = usersRouter;
