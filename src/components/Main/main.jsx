import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Choices from "./Choices/Choices";
import eagleLogo from "../../assets/images/eagleLogo.png";
import svgPencil from "../../assets/pencilIconSprite.svg";
import mapIconSprite from "../../assets/mapIconSprite.svg";
import historyIconSprite from "../../assets/historyIconSprite.svg";
import uploadIconSprite from "../../assets/uploadIconSprite.svg";
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
      top: "20%"
    }
  };
});

// SVG ICONS SPRITES
const PencilIcon = props => (
  <div
    style={{
      backgroundImage: `url(${svgPencil})`
    }}
    {...props}
  />
);

const HistoryIconSprite = props => (
  <div
    style={{
      backgroundImage: `url(${historyIconSprite})`
    }}
    {...props}
  />
);

const MapIconSprite = props => (
  <div
    style={{
      backgroundImage: `url(${mapIconSprite})`
    }}
    {...props}
  />
);

const UploadIconSprite = props => (
  <div
    style={{
      backgroundImage: `url(${uploadIconSprite})`
    }}
    {...props}
  />
);

const PencilIconDrawer = props => (
  <SvgIcon viewBox="0 0 24 24" width="24" height="24" {...props}>
    <g>
      <path
        d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
        id="path3723"
      />
      <path
        style={{
          strokeWidth: 0.02797203,
          fill: "#1a1a1a"
        }}
        d="m 17.013682,6.9745214 -1.853294,-1.8534507 0.98624,-0.9813206 c 0.852974,-0.8487201 1.006829,-0.9898992 1.138615,-1.0448075 0.228979,-0.095404 0.430863,-0.1044977 0.67685,-0.03049 l 0.205739,0.061899 1.323827,1.3193414 c 0.954713,0.9514783 1.344561,1.3583378 1.398187,1.4592016 0.06534,0.1228904 0.07441,0.1721029 0.07478,0.4055944 7.07e-4,0.4536848 0.03645,0.4033043 -1.086381,1.5314685 -0.539742,0.5423077 -0.98808,0.986014 -0.996307,0.986014 -0.0082,0 -0.84894,-0.8340528 -1.868251,-1.8534506 z"
      />
      <path
        style={{
          fill: "#81b6f4",
          strokeWidth: 0.02797203,
          fillOpacity: 1
        }}
        d="m 18.811034,8.7438845 c -0.02793,-0.030864 -0.05766,-0.049239 -0.06607,-0.040833 -0.01923,0.019228 -3.584129,-3.5430431 -3.584129,-3.5814852 0,-0.015536 0.33986,-0.3679336 0.755245,-0.7831045 0.415385,-0.4151709 0.755245,-0.7432703 0.755245,-0.7291097 0,0.014161 0.103846,-0.074753 0.230769,-0.1975859 0.227193,-0.2198711 0.412587,-0.3683915 0.412587,-0.3305253 0,0.010624 0.01888,0.00365 0.04196,-0.015506 0.02308,-0.019152 0.04196,-0.028325 0.04196,-0.020384 0,0.00794 0.05308,0.00251 0.117955,-0.012065 0.142591,-0.032038 0.464461,0.015175 0.609318,0.089376 0.08903,0.045607 1.975715,1.9192382 2.505859,2.4885278 0.121778,0.1307692 0.230632,0.2418839 0.241898,0.2469214 0.04342,0.019414 0.08274,0.2508604 0.08227,0.4842912 -6.24e-4,0.311675 -0.04978,0.4259287 -0.300382,0.6982271 C 20.304246,7.4223099 18.923805,8.8 18.892634,8.8 c -0.01695,0 -0.05367,-0.025252 -0.0816,-0.056116 z"
        id="path3735"
      />
    </g>
  </SvgIcon>
);

const FileUploadIcon = props => (
  <SvgIcon viewBox="0 0 24 24" width="24" height="24" {...props}>
    <g>
      <path
        d="M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,12L16,16H13.5V19H10.5V16H8L12,12Z"
        id="path4562"
      />
      <path
        style={{
          fill: "rgb(77, 134, 193)",
          fillOpacity: 1,
          strokeWidth: 0.10169491
        }}
        d="M 10.576271,17.450847 V 15.925424 H 9.3816949 8.1871186 L 10.093559,14.018983 12,12.112542 l 1.906441,1.906441 1.90644,1.906441 h -1.194576 -1.194576 v 1.525423 1.525424 H 12 10.576271 Z"
        id="path5159"
      />
    </g>
  </SvgIcon>
);

const SearchSensorIcon = props => (
  <SvgIcon viewBox="0 0 24 24" width="24" height="24" {...props}>
    <g>
      <path
        d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M14,6.11L8,4V15.89L9,16.24V16.5C9,17.14 9.09,17.76 9.26,18.34L8,17.9L2.66,19.97L2.5,20A0.5,0.5 0 0,1 2,19.5V4.38C2,4.15 2.15,3.97 2.36,3.9L8,2L14,4.1L19.34,2H19.5A0.5,0.5 0 0,1 20,2.5V11.81C18.83,10.69 17.25,10 15.5,10C15,10 14.5,10.06 14,10.17V6.11Z"
        id="path5171"
      />
      <path
        style={{
          fill: "rgb(77, 134, 193)",
          fillOpacity: 1,
          strokeWidth: 0.10169491
        }}
        d="m 19.457866,21.807852 -1.540776,-1.540776 -0.441596,0.207378 c -0.696718,0.327186 -1.195405,0.432843 -2.045831,0.433453 -1.403471,10e-4 -2.627267,-0.614724 -3.482164,-1.751989 -1.271751,-1.691803 -1.133979,-4.120408 0.322051,-5.677022 1.756174,-1.877493 4.714328,-1.885347 6.461801,-0.01716 0.542702,0.580193 0.806279,1.056756 1.052045,1.90216 0.247005,0.849667 0.16356,2.068551 -0.195272,2.852343 -0.14635,0.31967 -0.26609,0.632337 -0.26609,0.694816 0,0.06248 0.674502,0.789227 1.498893,1.614995 l 1.498893,1.501396 -0.660589,0.660589 -0.660589,0.66059 z M 16.65227,18.758711 c 1.709469,-0.819644 1.817935,-3.396392 0.185454,-4.405678 -0.405186,-0.250507 -0.627893,-0.312734 -1.217651,-0.340226 -0.629926,-0.02937 -0.79285,0.0028 -1.280391,0.253045 -1.979741,1.016021 -1.779011,3.878038 0.324323,4.624229 0.640998,0.227404 1.335733,0.181501 1.988265,-0.13137 z"
        id="path5724"
      />
    </g>
  </SvgIcon>
);
const HistoryIcon = props => (
  <SvgIcon viewBox="0 0 24 24" width="24" height="24" {...props}>
    <g>
      <path
        d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3"
        id="path5757"
      />
      <path
        style={{
          fill: "rgb(77, 134, 193)",
          fillOpacity: 1,
          strokeWidth: 0.10169491
        }}
        d="m 12.838983,4.9739669 c 0.09788,-0.025579 0.258051,-0.025579 0.355932,0 0.09788,0.025579 0.0178,0.046507 -0.177966,0.046507 -0.195763,0 -0.275847,-0.020928 -0.177966,-0.046507 z"
        id="path5767"
      />
      <path
        style={{
          fill: "rgb(77, 134, 193)",
          fillOpacity: 1,
          strokeWidth: 0.10169491
        }}
        d="M 14.059322,14.174467 12,12.946992 V 10.520953 8.0949153 h 0.711864 0.711865 v 2.0786497 2.078649 l 1.652542,0.986979 c 0.908898,0.542839 1.691848,1.021922 1.739888,1.064629 0.103634,0.09213 -0.448319,1.116254 -0.59582,1.10552 -0.05593,-0.0041 -1.02839,-0.559764 -2.161017,-1.234875 z"
        id="path5771"
      />
    </g>
  </SvgIcon>
);

/**
 * Constant that maps all possible paths with the choice's name
 *  */
export const CHOICES = {
  DATA_INPUT: {
    path: "/input",
    label: "DATA INPUT",
    icon: PencilIcon,
    drawerIcon: PencilIconDrawer
  },
  UPLOAD_CSV: {
    path: "/uploadCSV",
    label: "UPLOAD CSV",
    icon: UploadIconSprite,
    drawerIcon: FileUploadIcon
  },
  FIND_SENSOR: {
    path: "/sensorFinder",
    label: "FIND SENSOR",
    icon: MapIconSprite,
    drawerIcon: SearchSensorIcon
  },
  HISTORY: {
    path: "/history",
    label: "HISTORY",
    icon: HistoryIconSprite,
    drawerIcon: HistoryIcon
  }
};

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
