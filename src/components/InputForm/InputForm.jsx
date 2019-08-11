/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import { convertDataToCurrentTimeZone } from "../../shared/Helpers";
import * as actions from "../../store/actions/index";
import axios from "../../axios-eagle";
import DateAndTimePicker from "../DateAndTimePicker";

/** "
 * Responsible for generating  a data input form component
 *
 */

class InputForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputConfig: []
    };
    const { getAllChildrenPerParent, elementSelected } = props;
    const model = getAllChildrenPerParent(elementSelected);
    const inputConfig = {}
    // setting initial state for each parameter
    model.forEach(parameter => {
      inputConfig[parameter._id] = {
      time : parameter.currentTime,
      units : parameter.units,
      defaultValue: parameter.currentValue,
      name: parameter.name,
      currentValue: parameter.currentValue,
      focused: false
      }
    });
   this.state.inputConfig = inputConfig
  }

  inputChangedHandler = (event, date) => {
    const{validateForm} = this.props
    const{inputConfig} = this.state
    if (date) {
      this.setState({ date });
      return;
    }
    const { value, id} = event.currentTarget;
    // get back default value when input is blank
    if(value === ""){
      this.setState(prevState => ({
        ...prevState,
        inputConfig: {
          ...inputConfig,
          [id]:{
            ...prevState.inputConfig[id],
                currentValue: ""
          }
        }}))
    } else {
      this.setState(prevState => ({
        ...prevState,
        inputConfig: {
          ...inputConfig,
          [id]:{
            ...prevState.inputConfig[id],
                currentValue: value
          }
        }}))
    }
    validateForm()
  };


  postDataHandler = () => {
    const { ...rest } = this.state;
    const {onPostData} = this.props
    onPostData(rest);
  };

  onBlurHandler = event =>{
    const{inputConfig} = this.state
    const { id} = event.currentTarget;
    this.setState(prevState => ({
      ...prevState,
      inputConfig: {
        ...inputConfig,
        [id]:{
          ...prevState.inputConfig[id],
          focused: false
        }
      }}))
  }

  onFocusHandler  = event =>{
    const{inputConfig} = this.state
    const {  id} = event.currentTarget;
    this.setState(prevState => ({
      ...prevState,
      inputConfig: {
        ...inputConfig,
        [id]:{
          ...prevState.inputConfig[id],
          focused: true
        }
      }}))
  }

  renderForm = elementSelected => {
    const{ inputConfig} = this.state;
    const parameterValues = Object.entries(inputConfig).map(parameter => {
      return (
        <React.Fragment key={parameter[0]}>
          <Grid
            style={{
              paddingBottom: "20px"
            }}
            item
            xs={12}
          >
            <TextField
            onBlur={this.onBlurHandler}
            onFocus={this.onFocusHandler}
            fullWidth
            value={(!parameter[1].focused && !parameter[1].currentValue ? parameter[1].defaultValue: parameter[1].currentValue)}
            type="number"
              inputRef={element => {
                this[parameter[1].name] = element;
              }}
              name={parameter[1].name}
              onChange={this.inputChangedHandler}
              id={parameter[0]}
              variant="outlined"
              label={parameter[1].name}
              helperText={`Last value from ${convertDataToCurrentTimeZone(
                elementSelected.timezone,
                parameter[1].time
              )}`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {parameter[1].units}
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </React.Fragment>
      );
    });
    const form = (
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" gutterBottom>
            Last known parameter values:
          </Typography>
        </Grid>
        <Grid item={12} sm={6}>
          {parameterValues}
        </Grid>
      </React.Fragment>
    );
    return form;
  };

  render() {
    const { elementSelected, posting } = this.props;
    if (posting) this.postDataHandler();
    return (
      <React.Fragment>
        <div
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <Typography variant="h5">{elementSelected.name}</Typography>
          <Divider
            style={{
              marginLeft: 0,
              marginRight: 0
            }}
            variant="middle"
          ></Divider>
          <form>
            <Grid
              style={{
                marginTop: "20px"
              }}
              container
            >
              {this.renderForm(elementSelected)}
            </Grid>
          </form>
          <Divider
            style={{
              marginLeft: 0,
              marginRight: 0
            }}
            variant="middle"
          ></Divider>
          <Grid
            style={{
              margin: "20px 0"
            }}
            container
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Input date:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateAndTimePicker
                dateChange={this.inputChangedHandler}
              ></DateAndTimePicker>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    posting: state.dataInputReducer.posting,
    loading: state.dataInputReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostData: formData => dispatch(actions.postDataStarted(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm, axios);
