import React from 'react';
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

const ExerciseList = ({workout: {workout, weight, set, reps}, daily_info}) => (
  <Card  sx={{ 
    maxWidth: 345, 
    boxShadow: 7,
    margin: "auto",
    width: "50%",
    marginTop: "10px",
    textAlign: "center",
    }} className='workout-card' >
    <CardHeader title={daily_info[daily_info.length - 1].date} />
    <CardContent>
      <List>
        <ListItem>Type of workout: {workout}</ListItem>
        <ListItem>Weight lifted: {weight}</ListItem>
        <ListItem>Number of sets: {set}</ListItem>
        <ListItem>Number of reps: {reps}</ListItem>
      </List>
    </CardContent>
  </Card>
);

export default ExerciseList;