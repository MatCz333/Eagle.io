import React from "react";
import PropTypes from "prop-types";
import Grow from "@material-ui/core/Grow";
import Choice from "./Choice/Choice";
/**
 * Component that render all of the choices in main view
 */
const Choices = props => {
  const { click, choices } = props;
  let timeout = 0;
  const entered = true;
  const choicesArray = Object.keys(choices).map(choice => [
    choice,
    props.choices[choice]
  ]);
  return choicesArray.map(choiceOptions => {
    timeout += 600;
    return (
      <Grow
        key={choiceOptions[1].path}
        in={entered}
        style={{ transformOrigin: "50 0 0" }}
        {...(entered ? { timeout } : {})}
      >
        <Choice
          icon={choiceOptions[1].icon}
          textDescription={choiceOptions[1].label}
          click={click}
          key={choiceOptions[1].path}
          path={choiceOptions[1].path}
        />
      </Grow>
    );
  });
};

Choices.propTypes = {
  click: PropTypes.func.isRequired,
  choices: PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string
  }).isRequired
};
export default Choices;
