import React, { Component } from "react";
import { Link } from 'react-router-dom'
import moment from 'moment'

import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Modal from '@material-ui/core/Modal';
import Card from "components/Card/Card.jsx";
import LeadCard from "components/LeadCard";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import fire from '../firebase'

const db = fire.firestore()

function phaseDate(phase){
  let updateDates = {}
  const now = new Date()
  switch(phase) {
    case 'news':
      updateDates = {
        phase:phase,
        newPhaseDate:now,
        callPhaseDate:null,
        closePhaseDate:null
      }
      break;
    case 'calls':
      updateDates = {
        phase:phase,
        callPhaseDate:now,
        closePhaseDate:null
      }
      break;

    case 'closes':
      updateDates = {
        phase:phase,
        closePhaseDate:now
      }
      break;
    default:
      break;
  }
  return updateDates
}

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


class Leads extends React.Component {

  state = {
    news:[],
    calls:[],
    closes:[],
    draggedId:null
  };

  componentDidMount(){

  const news = []
  db.collection('leads').where('phase','==','news')
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const event = {
        id:doc.id,
        name:doc.data().name,
        company:doc.data().company,
        phone:doc.data().phone,
        phase:doc.data().phase,
        callPhaseDate:doc.data().callPhaseDate,
        newPhaseDate:doc.data().newPhaseDate,
        closePhaseDate:doc.data().closePhaseDate,
      }
      news.push(event)
    })

      this.setState({news})
  })

    db.collection('leads').where('phase','==','news')
    .onSnapshot(snapshot => {
      let news = [];

      snapshot.forEach(doc => {
        const event = {
          id:doc.id,
          name:doc.data().name,
          company:doc.data().company,
          phone:doc.data().phone,
          phase:doc.data().phase,
          callPhaseDate:doc.data().callPhaseDate,
          newPhaseDate:doc.data().newPhaseDate,
          closePhaseDate:doc.data().closePhaseDate,
        }
        news.push(event)
      })

        this.setState({news})

    });

    //call

    const calls = []
    db.collection('leads').where('phase','==','calls')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {

        const event = {
          id:doc.id,
          name:doc.data().name,
          company:doc.data().company,
          phone:doc.data().phone,
          phase:doc.data().phase,
          callPhaseDate:doc.data().callPhaseDate,
          newPhaseDate:doc.data().newPhaseDate,
          closePhaseDate:doc.data().closePhaseDate,
        }
        calls.push(event)
      })

        this.setState({calls})
    })

      db.collection('leads').where('phase','==','calls')
      .onSnapshot(snapshot => {
        let calls = [];

        snapshot.forEach(doc => {
          const event = {
            id:doc.id,
            name:doc.data().name,
            company:doc.data().company,
            phone:doc.data().phone,
            phase:doc.data().phase,
            callPhaseDate:doc.data().callPhaseDate,
            newPhaseDate:doc.data().newPhaseDate,
            closePhaseDate:doc.data().closePhaseDate,
          }
          calls.push(event)
        });

        this.setState({calls})

      });



      //close

      const closes = []
      db.collection('leads').where('phase','==','closes')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {

          const event = {
            id:doc.id,
            name:doc.data().name,
            company:doc.data().company,
            phone:doc.data().phone,
            phase:doc.data().phase,
            callPhaseDate:doc.data().callPhaseDate,
            newPhaseDate:doc.data().newPhaseDate,
            closePhaseDate:doc.data().closePhaseDate,
          }
          closes.push(event)
        })

          this.setState({closes})
      })

        db.collection('leads').where('phase','==','closes')
        .onSnapshot(snapshot => {
          let closes = [];

          snapshot.forEach(doc => {
            const event = {
              id:doc.id,
              name:doc.data().name,
              company:doc.data().company,
              phone:doc.data().phone,
              phase:doc.data().phase,
              callPhaseDate:doc.data().callPhaseDate,
              newPhaseDate:doc.data().newPhaseDate,
              closePhaseDate:doc.data().closePhaseDate,
            }
            closes.push(event)
          });

          this.setState({closes})

        });

  }

  onDrag = (event, leadId) => {
    event.preventDefault();
    this.setState({
      draggedId: leadId
    });
  }

  onDrop = (event,phase) => {
    const { draggedId, leads } = this.state;

    const updated = phaseDate(phase)

    db.collection("leads").doc(draggedId).update(updated)
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

    }

  render() {
    const { classes } = this.props;
    const { news, calls, closes } = this.state

    return(
      <>

      <div>
      <GridContainer>

        <GridItem xs={12} sm={12} md={4}>

        <Card
          onDragOver={e => e.preventDefault()}
          onDrop={event => this.onDrop(event,'news')}
        >
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>New Leads

            <Link to={{
              pathname: "add_lead",
              state:
                {  }
              }}>
            <Button style={{color:'green'}}>Add Lead</Button>
            </Link>

             </h4>
          </CardHeader>

        <CardBody style={{minHeight:'70vh'}}>

          {
            news.map(l =>
              <LeadCard onDrag={this.onDrag} {...l} />
            )
          }

        </CardBody>

        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={4}>

      <Card
        onDragOver={e => e.preventDefault()}
        onDrop={event => this.onDrop(event,'calls')}
      >
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>Contact</h4>
        </CardHeader>

      <CardBody style={{minHeight:'70vh'}}>

        {
          calls.map(l =>
            <LeadCard onDrag={this.onDrag} {...l} />
          )
        }

      </CardBody>

      </Card>
    </GridItem>

    <GridItem xs={12} sm={12} md={4}>

    <Card
      onDragOver={e => e.preventDefault()}
      onDrop={event => this.onDrop(event,'closes')}
    >
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Closed Leads</h4>
      </CardHeader>

    <CardBody style={{minHeight:'70vh'}}>

      {
        closes.map(l =>
          <LeadCard onDrag={this.onDrag} {...l} />
        )
      }

    </CardBody>

    </Card>
  </GridItem>

  </GridContainer>

  </div>

    </>
    );
  }
}

export default withStyles(styles)(Leads);
