import React from "react";
// nodejs library to set properties for components
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


import {
  emailsSubscriptionChart,
} from "variables/charts.jsx";

import fire from '../firebase'

var Chartist = require("chartist");

const db = fire.firestore()

function chartSeries(products){
  const names = products.map(p => p.name)
  const inventory = products.map(p => p.inventory)
  const max = inventory.reduce(function(a, b) {
    return Math.max(a, b);
    });

  return { labels:names, series:inventory, max }
}

var responsiveOptions = [
  ['screen and (min-width: 640px)', {
    chartPadding: 10,
    labelOffset: 10,
    labelDirection: 'explode',
    labelInterpolationFnc: function(value) {
      return value;
    }
  }],
  ['screen and (min-width: 1024px)', {
    labelOffset: 40,
    chartPadding: 5
  }]
];



var options = {
  labelInterpolationFnc: function(value) {
    return value[0]
  }
};



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
    const { data } = this.state
    console.log(data)
    return (

      <Card chart>
        <CardHeader color="warning">
        <ChartistGraph
          data={data}
          type="Pie"
          options={options}
          responsiveOptions={responsiveOptions}
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
