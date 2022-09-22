const { User } = require('../../models');


const saveUser = async (req, res) => {
  // add today's date to the user's daily_info array
  const { user } = req.body;
  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      // if the user already exists, add today's date to the daily_info array 
      // check if the date already exists in the daily_info array and if it does not match the current date, add it to the array
      const today = existingUser.daily_info.find(info => info.date === new Date(Date.now()).toDateString());
      if (!today) {
        existingUser.daily_info.push({ date: new Date(Date.now()).toDateString() });
        await existingUser.save();
      }
      res.status(200).json(existingUser);
    } else {
      const newUser = await User.create( { ...user, daily_info: { date: new Date(Date.now()).toDateString() } });
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
  const { user } = req.body;
  const { id } = req.params;
  try {
    await User.findOneAndUpdate({ id }, user, { new: true });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json(error);
  }
};


const getRecipes = async (req, res) => {
// get the recipes in the recipesList array from the user
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    // checks if the user has any recipes in the recipeList array
    if (user.recipeList.length > 0) {
      res.status(200).json(user.recipeList);
    } else {
      res.status(200).json({ message: 'No recipes found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


const saveRecipe = async (req, res) => {
  const { recipe } = req.body;
  const { id } = req.params;

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
  const { id } = req.params;
  const { currentUser } = req.body;
  // console.log(currentUser);
  try {
    const user = await User.findOne({ _id: currentUser._id });
    // find the recipe in the recipeList array by id and remove it from the array 
    user.recipeList = user.recipeList.filter(recipe => recipe.id !== id);
    await user.save();
    res.status(200).json(user.recipeList);
  } catch (err) {
    console.log('failed to delete recipe', err);
    res.sendStatus(500);
  }
};



const saveEmotion = async (req, res) => {
  const { emotion } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    // find the daily_info object in the daily_info array that matches the current date 
    const today = user.daily_info.find(info => info.date === new Date(Date.now()).toDateString());
    // if the daily_info object exists, push the emotion object to the emotions array
    if (today) {
      today.emotions.push(emotion);
      await user.save();
      res.sendStatus(200);
    }
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


