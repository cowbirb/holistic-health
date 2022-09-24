const express = require("express");

const {
  saveUser,
  getUser,
  updateUser,
  saveRecipe,
  getRecipes,
  saveEmotion,
  getEmotion,
  saveJournalEntry,
  deleteRecipe,
  updateMeditate,
  updateWorkout,
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

userRouter.put('/exercise/:email', updateWorkout);

userRouter.get('/:id', getUser);

module.exports = userRouter;
