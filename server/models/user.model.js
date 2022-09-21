const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
    picture: String,
    weight: Number,
    height: Number,
    age: Number,
    emotions: [{
        emotion: String,
        journalEntry: String,
        user_email: String,
        createdAt: String,
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
    blogList: [{
        title: String,
        body: String,
        user_email: String,
    }],

});

module.exports = model('User', userSchema);



    