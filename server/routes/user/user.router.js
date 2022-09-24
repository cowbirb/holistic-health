const express = require("express");

const {
  saveUser,
  updateUser,
  saveRecipe,
  getRecipes,
  saveEmotion,
  getEmotion,
  saveJournalEntry,
  deleteRecipe,
  updateMeditate,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/googleAuth", saveUser);

userRouter.put("/:id", updateUser);

userRouter.route("/:id/emotionOfTheDay").get(getEmotion).post(saveEmotion);

userRouter.route("/:id/journal").post(saveJournalEntry);

userRouter
  .route("/myrecipes/:id")
  .get(getRecipes)
  .post(saveRecipe)
  .delete(deleteRecipe);

userRouter.put("/meditate/:id", updateMeditate);

module.exports = userRouter;
