import React,{Component} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
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
// core components
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

class ProductSalesList extends Component {

  state = {
    data:[],
    sales:[],
    totalNum:0,
    totalValue:0
  }

  componentDidMount(){

  const { productId } = this.props

  // Initial call for sales list
  const sales = []
  db.collection('sales')
  .where("productId", "==", productId)
  .get()
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

    const totalValue = sales.map(s => parseFloat(s.price)).reduce((a,b) => a + b, 0)
    const totalNum = data.length
    this.setState({
      data,
      sales,
      totalNum,
      totalValue

    });

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


  //listener that updates if a sale is added
  db.collection("sales")
  .where("productId", "==", productId)
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

      const totalValue = sales.map(s => parseFloat(s.price)).reduce((a,b) => a + b, 0)
      const totalNum = data.length
      this.setState({
        data,
        sales,
        totalNum,
        totalValue

      });
    });

  }

  render(){
      const { classes } = this.props;
      const { sales, totalNum, totalValue } = this.state
      const tableHeaderColor = 'success'
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Product Sales - {totalNum} - ${totalValue}</h4>
            <p className={classes.cardCategoryWhite}>
              All Sales by Company
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
                    Customer
                  </TableCell>

                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}

                  >
                    Price
                  </TableCell>

                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}

                  >
                    Salesman
                  </TableCell>

                  </TableRow>
                </TableHead>

              <TableBody>
                {sales.map(s =>

                    <TableRow key={s.customer} className={classes.tableBodyRow}>
                    <TableCell className={classes.tableCell} >
                      {s.customer}
                    </TableCell>

                    <TableCell className={classes.tableCell} >
                      {s.price}
                    </TableCell>
                    <TableCell className={classes.tableCell} >
                      {s.salesman}
                    </TableCell>
                    </TableRow>

                )}
              </TableBody>
            </Table>
          </div>

          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>

      </GridItem>
    </GridContainer>
  );
}
}

ProductSalesList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ProductSalesList);
