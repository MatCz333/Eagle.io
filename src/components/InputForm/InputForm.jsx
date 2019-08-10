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
 * Responsible for generating form component
 *
 */

class InputForm extends Component {
  state = {};

  componentDidMount() {
    const { getAllChildrenPerParent, elementSelected } = this.props;
    const model = getAllChildrenPerParent(elementSelected);
    model.forEach(parameter => {
      this.setState({ [parameter._id]: parameter.currentValue });
    });
  }

  inputResetHandler = name => {
    this.setState({ [name]: "" });
  };

  inputChangedHandler = (event, date) => {
    if (date) {
      this.setState({ date });
      return;
    }
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  inputClickedHandler = element => {
    const { _id } = element;
    if (this.state[_id]) this.inputResetHandler(_id);
  };

  postDataHandler = () => {
    const { ...rest } = this.state;
    this.props.onPostData(rest);
  };

  renderForm = elementSelected => {
    const { getAllChildrenPerParent } = this.props;
    const model = getAllChildrenPerParent(elementSelected);
    const parameterValues = model.map(parameter => {
      return (
        <React.Fragment key={parameter._id}>
          <Grid
            style={{
              paddingBottom: "20px"
            }}
            item
            xs={12}
          >
            <TextField
              inputRef={element => {
                this[parameter._id] = element;
              }}
              name={parameter._id}
              onChange={this.inputChangedHandler}
              onClick={this.inputClickedHandler}
              id="outlined-adornment-weight"
              variant="outlined"
              label={parameter.name}
              defaultValue={parameter.currentValue}
              helperText={`Last value from ${convertDataToCurrentTimeZone(
                elementSelected.timezone,
                parameter.currentTime
              )}`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {parameter.units}
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
