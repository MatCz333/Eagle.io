import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../Logo/Logo";

const NavBar = () => (
  <AppBar color="primary" position="static">
    <Toolbar>
      <IconButton color="secondary" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Logo />
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
