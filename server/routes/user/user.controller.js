const { User } = require('../../models');


const saveUser = async (req, res) => {
    const { user } = req.body;
    try {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          res.json(existingUser);
        } else {
          const newUser = await User.create(user);
          res.json(newUser);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};


const updateUser = async (req, res) => {
    const { params: {id}, body: {user} } = req;
    try {
        await User.findOneAndUpdate({ id }, user, { new: true });
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json(error);
    }
};


const getRecipes = async (req, res) => {
// get the recipes in the recipesList array from the user
    const { params: {email} } = req;
    try {
        const user = await User.findOne({ email });
        // checks if the user has any recipes in the recipeList array
        if (user.recipeList.length > 0) {
            res.status(200).json(user.recipeList);
        } else {
            res.status(200).json({ message: "No recipes found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


const saveRecipe = async (req, res) => {
  const { params: {id}, body: {recipe} } = req;

    try {
        const user = await User.findOne({ _id: id });
        user.recipeList.push(recipe);
        await user.save();
        // send the saved recipe back to the client
        res.status(201).send(recipe);
    } catch (err) {
        console.log('could not save recipe', err);
        res.sendStatus(500);
    }
};

const deleteRecipe = async (req, res) => {
    const { params: {id}, body: {currentUser} } = req.params;

    try {
        const user = await User.findOne({ _id: currentUser._id });
// find the recipe in the recipeList array by id and remove it from the array 
        user.recipeList = user.recipeList.filter(recipe => recipe.id !== id);
        await user.save();
        res.status(200).json(user.recipeList);
    } catch (err) {
        console.log("failed to delete recipe",err);
        res.sendStatus(500);
    }
};



const saveEmotion = async (req, res) => {
    const { emotion } = req.body;
    try {
        const user = await User.findOne({ email: emotion.userEmail });
        user.emotions.push(emotion);
        await user.save();
        res.sendStatus(201);
    } catch (err) {
        console.log('could not save emotion', err);
        res.sendStatus(500);
    }
};


module.exports = {
    saveUser,
    getUser,
    getRecipes,
    saveRecipe,
    deleteRecipe,
    saveEmotion,
    updateUser
};


