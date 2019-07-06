import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

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

class CustomerUpdateProfile extends Component {

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

        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
            <p className={classes.cardCategoryWhite}>Complete your profile</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Company (disabled)"
                  id="company-disabled"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Username"
                  id="username"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Email address"
                  id="email-address"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="First Name"
                  id="first-name"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Last Name"
                  id="last-name"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="City"
                  id="city"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Country"
                  id="country"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Postal Code"
                  id="postal-code"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                <CustomInput
                  labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                  id="about-me"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="info">Update Profile</Button>
          </CardFooter>
        </Card>

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

export default withStyles(styles)(withRouter(CustomerUpdateProfile));
