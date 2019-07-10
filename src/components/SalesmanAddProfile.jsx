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
import TextField from '@material-ui/core/TextField';
import Card from "components/Card/Card.jsx";
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

class SalesmanAddProfile extends Component {

  state ={
    title:'',
    office:'',
    name:'',
    phone:'',
    email:'',
    userImg:'',
    notes:''
    }

  componentDidMount(){

  //const { productName } = this.props.location.state
  // Initial call for flowers list

}

addProfile = () => {
  const { name, office, userImg, title, phone, email } = this.state;

  db.collection("users").add({
  name:name,
  title:title,
  userImg:userImg,
  office:office,
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
  const { name, office, userImg, title, phone, email, notes } = this.state;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>

        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Edit Salesman Profile</h4>
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
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={e => this.setState({ title: e.target.value })}
                  margin="normal"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
              <TextField
                  id="outlined-full-width"
                  label="Office"
                  fullWidth
                  value={office}
                  onChange={e => this.setState({ office: e.target.value })}
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
                    label="Image"
                    fullWidth
                    value={userImg}
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
            onClick={this.addProfile}
            color="success">Add Profile</Button>
          </CardFooter>
        </Card>

        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
          {userImg.length>0 &&
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={userImg} alt="..." />
              </a>
            </CardAvatar>
          }
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


            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
 }
}

SalesmanAddProfile.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(SalesmanAddProfile));
