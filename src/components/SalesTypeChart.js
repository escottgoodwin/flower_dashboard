import React from "react";
// nodejs library to set properties for components
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

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


function chartSeries(grouped,column){
  const values = Object.values(grouped)
  const valueSeries = values.map(v => v.map(s => parseFloat(s[column])).reduce((a,b) => a + b, 0))

  const max = valueSeries.reduce(function(a, b) {
    return Math.max(a, b);
    });
  return {
    labels:Object.keys(grouped),
    series:[valueSeries],
    max:max
  }
}




class SalesTypeChart extends React.Component {
  state = {
    productNames:[],
    sales: [],
    data:{}
  };

  componentDidMount(){

  // Initial call for sales list
  const sales = []
  db.collection('sales').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const sale = {
        docId:doc.id,
        productName:doc.data().productName,
        productId:doc.data().productId,
        price:doc.data().price,
        productImg:doc.data().productImg,
        customer:doc.data().customer,
        customerId:doc.data().customerId,
        salesmanId:doc.data().salesmanId,
        salesman:doc.data().salesman,
        uid:doc.data().uid
      }

      sales.push(sale)
    });

    const grouped =  groupBy(sales,'productName')
    const productGroup = chartSeries(grouped,'price')

    this.setState({
      productNames:productGroup.names,
      sales: productGroup.values,
      data:productGroup

    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a sale is added
  db.collection("sales")
  .onSnapshot(snapshot => {
      let sales = [];

      snapshot.forEach(doc => {

        const sale = {
          docId:doc.id,
          productName:doc.data().productName,
          productId:doc.data().productId,
          price:doc.data().price,
          productImg:doc.data().productImg,
          customer:doc.data().customer,
          customerId:doc.data().customerId,
          salesmanId:doc.data().salesmanId,
          salesman:doc.data().salesman,
          uid:doc.data().uid
        }

        sales.push(sale)
      });

      const grouped =  groupBy(sales,'productName')
      const productGroup = chartSeries(grouped,'price')

      this.setState({
        productNames:productGroup.names,
        sales: productGroup.values,
        data:productGroup
      });
    });

  }

  render() {
    const { classes } = this.props;
    const { data } = this.state

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
        <CardHeader color="success">
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
          <h4 className={classes.cardTitle}>Sales - Flower Type</h4>

        </CardBody>
        <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> Updated 2 days ago
          </div>
        </CardFooter>
      </Card>

)
}
}

export default withStyles(dashboardStyle)(SalesTypeChart)
