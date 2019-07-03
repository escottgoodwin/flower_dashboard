import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Customers from "components/Customers";
import Salesmen from "components/Salesmen";
import Sales from "components/Sales";
import SalesTypeChart from "components/SalesTypeChart";
import CustomerList from "components/CustomerList";
import SalesmenList from "components/SalesmenList";
import Inventory from "components/Inventory";
import SalesTimeChart from "components/SalesTimeChart";
import InventoryTypeChart from "components/InventoryTypeChart";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>

            <Inventory />

          </GridItem>
          <GridItem xs={12} sm={6} md={3}>

            <Sales />

          </GridItem>
          <GridItem xs={12} sm={6} md={3}>

            <Customers />
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>

            <Salesmen />

          </GridItem>
        </GridContainer>
        <GridContainer>

          <GridItem xs={12} sm={12} md={6}>

            <SalesTypeChart />
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>

            <InventoryTypeChart />

          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>

          <SalesmenList />

          </GridItem>
          <GridItem xs={12} sm={12} md={6}>

          <CustomerList />

          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);