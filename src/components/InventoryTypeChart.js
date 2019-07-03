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

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import fire from '../firebase'

var Chartist = require("chartist");

const db = fire.firestore()

function groupBy(arr, criteria) {
   return arr.reduce(function (obj, item) {

// Check if the criteria is a function to run on the item or a property of it
var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

// If the key doesn't exist yet, create it
  if (!obj.hasOwnProperty(key)) {
    obj[key] = [];
  }

  // Push the value to the object
  obj[key].push(item);

  // Return the object to the next item in the loop
  return obj;

}, {});
};


function chartSeries(products){
  const names = products.map(p => p.name)

  const inventory = products.map(p => p.inventory)

  const max = inventory.reduce(function(a, b) {
    return Math.max(a, b);
    });

  const data = {labels:names,series:[inventory],max}

  return { labels:names, series:[inventory], max }
}


class InventoryTypeChart extends React.Component {
  state = {
    productNames:[],
    inventory: [],
    data:{}
  };

  componentDidMount(){

  // Initial call for products list
  const products = []
  db.collection('products').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const product = {
        docId:doc.id,
        name:doc.data().name,
        inventory: doc.data().inventory,
        price:doc.data().price,
        productImg:doc.data().productImg,
        uid:doc.data().uid
      }

      products.push(product)
    });

    const data = chartSeries(products)
    this.setState({data})

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });




  //listener that updates if a product is added
  db.collection("products")
  .onSnapshot(snapshot => {
      let products = [];

      snapshot.forEach(doc => {
        const product = {
          docId:doc.id,
          name:doc.data().name,
          inventory: doc.data().inventory,
          price:doc.data().price,
          productImg:doc.data().productImg,
          uid:doc.data().uid
        }
        products.push(product)
      });

      const data = chartSeries(products)
      this.setState({data})

    });

  }

  render() {
    const { classes } = this.props;
    const { productNames, inventory, data } = this.state

    const options={
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: data.max*1.2, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }

    return (

      <Card chart>
        <CardHeader color="warning">
          <ChartistGraph
            className="ct-chart"
            data={data}
            type="Bar"
            options={options}
            responsiveOptions={emailsSubscriptionChart.responsiveOptions}
            listener={emailsSubscriptionChart.animation}
          />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Inventory - Flower Type</h4>
          <p className={classes.cardCategory}>
            Last Campaign Performance
          </p>
        </CardBody>
        <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> campaign sent 2 days ago
          </div>
        </CardFooter>
      </Card>

)
}
}

export default withStyles(dashboardStyle)(InventoryTypeChart)
