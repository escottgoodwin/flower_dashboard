import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import CustomerProfile from "components/CustomerProfile";
import ProductProfile from "components/ProductProfile";
import SalesmanProfile from "components/SalesmanProfile";
import SalesmanUpdateProfile from "components/SalesmanUpdateProfile";
import CustomerUpdateProfile from "components/CustomerUpdateProfile1";
import ProductUpdateProfile from "components/ProductUpdateProfile";
import CustomerAddProfile from "components/CustomerAddProfile";
import SalesmanAddProfile from "components/SalesmanAddProfile";
import ProductAddProfile from "components/ProductAddProfile";

import fire from '../firebase'

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/flower-field3.jpg";
import logo from "assets/img/flower_2.png";

let ps;



const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />

        );
      }
      return null;
    })}
    <Route
      path='/admin/customer_profile'
      component={CustomerProfile}
    />
    <Route
      path='/admin/product_profile'
      component={ProductProfile}
    />

    <Route
      path='/admin/salesman_profile'
      component={SalesmanProfile}
    />

    <Route
      path='/admin/salesman_update'
      component={SalesmanUpdateProfile}
    />

    <Route
      path='/admin/customer_update'
      component={CustomerUpdateProfile}
    />

    <Route
      path='/admin/product_update'
      component={ProductUpdateProfile}
    />

    <Route
      path='/admin/add_customer'
      component={CustomerAddProfile}
    />

    <Route
      path='/admin/add_salesman'
      component={SalesmanAddProfile}
    />

    <Route
      path='/admin/add_product'
      component={ProductAddProfile}
    />

  </Switch>
);

class Dashboard extends React.Component {
  state = {
    image: image,
    color: "blue",
    hasImage: true,
    fixedClasses: "dropdown show",
    mobileOpen: false,
    userName:''
  };
  mainPanel = React.createRef();
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return window.location.pathname !== "/admin/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  notSignedIn = () => {
       this.props.history.push(`/login`)
   }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
    }
    window.addEventListener("resize", this.resizeFunction);

    fire.auth().onAuthStateChanged(user =>  {
      if (user) {
          this.setState({
            userName:user.displayName,
          })
      } else {
        this.setState({name:'No user'})
        this.notSignedIn()
      }
    });
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"Flower Shop"}
          userName={this.state.userName}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}

        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
