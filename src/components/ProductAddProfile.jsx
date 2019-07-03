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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import TextField from '@material-ui/core/TextField';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import ProductSalesList from "components/ProductSalesList";


import avatar from "assets/img/faces/marc.jpg";

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

class ProductAddProfile extends Component {

  state ={
    name:'',
    inventory:'',
    price:'',
    productImg:'',
  }

  addProduct = () => {

    const { name, price, inventory, productImg } = this.state

    db.collection("products").add({
      name: name,
      price: price,
      productImg: productImg,
      inventory:inventory
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    this.props.history.push(`admin/dashboard`)
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
            <h4 className={classes.cardTitleWhite}>Add Product</h4>
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
                    onChange={e => this.setState({ productImg: e.target.value })}
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
            onClick={this.addProduct}
            color="warning">Add</Button>
          </CardFooter>
        </Card>


        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
          {productImg.length>0 &&
            <CardAvatar profile>

                <img src={productImg} alt="..." />

            </CardAvatar>
          }
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

ProductAddProfile.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(ProductAddProfile));
