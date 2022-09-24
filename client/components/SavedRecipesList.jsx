import React, { useState, useEffect } from "react";
import SavedRecipe from "./SavedRecipe.jsx";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import axios from "axios";

const SavedRecipesList = ({ user }) => {
  const [recipes, setRecipes] = useState([]);



  useEffect(() => {
    axios
      .get(`/api/user/myrecipes/${user._id}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setRecipes(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {recipes.length !== 0 &&
          recipes.map((recipe, index) => (
            <Grid item key={index} xs={2} sm={3} md={4}>
              <SavedRecipe
                savedRecipe={recipe}
                key={index}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default SavedRecipesList;
