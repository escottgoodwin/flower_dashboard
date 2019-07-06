import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Customers from "components/Customers";
import Salesmen from "components/Salesmen";
import Sales from "components/Sales";
import SalesTypeChart from "components/SalesTypeChart";
import SalesPieChart from "components/SalesPieChart";
import CustomerList from "components/CustomerList";
import SalesmenList from "components/SalesmenList";
import Inventory from "components/Inventory";
import InventoryTypeChart from "components/InventoryTypeChart";
import InventoryPieChart from "components/InventoryPieChart";

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

            <SalesPieChart />

          </GridItem>
        </GridContainer>

        <GridContainer>

          <GridItem xs={12} sm={12} md={6}>

            <InventoryTypeChart />
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>

          <InventoryPieChart />

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
