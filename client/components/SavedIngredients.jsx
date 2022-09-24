import React from 'react';

const Ingredients = ({ ingredients }) => {
  return (
    <>
      {ingredients.map((ingredient, index) => {
        return <ul key={index}>{ingredient}</ul>;
      })}
    </>
  );
};

export default Ingredients;
