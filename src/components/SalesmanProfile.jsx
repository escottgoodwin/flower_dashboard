import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import { Link } from "react-router-dom";
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
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import SalesmanSalesList from "components/SalesmanSalesList";

import avatar from "assets/img/faces/marc.jpg";

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

class SalesmanProfile extends Component {

  state ={
    title:'',
    office:'',
    name:'',
    phone:'',
    email:'',
    userImg:''
    }

  componentDidMount(){

  //const { productName } = this.props.location.state
  // Initial call for flowers list
  const { salesmanId } = this.props.location.state

  database.collection('users')
  .where("uid", "==", salesmanId)
  .get()
  .then((snapshot) => {
      snapshot.forEach((doc) => {

      this.setState({
        docId:doc.id,
        name: doc.data().name,
        title:doc.data().title,
        office:doc.data().office,
        phone:doc.data().phone,
        email:doc.data().email,
        userImg: doc.data().userImg,
        uid:doc.data().uid
       });

})
})
.catch(function(error) {
    console.log("Error getting document:", error);

})
}

  render() {
  const { classes } = this.props;
  const { salesmanId } = this.props.location.state
  const { name, office, userImg, title, phone, email, uid } = this.state;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>

        <SalesmanSalesList salesmanId={salesmanId} />

        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={userImg} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h5 className={classes.cardCategory}>{title}</h5>
              <h3 className={classes.cardTitle}>{name}</h3>
              <p className={classes.description}>
                {office}
              </p>

              <p className={classes.description}>
                {phone}
              </p>
              <p className={classes.description}>
                {email}
              </p>

              <Link to={{
                pathname: "salesman_update",
                state:
                  { salesmanId: uid }
                }}>
              <Button
              color="success" round>
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

SalesmanProfile.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(SalesmanProfile));
