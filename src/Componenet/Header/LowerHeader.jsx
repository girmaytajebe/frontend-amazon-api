import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./Header.module.css";
function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>
          <a href="">Today's Deals</a>
        </li>
        <li>
          <a href=""> Customer Service</a>
        </li>
        <li>
          <a href="">Registry</a>
        </li>
        <li>
          <a href="">Gift Cards</a>
        </li>
        <li>
          <a href="">Sell</a>
        </li>
        <li>
          <a href="">Shop great deals now</a>
        </li>
      </ul>
    </div>
  );
}

export default LowerHeader
