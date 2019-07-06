import React, {Component} from "react";
import { withRouter, Link} from 'react-router-dom'

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
import ProductSalesList from "components/ProductSalesList";

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

class ProductProfile extends Component {

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
        productImg:doc.data().productImg
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
  const { productId } = this.props.location.state
  const { name, inventory, price, productImg } = this.state;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>

        <ProductSalesList productId={productId} />

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

              <Link to={{
                pathname: "product_update",
                state:
                  { productId }
                }}>
              <Button
              color="warning" round>
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

ProductProfile.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(ProductProfile));
