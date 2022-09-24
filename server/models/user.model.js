const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
  picture: String,
  weight: String,
  height: String,
  age: String,
  sex: String,
  default_timer: {
    type: Number,
    default: 600,
  },
  daily_info: [{
    date: String,
    emotions: [{
      emotion: String,
      emotion_summary: String,
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
    did_meditate:{ 
      type:Boolean,
      default:false
    },
    did_workout: {
      type:Boolean,
      default:false
    },
    meditate_length: {
      type: Number,
      default: 0
    },
    workout_length: {
      type: Number,
      default: 0
    },
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
    set: String,
    reps: String,
  }],
});

module.exports = model('User', userSchema);



    
