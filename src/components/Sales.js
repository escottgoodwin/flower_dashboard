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

import fire from '../firebase'
const db = fire.firestore()

class Sales extends React.Component {
  state = {
    total: 0,
    number:0
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

    const saleslist = sales.map(s => parseFloat(s.price))

    const salesSum =  saleslist.reduce((a,b) => a + b, 0)

    this.setState({
      number:sales.length,
      total:salesSum
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

      const saleslist = sales.map(s => parseFloat(s.price))

      const salesSum =  saleslist.reduce((a,b) => a + b, 0)

      this.setState({
        number:sales.length,
        total:salesSum
      });
    });

  }

  render() {
    const { classes } = this.props;
    const { total, number } = this.state

    return (

      <Card>
        <CardHeader color="success" stats icon>
          <CardIcon color="success">
            <Store />
          </CardIcon>
          <p className={classes.cardCategory}>Revenue</p>
          <h3 className={classes.cardTitle}>${total}</h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <DateRange />
            Number: {number}
          </div>
        </CardFooter>
      </Card>

)
}
}

export default withStyles(dashboardStyle)(Sales)
