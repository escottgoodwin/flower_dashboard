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



const db = fire.firestore()

class SalesList extends Component {

  state = {
    data:[]
  }
  componentDidMount(){

  // Initial call for sales list
  const sales = []
  db.collection('sales').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const sale = {
        docId:doc.id,
        productName:doc.data().productName,
        productId:doc.data().productId,
        price:doc.data().price,
        productImg:doc.data().productImg,
        customer:doc.data().customer,
        customerId:doc.data().customerId,
        salesmanId:doc.data().salesmanId,
        salesman:doc.data().salesman,
        uid:doc.data().uid
      }

      sales.push(sale)
    });

    const data = sales.map(s => [s.customer, s.productName, s.price, s.salesman])
    this.setState({
      data
    });

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a sale is added
  db.collection("sales")
  .onSnapshot(snapshot => {
      let sales = [];

      snapshot.forEach(doc => {

        const sale = {
          docId:doc.id,
          productName:doc.data().productName,
          productId:doc.data().productId,
          price:doc.data().price,
          productImg:doc.data().productImg,
          customer:doc.data().customer,
          customerId:doc.data().customerId,
          salesmanId:doc.data().salesmanId,
          salesman:doc.data().salesman,
          uid:doc.data().uid
        }

        sales.push(sale)
      });

      const data = sales.map(s => [s.customer, s.productName, s.price, s.salesman])

      this.setState({
        data
      });
    });

  }

  render(){
      const { classes } = this.props;
      const { data } = this.state

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Sales</h4>
            <p className={classes.cardCategoryWhite}>
              All Sales by Company
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Company", "Product", "Price", "Salesman"]}
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

SalesList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(SalesList);
