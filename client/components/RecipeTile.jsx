import axios from "axios";
import React, { useState, useContext } from "react";
import { UserContext } from "../context/user.context.jsx";

import Ingredients from "./SavedIngredients.jsx";

import {
  Avatar,
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

import {red} from '@mui/material/colors';


import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestaurantIcon from "@mui/icons-material/Restaurant";


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

export default function RecipeTile({
  label,
  image,
  source,
  url,
  ingredientLines,
  calories,
  fat,
  carbs,
  protein,
  uri,
  servings,
}) {

  const {currentUser,setCurrentUser} = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const recipe = {
    label,
    image,
    source,
    url,
    ingredientLines,
    calories,
    fat,
    carbs,
    protein,
    uri,
    servings,
  };

  const handleSaveClick = async () => {
    try{
      const {data} = await axios.post(`/api/user/myrecipes/${currentUser._id}`, {recipe});
      // update the user context with the new recipe
      setCurrentUser({...currentUser,recipeList:[...currentUser.recipeList,data]});
    } catch(err){
      console.log("Error saving recipe",err);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <RestaurantIcon />
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={handleSaveClick}
          >
            <FavoriteIcon />
          </IconButton>
        }
        title={label}
      />
      <CardMedia component="img" height="194" image={image} alt={label} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {Math.round(calories)} Calories
        </Typography>
        <List>
          <ListItem>Fat: {recipe.fat} g</ListItem>
          <ListItem>Carbs: {recipe.carbs} g</ListItem>
          <ListItem>Protein: {recipe.protein} g</ListItem>
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" size="small" href={url}>
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
          <Typography paragraph>Ingredients:</Typography>
          <Ingredients ingredients={ingredientLines} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
