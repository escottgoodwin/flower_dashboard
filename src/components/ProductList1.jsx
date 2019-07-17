import React,{Component} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

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
    data:[],
    products:[]
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
      data:products,
      products
    });

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

  database.collection('products')
  .onSnapshot(snapshot => {
      const products = []

      snapshot.forEach(doc => {

        const item = {
          productId:doc.id,
          name:doc.data().name,
          price:doc.data().price,
          inventory:doc.data().inventory,
        }

          products.push(item)

        });

      this.setState({
        data:products,
        products
      });

      });
}

  render(){
      const { classes } = this.props;
      const { products } = this.state
      const tableHeaderColor='success'

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Products</h4>
            <p className={classes.cardCategoryWhite}>
              All Sales by Name
            </p>
          </CardHeader>
          <CardBody>
          <div className={classes.tableResponsive}>
            <Table className={classes.table}>

                <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                  <TableRow className={classes.tableHeadRow}>
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}

                  >
                    Product
                  </TableCell>
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}

                  >
                    Price
                  </TableCell>
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}

                  >
                    Inventory
                  </TableCell>

                  </TableRow>
                </TableHead>

              <TableBody>
                {products.map((p,index) =>

                    <TableRow key={index} className={classes.tableBodyRow}>
                    <TableCell className={classes.tableCell} >
                        <Link to={{
                          pathname: "product_profile",
                          state:
                            { productId: p.productId }
                          }}>
                        <div style={{color:'#FF9800'}}>{p.name}</div>
                        </Link>

                    </TableCell>
                    <TableCell className={classes.tableCell} >
                      {p.price}
                    </TableCell>
                    <TableCell className={classes.tableCell} >
                      {p.inventory}
                    </TableCell>

                    </TableRow>

                )}
              </TableBody>
            </Table>
          </div>



          </CardBody>

          <CardBody>
          <center>
          <Link to={{
            pathname: "add_product",
            state:
              { salesmanId: '' }
            }}>
          <Button color="warning">Add Product</Button>
          </Link>
          </center>
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
