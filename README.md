# HolisticYou
Holistic approach to a fitness tracker

# Description
Introducing HolisticYou. 

HolisticYou keeps track of not only your physical habits, but also your mental and emotional patterns and practices, and aims to show you a representation of You, in this moment.

LOGIN: When the user logs in they are presented with the option to write down a quick note about their personal thoughts, how they are feeling physically or emotionally or anything they want to take note of. They also can select an emoji, representing their mood. This data is kept in the db to refer to later.

HOME PAGE: The home page gives a brief overview of the different sections of the site. There is a carousel cycling through motivational quotes.

JOURNAL: The journal page is designed to create a safe place for the user to share their thoughts and feeling. Past entries are listed by date and time, and can be edited or deleted.

EXERCISES: User is presented with past workouts. User can compare his/her progress. There is a section to enter new workouts, with the name of the exercise, the amount of weight lifted, the amount of sets and reps. User can delete workouts.

MEALS: A recipe search app that allow users to search keywords of ingredients or even specific diet. The app will generate a list of recipes according to your search. Each recipe in the search feed will display the calories per serving and the macronutrients(fat, carbs, protein) so the user can make a healthy decision. The user can signup and make a profile to start saving recipes that you've searched. In the profile, users can input their information that would be calculated to retrieve their daily calorie intake. Users can also log recipes that they've saved and the calorie calculator will deduct the calories from the logged recipe from their calorie count. This takes the guess work out of knowing how much to eat in a day. 

MEDITATE: When you land on the meditation page, you are invited to use the meditation timer, which has a default value of ten minutes. You can increment the timer by five minutes, up to 30 minutes. If you have used the timer before, HolisticYou saves your last completed meditation as your personal default starting value. You also can choose to use one of the provided mantras to focus your attention on. When the timer is up a simple thank you will render for 15 seconds, giving you time to gently make the transition out of your meditation, while a record of your meditation ( the fact that you did it, and also for how long is saved in the database. The timer is reset to your new default time. 

If you prefer, you can choose to do a guided meditation.

PROFILE: When you go to the profile, users are presented with a visual representation of information gathered by the app regarding their mood and activity on days with a given mood and in total. This allows users to get an idea of how much activity they do in general and how much activity is done when in a certain mood.
The ten most popular guided meditations on YouTube are automatically loaded. If none of those appeal to you, you can load the next ten.



# Application 
Wellness/Health

# Tech Stack
1. Express
2. Mongo/Mongoose
3. AWS
4. React
5. Auth0
6. Material-UI
7. Axios
8. Chart.js

# API 
https://developer.edamam.com/edamam-docs-recipe-api
Sign up for API Key using the above link.

# MongoDb Cloud Atlas
https://www.mongodb.com/basics/mongodb-atlas-tutorial

# AWS
For Linux users: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html
For Windows users: https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/EC2_GetStarted.html

# Installation and Start-up
## Server/initial Setup
1. Fork cowbirb/holistic-health repo
2. Clone your forced repo to your local system
3. Run npm install to install dependencies
4. Create a .env file in your main directory.
5. Compile your files to create bundle.
6. Start the server

## ADD TO YOUR .ENV
1. the DB_Connect variable is assigned to your database connection string including your credentials and database name.
2. the RECIPES_API_KEY and API_ID are for the edamam recipe search api
3. Our application uses auth0, The last two variables in the .env example are for the domain key and client id which auth0 provides after you set up your application. Keep in mind when setting up auth0 that this is a single page react application.
https://auth0.com/docs/quickstart/spa/react/interactive this link will help getting auth0 setup for this project.
