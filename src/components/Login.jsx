import React,{Component} from "react";
import firebase from 'firebase/app';
import 'firebase/auth'
import { Link } from 'react-router-dom'
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import AddAlert from "@material-ui/icons/AddAlert";
//core components
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Email from '@material-ui/icons/Email';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Google, Twitter } from 'mdi-material-ui'

import fire from '../firebase'

import logo from "assets/img/flower_2.png";
import bkImg from "assets/img/flower-field-3.jpg";

var google = new firebase.auth.GoogleAuthProvider();

var facebook = new firebase.auth.FacebookAuthProvider();

var twitter = new firebase.auth.TwitterAuthProvider();

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
    color: "black",
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


class Login extends Component {

  state = {
    name:'',
    email:'',
    password:'',
    showPassword: false,
    showError:false,
    errorMessage:'',
    open:false
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  googleSignIn = (props) => {

    fire.auth().signInWithPopup(google).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.

      props.history.push(`/admin/dashboard`)

      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorMessage = error.message;
      this.setState({errorMessage,open:true})

    });

  }

  facebookSignIn = (props) => {
    fire.auth().signInWithPopup(facebook).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.

  props.history.push(`/admin/dashboard`)

  // ...
}).catch((error) => {
  // Handle Errors here.
  var errorMessage = error.message;
  this.setState({errorMessage,open:true})
  // ...
});

  }

  twitterSignIn = (props) => {
    fire.auth().signInWithPopup(twitter).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.

  props.history.push(`/admin/dashboard`)

  // ...
}).catch((error) => {
  // Handle Errors here.
  var errorMessage = error.message;
  this.setState({errorMessage,open:true})
  // ...
});
}

emailSignIn = (props) => {
  const { email, password } = this.state

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(result) {

  props.history.push(`/admin/dashboard`)

  // ...
  }).catch((error) => {
  // Handle Errors here.
  var errorMessage = error.message;

  this.setState({errorMessage,open:true})
  // ...
  });

}

  render(){
      const { classes } = this.props;
      const { email, password, showPassword, showError, errorMessage, open } = this.state

  return (
  <div style={{
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor:'#36454f'}} >

    <div style={{paddingRight:'30%',paddingLeft:'30%',paddingTop:'10%',paddingBottom:'10%'}} >

    <center>

    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>

        <Card>
        <center>
          <CardHeader color="info">
          <div>
          <img src={logo} alt='logo' width="50" height="50"/>

          </div>
          <div>  <h4 className={classes.cardTitleWhite}>Flower Shop Login</h4></div>
            <div>

            <IconButton >  <Google /> </IconButton>

            <IconButton >  <Twitter /> </IconButton>

            <IconButton >
            <img src="https://img.icons8.com/material/24/000000/facebook-f.png" alt='facebook logo'/>
            </IconButton>
            </div>
          </CardHeader>
          </center>
          <CardBody>

          <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          <TextField
              id="outlined-full-width"
              label="Email"
              fullWidth
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              margin="normal"
              InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              )
            }}
            />
          </GridItem>
          </GridContainer>

          <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          <TextField
            id="filled-adornment-password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          </GridItem>
          </GridContainer>

          </CardBody>
          <CardBody>
            <Button onClick={() => this.emailSignIn(this.props)} color="info">Login</Button>
          </CardBody>


        </Card>
      </GridItem>


    </GridContainer>

                <Snackbar
                    place='tc'
                    color='danger'
                    icon={AddAlert}
                    message={errorMessage}
                    open={open}
                    closeNotification={() => this.setState({open:false})}
                    close
                />
              
    </center>

    </div>
    </div>
  );
}
}

Login.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(withRouter(Login));
