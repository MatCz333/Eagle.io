import React, { Component } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
/**
 * Container that represents the login controls of application and
 * describes their functionality
 */

class LoginForm extends Component {
  state = {
    showPassword: false
  };

  /**
   *  Handler that is responsible for 2-way binding
   */
  changeHandler = name => event => {
    event.persist();
    const { handleChange, setFieldTouched } = this.props;
    handleChange(event);
    setFieldTouched(name, true, false);
  };

  /**
   * Handler that toogles visibility of the password
   */
  handleClickShowPasswordHandler = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  /**
   * Handler responsible for submision, resets the form
   *
   */
  onSubmitHandler = event => {
    const { values, onLoginAuth } = this.props;
    event.preventDefault();
    onLoginAuth(values.email, values.password);
  };

  render() {
    const {
      values,
      touched,
      errors,
      isValid,
      loading,
      isAuthenticated
    } = this.props;
    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to="/main" />;
    }
    const { showPassword } = this.state;
    return (
      <React.Fragment>
        {authRedirect}
        <form onSubmit={this.onSubmitHandler}>
          <TextField
            value={values.email}
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
            onChange={this.changeHandler("email")}
            required
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            autoComplete="email"
          />
          <TextField
            type={showPassword ? "text" : "password"}
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            onChange={this.changeHandler("password")}
            required
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            autoComplete="current-password"
            value={values.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPasswordHandler}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />
          {loading ? <LinearProgress color="secondary" /> : null}
          <Button
            disabled={!isValid || loading}
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
          >
            Sign in
          </Button>
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  loading: state.loginReducer.loading,
  error: state.loginReducer.error
});
const mapDispatchToProps = dispatch => ({
  onLoginAuth: (email, password) => dispatch(actions.auth(email, password))
});

LoginForm.defaultProps = {
  isAuthenticated: false,
  loading: false,
  onLoginAuth: null,
  handleChange: null,
  setFieldTouched: null,
  values: {},
  errors: "",
  touched: false,
  isValid: false
};
LoginForm.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  onLoginAuth: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldTouched: PropTypes.func,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }),
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool
  }),
  isValid: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
