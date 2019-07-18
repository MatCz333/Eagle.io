import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styles from "./Login.module.css";
import logo from "../../assets/images/Logo.png";
import EnhancedFormikLoginForm from "../../containers/LoginForm/EnhancedFormikLoginForm";

/**
 * Represents the login screen of application
 */
const LogIn = () => (
  <Paper className={styles.Paper}>
    <Avatar className={styles.Avatar} alt="Eagle.io logo" src={logo} />
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <EnhancedFormikLoginForm />
  </Paper>
);

export default LogIn;
