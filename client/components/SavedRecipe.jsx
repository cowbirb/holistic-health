import axios from "axios";
import React, { useState, useContext } from "react";

import { UserContext } from "../context/user.context.jsx";

import Ingredients from "./SavedIngredients.jsx";

import {
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SavedRecipe = ({ savedRecipe }) => {
  const { currentUser, setCurrentUser, setCalorieCount } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/api/user/myrecipes/${savedRecipe._id}`,
        { data: { currentUser } }
      );
      console.log("recipe deleted");
      // update the user conext recipeList to remove the deleted recipe
      setCurrentUser(data);
    } catch (err) {
      console.log("failed to delete recipe", err);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLogClick = () => {
    setCalorieCount(Math.round(savedRecipe.calories));
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 7 }} className="recipe-card">
      <CardHeader
        action={
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon />
          </IconButton>
        }
        title={savedRecipe.label}
      />
      <CardMedia
        component="img"
        height="140"
        image={savedRecipe.image}
        alt={savedRecipe.label}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {Math.round(savedRecipe.calories)} Calories
        </Typography>
        <List>
          <ListItem>Fat: {savedRecipe.fat} g</ListItem>
          <ListItem>Carbs: {savedRecipe.carbs} g</ListItem>
          <ListItem>Protein: {savedRecipe.protein} g</ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={handleLogClick}
        >
          Log Recipe
        </Button>
        <Button variant="contained" size="small" href={savedRecipe.url}>
          View Instructions
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Ingredients:</Typography>
          <Ingredients ingredients={savedRecipe.ingredientLines} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SavedRecipe;
