import React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
// MUI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

/**
 * Styling
 */

const useStyles = makeStyles(theme => {
  return {
    "@keyframes play54": {
      "0%": {
        backgroundPosition: "0px 0px"
      },
      "100%": {
        backgroundPosition: "-3456px  0px"
      }
    },
    card: {
      backgroundColor: theme.palette.secondary.light,
      height: "100%"
    },
    buttonBase: {
      width: "100%",
      height: "100%",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        "& div": {
          "& div": {
            animationName: "$play54"
          }
        }
      }
    },
    labelIcon: {
      margin: "0 auto",
      marginBottom: 35,
      animationDuration: "900ms",
      animationTimingFunction: "steps(54)",
      width: 64,
      height: 64,
      backgroundRepeat: "no-repeat"
    },
    labelWrapper: {
      position: "absolute",
      top: "40%",
      bottom: "20%"
    },
    labelText: {
      letterSpacing: 10
    },
    [theme.breakpoints.between("xs", "sm")]: {
      labelIcon: {
        fontSize: "1.5rem"
      }
    }
  };
});

/**
 * Component that renders animated svg for particular option
 */
const IconSprite = props => {
  const { sprite } = props;
  return (
    <div
      style={{
        backgroundImage: `url(${sprite})`
      }}
      {...props}
    />
  );
};

/**
 * Component that renders all of the choices in main view
 */

const Choice = props => {
  const classes = useStyles(props);
  const { click, path, textDescription, sprite } = props;
  return (
    <Grid item xs={5}>
      <Paper className={classes.card}>
        <ButtonBase
          className={classes.buttonBase}
          onClick={() => click(path)}
          focusRipple
          focusVisibleClassName
        >
          <div className={classes.labelWrapper}>
            <IconSprite sprite={sprite} className={classes.labelIcon} />
            <Typography
              className={classes.labelText}
              variant="h6"
              align="center"
            >
              {textDescription}
            </Typography>
          </div>
        </ButtonBase>
      </Paper>
    </Grid>
  );
};

Choice.propTypes = {
  click: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  textDescription: PropTypes.string.isRequired
};
export default Choice;
