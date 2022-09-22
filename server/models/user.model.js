const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
  picture: String,
  weight: Number,
  height: Number,
  age: Number,
  daily_info: [{
    date: String,
    emotions: [{
      emotion: String,
      emotion_summary: String,
      user_email: String,
      createdAt: String,
    }],
    journal_entries: [{
      title: String,
      body: String,
      user_email: String,
      createdAt: String,
      images: String,
    }],
    foods: [{
      calories: Number,
      fat: Number,
      carbs: Number,
      protein: Number,
    }],
    did_meditate: Boolean,
    did_workout: Boolean,
    meditate_length: Number,
    workout_length: Number,
  }],

  recipeList: [{
    label: String,
    image: String,
    ingredientLines: Array,
    calories: Number,
    fat: Number,
    carbs: Number,
    protein: Number,
    source: String,
    url: String,
    uri: String,
    servings: Number,
    user_email: String,
  }],

  saved_workouts: [{
    workout: String,
    set: Number,
    reps: Number,
  }],


});

module.exports = model('User', userSchema);



    
