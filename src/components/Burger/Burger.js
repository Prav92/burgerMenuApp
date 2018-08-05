import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let tranformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      console.log(props.ingredients, "llll");
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + 1} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (tranformedIngredients.length === 0) {
    tranformedIngredients = "Please start adding ingredients";
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {tranformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
