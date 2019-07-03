import React,{Component} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import fire from '../firebase'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};



const database = fire.firestore()

class ProductList extends Component {

  state = {
    data:[]
  }
  componentDidMount(){

  // Initial call for products list
  const products = []
  database.collection('products').get()
  .then((snapshot) => {

    snapshot.forEach((doc) => {

      const item = [
        doc.data().name,
        doc.data().price,
        doc.data().inventory,
      ]

        products.push(item)

      });

    this.setState({
      data:products
    });

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

  database.collection('products')
  .onSnapshot(snapshot => {
      const products = []

      snapshot.forEach(doc => {

        const item = [
          doc.data().name,
          doc.data().price,
          doc.data().inventory,
        ]

          products.push(item)

        });

      this.setState({
        data:products
      });

      });


}

  render(){
      const { classes } = this.props;
      const { data } = this.state
      console.log('render',data)
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Products</h4>
            <p className={classes.cardCategoryWhite}>
              All Sales by Name
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Product", "Price", "Inventory"]}
              tableData={data}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>

      </GridItem>
    </GridContainer>
  );
}
}

ProductList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ProductList);
