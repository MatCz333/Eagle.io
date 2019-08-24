import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Choices from "./Choices/Choices";
import eagleLogo from "../../assets/images/eagleLogo.png";
import CHOICES  from "../../shared/Routes";

/**
 * Styling
 */
const useStyles = makeStyles(theme => {
  return {
    container: {
      position: "relative",
      height: "100%"
    },
    profile: {
      flexGrow: 1,
      flexBasis: 0,
      backgroundColor: theme.palette.primary.main
    },
    choicesBackground: {
      flexBasis: 0,
      flexGrow: 3,
      backgroundColor: theme.palette.secondary.main
    },
    logo: {
      display: "block",
      margin: "0 auto",
      width: 100,
      height: 100,
      marginTop: 20
    },
    choicesLayer: {
      margin: 0,
      maxWidth: "100%",
      height: "80%",
      backgroundColor: "transparent",
      position: "absolute",
      top: "15%"
    }
  };
});

/**
 * Main view that stores the main functionality of the application
 */

const Main = props => {
  // handler that is responsible for redirecting the view depended on what option was clicked
  const choiceContinueHandler = choiceChosen => {
    const { history } = props;
    history.push(choiceChosen);
  };

  const classes = useStyles(props);
  return (
    <React.Fragment>
      <main className={classes.container}>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          className={classes.container}
        >
          <Grid item xs={12} className={classes.profile}>
            <img src={eagleLogo} alt="Eagle.io logo" className={classes.logo} />
          </Grid>
          <Grid item xs={12} className={classes.choicesBackground} />
          <Grid
            spacing={2}
            className={classes.choicesLayer}
            container
            justify="space-evenly"
          >
            <Choices click={choiceContinueHandler} choices={CHOICES} />
          </Grid>
        </Grid>
      </main>
    </React.Fragment>
  );
};

export default Main;

Main.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string
  }).isRequired
};
