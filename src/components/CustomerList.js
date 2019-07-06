import React from "react";
import { Link } from "react-router-dom";

// nodejs library to set properties for components
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import fire from '../firebase'
const db = fire.firestore()

function groupBy(arr, criteria) {
   return arr.reduce(function (obj, item) {

// Check if the criteria is a function to run on the item or a property of it
var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

// If the key doesn't exist yet, create it
  if (!obj.hasOwnProperty(key)) {
    obj[key] = [];
  }

  // Push the value to the object
  obj[key].push(item);

  // Return the object to the next item in the loop
  return obj;

}, {});
};

function personSalesList1(arr){
    let custs = []
    for (const [ key, value ] of Object.entries(arr)) {
      const number = value.map(c => c.price).length
      const customerId = value.map(c => c.customerId)[0]
      const customerLat = value.map(c => c.customerLat)[0]
      const customerLong = value.map(c => c.customerLong)[0]
      const sales = value.map(p => parseFloat(p.price)).reduce((a,b) => a + b, 0)
      let item = {customerId:customerId,name:key,customerLat:customerLat,customerLong:customerLong,sales:sales,number:number}
      custs.push(item)

    }
    return custs
}

class CustomerList extends React.Component {
  state = {
    custs: []
  };

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
        customerLat:doc.data().customerLat,
        customerLong:doc.data().customerLong,
        salesmanId:doc.data().salesmanId,
        salesman:doc.data().salesman,
        uid:doc.data().uid
      }

      sales.push(sale)
    });


    const groupedCust =  groupBy(sales,'customer')

    const custs = personSalesList1(groupedCust)

    this.setState({
      custs
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
          customerLat:doc.data().customerLat,
          customerLong:doc.data().customerLong,
          salesmanId:doc.data().salesmanId,
          salesman:doc.data().salesman,
          uid:doc.data().uid
        }

        sales.push(sale)
      });

      const groupedCust =  groupBy(sales,'customer')

      const custs = personSalesList1(groupedCust)

      this.setState({
        custs
      });

    });

  }

  render() {
    const { classes } = this.props;
    const { custs } = this.state
    const tableHeaderColor = 'info'

    return (

      <Card>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>Customer Stats</h4>
          <p className={classes.cardCategoryWhite}>
            New employees on 15th September, 2016
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
                  Name
                </TableCell>
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}

                >
                  Amount
                </TableCell>
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}

                >
                  Number
                </TableCell>

                </TableRow>
              </TableHead>


            <TableBody>
              {custs.map(p =>

                  <TableRow key={p.name} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell} >
                      <Link to={{
                        pathname: "customer_profile",
                        state:
                          { customerId: p.customerId }
                        }}>
                      <div style={{color:'#00BCD4'}}>{p.name}</div>
                      </Link>

                  </TableCell>
                  <TableCell className={classes.tableCell} >
                    {p.sales}
                  </TableCell>
                  <TableCell className={classes.tableCell} >
                    {p.number}
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
          pathname: "add_customer",
          state:
            { salesmanId: '' }
          }}>

        <Button color="info">Add Customer</Button>

        </Link>
        </center>
        </CardBody>
      </Card>

)
}
}

export default withStyles(dashboardStyle)(CustomerList)
