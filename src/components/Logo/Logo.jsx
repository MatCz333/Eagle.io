import React from "react";
import eagleLogo from "../../assets/images/Logo.png";
import styles from "./Logo.module.css";

const logo = () => (
  <div className={styles.Logo}>
    <img src={eagleLogo} alt="EagleIO Logo" />
  </div>
);

export default logo;
