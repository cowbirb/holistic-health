const path = require('path');
const express = require('express');
const { Users, saveRecipe, SavedRecipe } = require('./db/index.js');
const { default: axios } = require('axios');

const RECIPES_API_KEY = process.env.RECIPES_API_KEY;
const RECIPES_API_ID = process.env.RECIPES_API_ID;

const port = 3000;

const distPath = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));

app.post('/user', (req, res) => {
  const {body: {user: {name, email, picture}}} = req;
  const newUser = {name, email, picture};
  Users.updateOne({email}, newUser, {upsert: true})
  .then(({modifiedCount}) => {
    if ({modifiedCount}) {
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(() => res.sendStatus(500))
})

app.post('/search/save', (req, res) => {
  const recipe = req.body;

  saveRecipe(recipe)
    .then((data) => {
      console.log('recipe saved');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('could not save recipe', err);
      res.sendStatus(500);
    });
});

app.get('/search', (req, res) => {
  const { query } = req.query;
  axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${RECIPES_API_ID}&app_key=${RECIPES_API_KEY}`
    )
    .then((response) => {
      const { data } = response;
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/profile/:email', (req, res) => {

  const {params: {email}} = req;

  Users.findOne({email})
    .then((user) => {
      console.log(user)
      if (user) {
        res.status(200).send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(() => sendStatus(500));
});

app.put('/profile/:email', (req, res) => {
  const { params: {email}, body: {users} } = req;
  
  Users.updateOne({ email }, users)
    .then(({modifiedCount}) => {
      if ({modifiedCount}) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(() => res.sendStatus(500));
});

app.post('/myrecipes', (req, res) => {
  const { recipe } = req.body;

  RecipeList.create(recipe)
    .then((data) => {
      console.log('recipe saved');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('could not save recipe', err);
      res.sendStatus(500);
    });
});

app.get('/myrecipes', (req, res) => {
  SavedRecipe.find({})
    .then((recipes) => {
      res.status(200).send(recipes);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/myrecipes/:_id', (req, res) => {
  const { _id } = req.params;

  SavedRecipe.find({ _id: _id })
    .then((recipe) => {
      res.status(200).send(recipe);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.delete('/myrecipes/:_id', (req, res) => {
  const { _id } = req.params;

  SavedRecipe.deleteOne({ _id })
    .then((response) => {
      if (response.deletedCount) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '..', 'dist', 'index.html'),
    (data, err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`listening @ http://localhost:${port}`);
});
