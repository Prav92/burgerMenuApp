import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated && <NavigationItem link="/orders">Orders </NavigationItem>}
    <NavigationItem link={!props.isAuthenticated ? "/auth" : "/logout"}>{!props.isAuthenticated ? "Login" : "Logout"}</NavigationItem>
  </ul>
);

export default navigationItems;
