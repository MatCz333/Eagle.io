import React from "react";
import PropTypes from "prop-types";
import styles from "./Choices.module.css";
import Choice from "./Choice/Choice";

/**
 * Component that render all of the choices in main view
 */
const Choices = props => {
  const { click, choices } = props;
  const choicesArray = Object.keys(choices).map(choice => [
    choice,
    props.choices[choice]
  ]);
  const choicesComponents = choicesArray.map(choiceOptions => {
    return (
      <Choice
        textDescription={choiceOptions[1].label}
        click={click}
        key={choiceOptions[1].path}
        path={choiceOptions[1].path}
      />
    );
  });
  return <div className={styles.Choices}>{choicesComponents}</div>;
};

Choices.propTypes = {
  click: PropTypes.func.isRequired,
  choices: PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string
  }).isRequired
};
export default Choices;
