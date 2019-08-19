import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";
import LogIn from "./components/LogIn/LogIn";
import Layout from "./hoc/Layout/Layout";
import theme from "./shared/utility/CustomMuiTheme";
import Main from "./components/Main/main";
import DataInput from "./containers/DataInput/DataInput";

const App = () => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path="/input" component={DataInput} />
          <Route path="/main" component={Main} />
          <Route path="/login" component={LogIn} />
          <Route path="/" exact component={LogIn} />
        </Switch>
      </Layout>
    </ThemeProvider>
  </React.Fragment>
);

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(App));
