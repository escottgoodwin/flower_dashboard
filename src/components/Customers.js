import React from "react";
// nodejs library to set properties for components
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import Accessibility from "@material-ui/icons/Accessibility";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import fire from '../firebase'
const database = fire.firestore()

class Customers extends React.Component {
  state = {
    count: 0
  };

  componentDidMount(){

  // Initial call for flowers list
  const customers = []
  database.collection('customers').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const customer = {docId:doc.id,
      name:doc.data().name,
      uid:doc.data().uid
      }

      customers.push(customer)
    });
    this.setState({count:customers.length})
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a flower is added
  database.collection("customers")
  .onSnapshot(snapshot => {
      let customers = [];

      snapshot.forEach(doc => {
        const customer = {docId:doc.id,
        name:doc.data().name,
        uid:doc.data().uid
        }

        customers.push(customer)
      });

      this.setState({
        count:customers.length
      });
    });

  }

  render() {
    const { classes } = this.props;
    const { count } = this.state

    return (

<Card>
  <CardHeader color="info" stats icon>
    <CardIcon color="info">
      <Accessibility />
    </CardIcon>
    <p className={classes.cardCategory}>Customers</p>
    <h3 className={classes.cardTitle}>
    {count}
    </h3>

  </CardHeader>
  <CardFooter stats>
    <div className={classes.stats}>
    Last Added
    </div>
  </CardFooter>
</Card>

)
}
}

export default withStyles(dashboardStyle)(Customers)
