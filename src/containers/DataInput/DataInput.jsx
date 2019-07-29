/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import * as actions from "../../store/actions/index";
import LocationList from "../../components/LocationList/LocationList";
import WorkspaceList from "../../components/WorkspaceList/WorkspaceList";
import SensorList from "../../components/SensorList/SensorList";
import InputForm from "../../components/InputForm/InputForm";
import FormControls from "../../components/FormControls";
import SuccesfulPostDataIcon from "../../assets/successfulPostDataIcon.svg";
import FailedPostDataIcon from "../../assets/failedPostDataIcon.svg";

const styles = theme => ({
  layout: {
    marginTop: 64,
    marginLeft: 16,
    marginRight: 16,
    width: "auto",
    [theme.breakpoints.up(600 + 8 * 2)]: {
      maxWidth: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  stepper: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingLeft: 0,
    paddingRight: 0
  },
  paper: {
    marginTop: 24,
    marginBottom: 24,
    padding: 16,
    [theme.breakpoints.up(600 + 24 * 2)]: {
      marginTop: 48,
      marginBottom: 48,
      padding: 24
    }
  },
  postDataIcon: {
    margin: "0 auto",
    display: "block",
    width: "30%",
    height: "30%"
  },
  result: {
    color: theme.palette.primary.main
  },
  description: {
    color: theme.palette.secondary.dark
  }
});

/**
 * Container that save the current state of the form
 */

class DataInput extends Component {
  state = {
    stackElementsSelected: [],
    activeStep: 0
  };

  componentDidMount() {
    const { onFetchData } = this.props;
    onFetchData();
  }

  /**
   * Returns all children of specific parent
   * @param Object parent to check if has children objects nested inside
   * @param String classType a type of child that we want to find.
   * @returns Array of parent children
   */
  getAllChildrenPerParent = (parent, classType) => {
    const childsArray = [];
    if (parent.children !== undefined) {
      parent.children.forEach(child => {
        childsArray.push(child);
      });
    }
    return childsArray;
  };

  getSteps = () => {
    return [
      "Select workspaces",
      "Select location",
      "Select data source",
      "Input Data"
    ];
  };

  /**
   * Store data for ListSubHeader title for all steps
   * @return Array all listSubHeader titles for all steps
   */
  getListSubheaderTitle = elementSelected => {
    let subtitle = elementSelected;
    if (subtitle === undefined) {
      subtitle = "Your workspaces";
    }
    return [
      subtitle,
      `${subtitle.name}s locations:`,
      `${subtitle.name}s sensors:`
    ];
  };

  /**
   * Retrieve content for activeStep
   * @param step Value that represents the current step of the stepper
   * @return JSX element that contains List content that corresponds to activeStep
   */
  getStepContent = step => {
    const { data } = this.props;
    const { stackElementsSelected, activeStep } = this.state;
    const elementSelected = stackElementsSelected[activeStep - 1];

    // create list content based on the activeStep.
    const createList = listContent => (
      <List
        dense
        subheader={
          <ListSubheader component="div">
            {this.getListSubheaderTitle(elementSelected)[activeStep]}
          </ListSubheader>
        }
      >
        {listContent}
      </List>
    );

    switch (step) {
      case 0:
        return createList(
          data.map(workspace => (
            <WorkspaceList
              click={this.handleNext}
              getAllChildrenPerParent={this.getAllChildrenPerParent}
              key={workspace._id}
              workspace={workspace}
            />
          ))
        );
      case 1:
        return createList(
          <LocationList
            getAllChildrenPerParent={this.getAllChildrenPerParent}
            elementSelected={elementSelected}
            handleNext={this.handleNext}
          />
        );
      case 2:
        return createList(
          <SensorList
            getAllChildrenPerParent={this.getAllChildrenPerParent}
            elementSelected={elementSelected}
            handleNext={this.handleNext}
          />
        );
      case 3:
        return (
          <InputForm
            getAllChildrenPerParent={this.getAllChildrenPerParent}
            elementSelected={elementSelected}
            handle={this.handleNext}
          />
        );
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
   * Handler that is responsible for  generating next step.
   * @param String elementId a unique value for a given element that was clicked
   */
  handleNext = element => {
    const { activeStep } = this.state;
    if (element._class === "io.eagle.models.node.Workspace") {
      if (this.getAllChildrenPerParent(element, "Group").length !== 0) {
        return null;
      }
    }
    if (element.children === undefined || element.children.length === 0) {
      return null;
    }
    this.setState(state => ({
      stackElementsSelected: state.stackElementsSelected.concat(element),
      activeStep: activeStep + 1
    }));
  };

  /**
   * Handler that is responsible for  generating previous step.
   */
  handleBack = () => {
    this.setState(state => ({
      stackElementsSelected: state.stackElementsSelected.filter(
        (item, j) => state.activeStep - 1 !== j
      ),
      activeStep: state.activeStep - 1
    }));
  };

  /**
   * Handler that is responsible for reseting the stepper and main view to
   * default values
   */
  handleResetActiveStep = () => {
    const { onResetPostStatus } = this.props;
    // clear global state
    onResetPostStatus();
    // clear local state
    this.setState({
      stackElementsSelected: [],
      activeStep: 0
    });
  };

  render() {
    const { data, error, fetchLoading, classes, posted } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    let content = <LoadingSkeleton />;
    if (!fetchLoading && data) {
      content = this.getStepContent(activeStep);
    }
    /**
     * POST DATA FAILED (ERROR VIEW)
     */
    if (error) {
      content = (
        <React.Fragment>
          <img
            className={classes.postDataIcon}
            src={FailedPostDataIcon}
            alt="failed post data icon"
          />
          <Typography align="center" variant="h4" className={classes.result}>
            ERROR
          </Typography>
          <Typography
            align="center"
            variant="h6"
            className={classes.description}
          >
            Something went wrong. The parameters have not been succesfully
            changed. Please try again.
          </Typography>
        </React.Fragment>
      );
    }
    /**
     * POST DATA SUCCESS (SUCCESS VIEW)
     */
    if (posted) {
      content = (
        <React.Fragment>
          <img
            className={classes.postDataIcon}
            src={SuccesfulPostDataIcon}
            alt="succesful post data icon"
          />
          <Typography align="center" variant="h4" className={classes.result}>
            SUCCESS
          </Typography>
          <Typography
            align="center"
            variant="h6"
            className={classes.description}
          >
            The parameters have been succesfully changed
          </Typography>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {posted || error ? null : (
              <React.Fragment>
                <Typography align="center" variant="h4">
                  DATA INPUT
                </Typography>
                <Stepper
                  className={classes.stepper}
                  activeStep={activeStep}
                  alternativeLabel
                >
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </React.Fragment>
            )}
            {content}
            <FormControls
              error={error}
              posted={posted}
              handleBack={this.handleBack}
              activeStep={activeStep}
              handleResetActiveStep={this.handleResetActiveStep}
            />
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    posted: state.dataInputReducer.posted,
    fetchLoading: state.dataInputReducer.fetchLoading,
    data: state.dataInputReducer.data,
    error: state.dataInputReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetPostStatus: () => dispatch(actions.updatePostStatus()),
    onFetchData: () => dispatch(actions.fetchDataStarted())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DataInput));

DataInput.propTypes = {
  onFetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
};
