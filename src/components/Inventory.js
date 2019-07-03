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
const database = fire.firestore()

class Inventory extends React.Component {
  state = {
    inventory: 0
  };

  componentDidMount(){

  // Initial call for products list
  const products = []
  database.collection('products').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const product = {
        docId:doc.id,
        name:doc.data().name,
        price:doc.data().price,
        inventory:doc.data().inventory,
        productImg:doc.data().productImg,
        uid:doc.data().uid
      }

      products.push(product)
    });
    const productslist = products.map(s => parseFloat(s.inventory))

    const productsSum =  productslist.reduce((a,b) => a + b, 0)

    this.setState({
      inventory:productsSum
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a product is added
  database.collection("products")
  .onSnapshot(snapshot => {
      let products = [];

      snapshot.forEach(doc => {
        const product = {
          docId:doc.id,
          name:doc.data().name,
          price:doc.data().price,
          inventory:doc.data().inventory,
          productImg:doc.data().productImg,
          uid:doc.data().uid
        }

        products.push(product)
      });

      const productslist = products.map(s => parseFloat(s.inventory))

      const productsSum =  productslist.reduce((a,b) => a + b, 0)

      this.setState({
        inventory:productsSum
      });
    });

  }

  render() {
    const { classes } = this.props;
    const { inventory } = this.state

    return (

      <Card>
        <CardHeader color="warning" stats icon>
          <CardIcon color="warning">
            <Icon>content_copy</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>Inventory</p>
          <h3 className={classes.cardTitle}>
            {inventory}
          </h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <Danger>
              <Warning />
            </Danger>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              Add Inventory
            </a>
          </div>
        </CardFooter>
      </Card>

)
}
}

export default withStyles(dashboardStyle)(Inventory)
