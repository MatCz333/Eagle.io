import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import { withRouter } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import * as actions from "../../store/actions/index";
/**
 * Styling
 */
const useStyles = makeStyles(theme => {
  const drawerWidth = 240;
  return {
    root: {
      display: "flex",
      height: "100%"
    },
    mainContent: {
      height: "100%",
      width: "100%"
    },
    appBar: {
      backgroundColor: theme.palette.primary.main,
      marginLeft: drawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    drawerPaper: {
      width: drawerWidth
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    }
  };
});

/**
 * Layout component describes the base layout of application
 * for both mobile and web application
 */
function Layout(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles(props);
  const { children, location } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onClickListItem = () => {
    const { onChangeView, onFetchData } = props;
    if (location.pathname === "/input"){
      onChangeView();
      onFetchData();
  }}
  return (
    <div className={classes.root}>
      {location.pathname === "/main" || location.pathname === "/" ? null : (
        <React.Fragment>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="Mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links.
             MOBILE VIEW */}
            <Hidden smUp implementation="css">
              <Drawer
                anchor={theme.direction === "rtl" ? "right" : "left"}
                variant="temporary"
                classes={{
                  paper: classes.drawerPaper
                }}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                <SideBar click={onClickListItem} />
              </Drawer>
            </Hidden>
            {/* DESKTOP VIEW */}
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                <SideBar click={onClickListItem} />
              </Drawer>
            </Hidden>
          </nav>
        </React.Fragment>
      )}
      <div className={classes.mainContent}>{children}</div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchData: (props) => dispatch(actions.fetchDataStarted(props)),
    onChangeView: () => dispatch(actions.updatePostStatus())
  };
};

Layout.defaultProps = {
  children: null
  
};
Layout.propTypes = {
  children: PropTypes.element,
  location: PropTypes.shape({
    pathname:PropTypes.string.isRequired
  }).isRequired,
  onChangeView:PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Layout));
