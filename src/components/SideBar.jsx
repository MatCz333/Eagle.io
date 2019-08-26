import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import eagleLogo from "../assets/images/Logo.png";
import ROUTES from "../shared/Routes";
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

/**
 * Represents the sidebar component of the application
 */
function SideBar(props) {
  const classes = useStyles(props);
  const {click} = props
  const routesArray = Object.keys(ROUTES).map(choice => {
    return [choice, ROUTES[choice]];});
    
    return(
    <React.Fragment>
    <div className={classes.toolbar}>
      <img src={eagleLogo} alt="Eagle.io logo" className={classes.logo} />
    </div>
    <Divider />
    <List>
      {routesArray.map((choice) => {
        const IconComponent = choice[1].drawerIcon;
        return (
          <ListItem onClick={click} component={Link}  button  to={choice[1].path} key={choice[1].path}>
            <ListItemIcon>
            <IconComponent />
            </ListItemIcon>
            <ListItemText primary={choice[0]} />
          </ListItem>
        );
      })}
    </List>
    <Divider />
  </React.Fragment>
    )}
    
export default SideBar
