/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import * as actions from "../../store/actions/index";
import styles from "./DataInput.module.css";
import SecondaryNavBar from "../../components/Navigation/SecondaryNavBar/SecondaryNavBar";
import ListContent from "../../components/ListContent/ListContent";
/**
 * Container that save the current state of the form
 */

class DataInput extends Component {
  state = {
    currentElementId: null,
    currentElementName: "",
    activeStep: 0
  };

  componentDidMount() {
    const { onFetchData } = this.props;
    onFetchData();
  }

  getSteps = () => {
    return [
      "Select workspaces",
      "Select location",
      "Select sendor",
      "Input Data",
      "Send"
    ];
  };

  getStepContent = step => {
    const { data } = this.props;
    switch (step) {
      case 0:
        return <ListContent data={data} click={this.handleNext} />;
      case 1:
        return "What is an ad group anyways?";
      case 2:
        return "This is the bit I really care about!";
      default:
        return "Unknown step";
    }
  };

  /**
   * Converts URL pathName to name of the Label in SecondaryNavBar
   */
  convertPathNameToLabel = pathName => {
    const label = pathName
      .replace("/", "")
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    return label;
  };

  /**
   * Handler that is responsible for generating new list for a particular step
   * @param String elementId a unique value for a given element that was clicked
   */
  handleNext = (elementId, elementName) => {
    const { activeStep } = this.state;
    this.setState({
      currentElementId: elementId,
      currentElementName: elementName,
      activeStep: activeStep + 1
    });
  };

  /**
   * Handler that is responsible for setting new view upon clicking back button
   */
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  render() {
    const { location, data, error, loading } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    const name = this.convertPathNameToLabel(location.pathname);
    let listContent = <CircularProgress color="primary" />;
    if (!loading && data) {
      listContent = this.getStepContent(activeStep);
    }
    if (error) {
      listContent = <p>{error}</p>;
    }
    return (
      <div className={styles.DataInput}>
        <SecondaryNavBar className={styles.SecondaryNavBar} name={name} />
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <List
          subheader={
            <ListSubheader component="div">{this.getSteps[0]}</ListSubheader>
          }
        >
          {listContent}
        </List>
        <Button disabled={activeStep === 0} onClick={this.handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={this.handleNext}>
          {activeStep === steps.length - 1 ? "Send" : "Next"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.dataInputReducer.loading,
    data: state.dataInputReducer.data,
    error: state.dataInputReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchData: () => dispatch(actions.fetchDataStarted())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataInput);

DataInput.propTypes = {
  onFetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
};
