const express = require("express");

const { saveUser, updateUser, saveRecipe, getRecipes, saveEmotion, deleteRecipe } = require("./user.controller");

const userRouter = express.Router();

userRouter.put("/:id", updateUser);

userRouter.post("/emotionOfTheDay", saveEmotion);

userRouter.post("/googleAuth", saveUser);

userRouter.get("/myrecipes/:email", getRecipes);

userRouter.delete("/myrecipes/:id", deleteRecipe);

userRouter.post("/myrecipes/:id", saveRecipe);



module.exports = userRouter;