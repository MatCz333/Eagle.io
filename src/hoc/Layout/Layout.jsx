import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Layout.module.css";

/**
 * Layout component describes the base layout of application
 * for both mobile and web application
 */
class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  /**
   * Handler that hides the sideDrawer component.
   */
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  /**
   * Handler that toogles the state of sideDrawer Component.
   */
  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  render() {
    const { children } = this.props;
    return <div className={styles.Layout}>{children}</div>;
  }
}
Layout.defaultProps = {
  children: null
};
Layout.propTypes = {
  children: PropTypes.element
};
export default Layout;
