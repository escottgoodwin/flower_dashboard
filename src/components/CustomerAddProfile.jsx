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
import TextField from '@material-ui/core/TextField';
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import fire from '../firebase'
const db = fire.firestore()

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

class CustomerAddProfile extends Component {

  state ={
    address:'',
    city:'',
    name:'',
    state:'',
    type:'',
    phone:'',
    email:'',
    customerImg:''
    }

    addCustomer = () => {

      const { address, city, name, state, customerImg,type, phone, email } = this.state;

      db.collection("customers").add({
      address:address,
      city:city,
      name:name,
      state:state,
      customerImg:customerImg,
      type:type,
      phone:phone,
      email:email
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
      this.props.history.push(`dashboard`)
    }

  render() {
  const { classes } = this.props;
  const { address, city, name, state, customerImg,type, phone, email, notes } = this.state;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>

        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Add Customer</h4>
            <p className={classes.cardCategoryWhite}>Add profile</p>
          </CardHeader>
          <CardBody>
            <GridContainer>

              <GridItem xs={12} sm={12} md={6}>
              <TextField
                  id="outlined-full-width"
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                  margin="normal"
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>

              <TextField
                  id="outlined-full-width"
                  label="Business Type"
                  fullWidth
                  value={type}
                  onChange={e => this.setState({ type: e.target.value })}
                  margin="normal"
                />


              </GridItem>
            </GridContainer>

            <GridContainer>
            <GridItem xs={12} sm={12} md={6}>

            <TextField
                id="outlined-full-width"
                label="Email"
                fullWidth
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                margin="normal"
              />


            </GridItem>
            <GridItem xs={12} sm={12} md={6}>

            <TextField
                id="outlined-full-width"
                label="Phone"
                fullWidth
                value={phone}
                onChange={e => this.setState({ phone: e.target.value })}
                margin="normal"
              />

            </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
            <TextField
                id="outlined-full-width"
                label="Address"
                fullWidth
                value={address}
                onChange={e => this.setState({ address: e.target.value })}
                margin="normal"
              />

              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
              <TextField
                  id="outlined-full-width"
                  label="City"
                  fullWidth
                  value={city}
                  onChange={e => this.setState({ city: e.target.value })}
                  margin="normal"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <TextField
                  id="outlined-full-width"
                  label="State"
                  fullWidth
                  value={state}
                  onChange={e => this.setState({ state: e.target.value })}
                  margin="normal"
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>

                <TextField
                    id="outlined-full-width"
                    label="Image"
                    fullWidth
                    value={customerImg}
                    onChange={e => this.setState({ customerImg: e.target.value })}
                    margin="normal"
                  />

              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>

                <InputLabel style={{ color: "#AAAAAA" }}>Notes</InputLabel>
                <TextField
                    id="outlined-full-width"
                    multiline
                    max="5"
                    label="Notes"
                    fullWidth
                    value={notes}
                    onChange={e => this.setState({ notes: e.target.value })}
                    margin="normal"
                  />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button
            onClick={this.updateProfile}
            color="info">Add Profile</Button>
          </CardFooter>
        </Card>

        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
          {customerImg.length>0 &&
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={customerImg} alt="..." />
              </a>
            </CardAvatar>
           }
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

CustomerAddProfile.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(CustomerAddProfile));
