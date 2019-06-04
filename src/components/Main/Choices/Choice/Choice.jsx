import React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import styles from "./Choice.module.css";

const Choice = props => {
  const { click, path, textDescription } = props;
  return (
    <ButtonBase
      onClick={() => click(path)}
      className={styles.ButtonBase}
      focusRipple
      focusVisibleClassName
    >
      <div className={styles.Choice}>
        <Avatar className={styles.Avatar}>
          <DescriptionIcon className={styles.Icon} />
        </Avatar>
        <Typography variant="h6" align="center" color="primary">
          {textDescription}
        </Typography>
      </div>
    </ButtonBase>
  );
};

Choice.propTypes = {
  click: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  textDescription: PropTypes.string.isRequired
};
export default Choice;
