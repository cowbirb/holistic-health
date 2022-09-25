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
  getJournalEntries,
  editJournalEntry,
  deleteJournalEntry,
  deleteRecipe,
  updateMeditate,
  updateWorkout,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/googleAuth", saveUser);

userRouter.put("/:id", updateUser);

userRouter.route("/:id/emotionOfTheDay").get(getEmotion).post(saveEmotion);

userRouter
  .route("/:id/journal")
  .get(getJournalEntries)
  .post(saveJournalEntry)
  .put(editJournalEntry)
  .delete(deleteJournalEntry);


userRouter
.route("/myrecipes/:id")
.get(getRecipes)
.post(saveRecipe)
.delete(deleteRecipe);

userRouter.put("/meditate/:id", updateMeditate);

userRouter
.route('/exercise/:email')
.put(updateWorkout)
.get(getUser);

module.exports = userRouter;
