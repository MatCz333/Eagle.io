import React, {Component} from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import eagleLogo from "../assets/images/Logo.png";
import ROUTES from "../shared/Routes";
import * as actions from "../store/actions/index";
/**
 * Styling
 */
const styles = (theme => {
  return {
    toolbar: theme.mixins.toolbar,
    logo: {
      display: "block",
      maxHeight: 64,
      paddingLeft: 16
    },
    active: {
      backgroundColor: theme.palette.action.selected
    }
  };
});

/**
 * Represents the sidebar component of the application
 */
export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.timemout = 0;
    this.activeRoute = this.activeRoute.bind(this);
    this.entered = false;
    this.routesArray = Object.keys(ROUTES).map(choice => {
  return [choice, ROUTES[choice]];});
  }

  componentDidUpdate(){
    const {location, onResetPostStatus, onFetchData} = this.props
    if (location.pathname === "/input"){
      console.log("inside")
      onResetPostStatus()
      onFetchData();
  }
  }

  activeRoute(routeName) {
    const {location} = this.props
    return location.pathname.indexOf(routeName) > -1;
  }


  render() {
    return(
    <React.Fragment>
    <div className={this.props.classes.toolbar}>
      <img src={eagleLogo} alt="Eagle.io logo" className={this.props.classes.logo} />
    </div>
    <Divider />
    <List>
      {this.routesArray.map((choice) => {
        this.timeout += 300;
        const IconComponent = choice[1].drawerIcon;
        return (
          <ListItem component={Link} selected={this.activeRoute(choice[1].path)} button exact to={choice[1].path} key={choice[1].path}>
            <ListItemIcon>
            <IconComponent />
            </ListItemIcon>
            <ListItemText primary={choice[0]} />
          </ListItem>
        );
      })}
    </List>
    <Divider />
  </React.Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onResetPostStatus: () => dispatch(actions.updatePostStatus()),
    onFetchData: (props) => dispatch(actions.fetchDataStarted(props))
  }
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Sidebar)))


// export default function SideBar(props) {
//   // eslint-disable-next-line react/prop-types
//   const { click } = props;
//   const choicesArray = Object.keys(CHOICES).map(choice => {
//     return [choice, CHOICES[choice]];
//   });
//   const classes = useStyles();
//   const entered = true;
//   let timeout = 0;
//   // eslint-disable-next-line react/display-name
//   const navLink = React.forwardRef((itemProps, ref) => (
//     // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
//     <NavLink activeClassName={classes.active} {...itemProps} innerRef={ref} />
//   ));
//   return (
//     <div>
//       <div className={classes.toolbar}>
//         <img src={eagleLogo} alt="Eagle.io logo" className={classes.logo} />
//       </div>
//       <Divider />
//       <List>
//         {choicesArray.map((choice) => {
//           timeout += 300;
//           const IconComponent = choice[1].drawerIcon;
//           return (
//             <Slide
//               key={choice[0]}
//               direction="right"
//               in={entered}
//               mountOnEnter
//               unmountOnExit
//               style={{ transformOrigin: "50 0 0" }}
//               {...(entered ? { timeout } : {})}
//             >
//               <ListItem
//                 onClick={() => click()}
//                 component={navLink}
//                 exact
//                 to={choice[1].path}
//                 button
//                 key={choice[0]}
//               >
//                 <ListItemIcon>
//                   <IconComponent />
//                 </ListItemIcon>
//                 <ListItemText primary={choice[0]} />
//               </ListItem>
//             </Slide>
//           );
//         })}
//       </List>
//       <Divider />
//     </div>
//   );
// }
