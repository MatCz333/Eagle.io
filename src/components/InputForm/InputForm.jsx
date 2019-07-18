/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Thermometer from "mdi-material-ui/Thermometer";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";
import SendIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import useStyles from "./InputFormStyles";
import { convertDataToCurrentTimeZone } from "../../store/sagas/dataInput";
import * as actions from "../../store/actions/index";
import axios from "../../axios-eagle";
/**
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

  inputChangedHandler = event => {
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
    const formUI = model.map(parameter => {
      return (
        <React.Fragment key={parameter._id}>
          <Grid item xs={12} sm={6}>
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
    return formUI;
  };

  render() {
    const { elementSelected, posting } = this.props;
    if (posting) this.postDataHandler();
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          {`Parameter values for ${elementSelected.name}`}
        </Typography>
        <form>
          <Grid container spacing={3}>
            {this.renderForm(elementSelected)}
          </Grid>
        </form>
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