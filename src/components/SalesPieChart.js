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

import fire from '../firebase'

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

  return {
    labels:Object.keys(grouped),
    series:valueSeries,
  }
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
    return (

      <Card chart>
        <CardHeader color="success">
          <ChartistGraph
            className="ct-chart"
            data={data}
            type="Pie"
            options={options}
            responsiveOptions={responsiveOptions}
          />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Sales - Flower Type</h4>
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

export default withStyles(dashboardStyle)(SalesTypeChart)
