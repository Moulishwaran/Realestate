import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
            India's No. 1 real estate developer, renowned for building some of
            the world's finest developments, has created several iconic
            landmarks across the globe, delivering the highest standards in
            sustainable living
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +9876543210</span>
          <span>YouTube: WebDev</span>
          <span>GitHub: Webdev</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Asia</span>
          <span>Country: India</span>
          <span>Current Location: Chennai, Tamilnadu</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
