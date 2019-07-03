import React from "react";
// nodejs library to set properties for components
import { Link } from "react-router-dom";

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
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

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

function personSalesList(arr){
    let custs = []
    for (const [ key, value ] of Object.entries(arr)) {
      const number = value.map(c => c.price).length
      const sales = value.map(p => parseFloat(p.price)).reduce((a,b) => a + b, 0)
      let item = [key,sales,number]
      custs.push(item)

    }
    return custs
}


function chartSeries(grouped){
  const values = Object.values(grouped)
  const valueSeries = values.map(v => v.map(s => parseFloat(s.price)).reduce((a,b) => a + b, 0))

  const max = valueSeries.reduce(function(a, b) {
    return Math.max(a, b);
    });
  return {
    labels:Object.keys(grouped),
    series:[valueSeries],
    max:max
  }
}

function personSalesList1(arr){
    let custs = []
    for (const [ key, value ] of Object.entries(arr)) {
      const number = value.map(c => c.price).length
      const salesmanId = value.map(c => c.salesmanId)[0]
      const sales = value.map(p => parseFloat(p.price)).reduce((a,b) => a + b, 0)
      let item = {salesmanId:salesmanId,name:key,sales:sales,number:number}
      custs.push(item)

    }
    return custs
}

class SalesmenList extends React.Component {
  state = {
    salesmen: []
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


    const groupedSalesmen =  groupBy(sales,'salesman')

    const salesmen = personSalesList1(groupedSalesmen)

    this.setState({
      salesmen
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

      const groupedSalesmen =  groupBy(sales,'salesman')

      const salesmen = personSalesList1(groupedSalesmen)

      this.setState({
        salesmen
      });

    });

  }

  render() {

    const { classes } = this.props;
    const { salesmen } = this.state
    const tableHeaderColor='success'

    return (

      <Card>
        <CardHeader color="success">
          <h4 className={classes.cardTitleWhite}>Salesmen Stats</h4>
          <p className={classes.cardCategoryWhite}>
            New employees on 15th September, 2016
          </p>
        </CardHeader>
        <CardBody>

        <div className={classes.tableResponsive}>
          <Table className={classes.table}>

              <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                <TableRow className={classes.tableHeadRow}>
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}

                >

                  Name
                </TableCell>
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}

                >
                  Amount
                </TableCell>
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}

                >
                  Number
                </TableCell>

                </TableRow>
              </TableHead>

            <TableBody>
              {salesmen.map(p =>

                  <TableRow key={p.name} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell} >
                      <Link to={{
                        pathname: "salesman_profile",
                        state:
                          { salesmanId: p.salesmanId }
                        }}>
                      <div style={{color:'#4CAF50'}}>{p.name}</div>
                      </Link>

                  </TableCell>
                  <TableCell className={classes.tableCell} >
                    {p.sales}
                  </TableCell>
                  <TableCell className={classes.tableCell} >
                    {p.number}
                  </TableCell>

                  </TableRow>

              )}
            </TableBody>
          </Table>
        </div>

        </CardBody>

        <CardBody>
        <center>
        <Link to={{
          pathname: "add_salesman",
          state:
            { salesmanId: '' }
          }}>
        <Button color="success">Add Sales Person</Button>
        </Link>
        </center>
        </CardBody>

      </Card>

)
}
}

export default withStyles(dashboardStyle)(SalesmenList)
