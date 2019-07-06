import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomerSalesList from "components/CustomerSalesList";

import fire from '../firebase'
const database = fire.firestore()

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class CustomerProfile extends Component {

  state ={
    address:'',
    city:'',
    name:'',
    state:'',
    type:'',
    phone:'',
    email:''
    }

  componentDidMount(){

  //const { productName } = this.props.location.state
  // Initial call for flowers list

  const { customerId } = this.props.location.state

  database.collection('customers').doc(customerId)
  .get().then(doc => {
    if (doc.exists) {

      this.setState({
        name: doc.data().name,
        address:doc.data().address,
        city:doc.data().city,
        state:doc.data().state,
        type:doc.data().type,
        customerImg:doc.data().customerImg,
        phone:doc.data().phone,
        email:doc.data().email
       });

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

  }

  render() {
  const { classes } = this.props;
  const { customerId } = this.props.location.state
  const { address, city, name, state, customerImg,type, phone, email } = this.state;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>

        <CustomerSalesList customerId={customerId} />

        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={customerImg} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h5 className={classes.cardCategory}>{type}</h5>
              <h3 className={classes.cardTitle}>{name}</h3>
              <p className={classes.description}>
                {address}
              </p>
              <p className={classes.description}>
                {city}, {state}
              </p>

              <p className={classes.description}>
                {phone}
              </p>
              <p className={classes.description}>
                {email}
              </p>

              <Link to={{
                pathname: "customer_update",
                state:
                  { customerId }
                }}>
              <Button color="info" round>
                Update
              </Button>
              </Link>

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
 }
}

CustomerProfile.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(CustomerProfile));
