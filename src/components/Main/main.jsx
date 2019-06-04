import React, { Component } from "react";
import PropTypes from "prop-types";
import BottomNavBar from "../Navigation/BottomNavBar/BottomNavBar";
import styles from "./main.module.css";
import Choices from "./Choices/Choices";
import eagleLogo from "../../assets/images/eagleLogo.png";

/**
 * Main container that stores the main functionality of the application
 */
export default class Main extends Component {
  state = {
    choices: {
      DATA_INPUT: {
        path: "/input",
        label: "DATA INPUT"
      },
      UPLOAD_CSV: {
        path: "/uploadCSV",
        label: "UPLOAD CSV"
      },
      FIND_SENSOR: {
        path: "/sensorFinder",
        label: "FIND SENSOR"
      },
      HISTORY: {
        path: "/history",
        label: "HISTORY"
      }
    }
  };

  // handler that is responsible for redirecting the view depended on what option was clicked
  choiceContinueHandler = choiceChosen => {
    const { history } = this.props;
    history.push(choiceChosen);
  };

  render() {
    const { choices } = this.state;
    return (
      <React.Fragment>
        <main className={styles.Content}>
          <div className={styles.OpacityWrapper}>
            <div className={styles.LogoWrapper}>
              <img src={eagleLogo} alt="Eagle logo" />
            </div>
            <Choices click={this.choiceContinueHandler} choices={choices} />
          </div>
        </main>
        <BottomNavBar />
      </React.Fragment>
    );
  }
}
Main.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string
  }).isRequired
};
