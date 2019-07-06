import React, {Component} from "react";
import {withRouter, Link } from 'react-router-dom'
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import TextField from '@material-ui/core/TextField';
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

class ProductUpdateProfile extends Component {

  state ={
    name:'',
    inventory:'',
    price:'',
    productImg:'',
  }

  componentDidMount(){

  //const { productName } = this.props.location.state
  // Initial call for flowers list

  const { productId } = this.props.location.state

  database.collection('products').doc(productId)
  .get().then(doc => {
    if (doc.exists) {

      this.setState({
        name: doc.data().name,
        inventory:doc.data().inventory,
        price:doc.data().price,
        productImg:doc.data().productImg,
        notes:''
       });

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

  }

  updateProfile = () => {

    const { inventory, price, productImg } = this.state;
    const { productId } = this.props.location.state

    database.collection('products')
    .doc(productId)
    .update({
      inventory:inventory,
      price:price,
      productImg: productImg,
  }).then(function() {
      console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });

  this.props.history.push({
    pathname: `/admin/product_profile`,
    state: { productId  }
    })
  }

  render() {
  const { classes } = this.props;
  const { productId } = this.props.location.state
  const { name, inventory, price, productImg, notes } = this.state;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>

        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Edit Product Profile</h4>
            <p className={classes.cardCategoryWhite}>Update your profile</p>
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

              <GridItem xs={12} sm={12} md={3}>
              <TextField
                  id="outlined-full-width"
                  label="Price"
                  fullWidth
                  value={price}
                  onChange={e => this.setState({ price: e.target.value })}
                  margin="normal"
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
              <TextField
                  id="outlined-full-width"
                  label="Inventory"
                  fullWidth
                  value={inventory}
                  onChange={e => this.setState({ inventory: e.target.value })}
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
                    value={productImg}
                    onChange={e => this.setState({ userImg: e.target.value })}
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
            color="warning">Update</Button>
          </CardFooter>
        </Card>


        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
            <Link to={{
              pathname: "product_profile",
              state:
                { productId }
              }}>
                <img src={productImg} alt="..." />
              </Link>
            </CardAvatar>
            <CardBody profile>
              <h5 className={classes.cardCategory}>Price: ${price}</h5>
              <h3 className={classes.cardTitle}>{name}</h3>
              <p className={classes.description}>
                Inventory: {inventory}
              </p>


            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
 }
}

ProductUpdateProfile.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(ProductUpdateProfile));
