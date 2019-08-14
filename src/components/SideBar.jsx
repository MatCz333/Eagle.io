import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import eagleLogo from "../assets/images/Logo.png";
import { CHOICES } from "./Main/main";

/**
 * Styling
 */
const useStyles = makeStyles(theme => {
  return {
    toolbar: theme.mixins.toolbar,
    logo: {
      display: "block",
      maxHeight: 64,
      paddingLeft: 16
    },
    active: {
      backgroundColor: theme.palette.action.selected
    }
  };
});

export default function SideBar(props) {
  // eslint-disable-next-line react/prop-types
  const { click } = props;
  const choicesArray = Object.keys(CHOICES).map(choice => {
    return [choice, CHOICES[choice]];
  });
  const classes = useStyles();
  const entered = true;
  let timeout = 0;
  // eslint-disable-next-line react/display-name
  const navLink = React.forwardRef((itemProps, ref) => (
    // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
    <NavLink activeClassName={classes.active} {...itemProps} innerRef={ref} />
  ));
  return (
    <div>
      <div className={classes.toolbar}>
        <img src={eagleLogo} alt="Eagle.io logo" className={classes.logo} />
      </div>
      <Divider />
      <List>
        {choicesArray.map((choice) => {
          timeout += 300;
          const IconComponent = choice[1].drawerIcon;
          return (
            <Slide
              key={choice[0]}
              direction="right"
              in={entered}
              mountOnEnter
              unmountOnExit
              style={{ transformOrigin: "50 0 0" }}
              {...(entered ? { timeout } : {})}
            >
              <ListItem
                onClick={() => click()}
                component={navLink}
                exact
                to={choice[1].path}
                button
                key={choice[0]}
              >
                <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
                <ListItemText primary={choice[0]} />
              </ListItem>
            </Slide>
          );
        })}
      </List>
      <Divider />
    </div>
  );
}
