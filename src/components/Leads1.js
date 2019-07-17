import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import LeadColumn from "components/LeadColumn";

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

const columns = [
  {name:'news',color:'success'},
  {name:'calls',color:'primary'},
  {name:'closes',color:'info'}
]

function createState(columns){
  const states = { draggedId:null }
  columns.forEach(function(c){ states[c.name]=[] });
  return states
}

const states = createState(columns)

class Leads extends Component {

  state = states

  leadState = (name) => {
    const leadRef = db.collection('leads').where('phase','==',name)

    const leads = []

    leadRef.get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {

        const event = {
          id:doc.id,
          name:doc.data().name,
          company:doc.data().company,
          phone:doc.data().phone,
          phase:doc.data().phase,
          leadImg:doc.data().leadImg,
          callPhaseDate:doc.data().callPhaseDate,
          newPhaseDate:doc.data().newPhaseDate,
          closePhaseDate:doc.data().closePhaseDate,
        }
        leads.push(event)
      })
      this.setState({[name]: leads })
    })

    leadRef.onSnapshot(snapshot => {
      let leads = [];

      snapshot.forEach(doc => {
        const event = {
          id:doc.id,
          name:doc.data().name,
          company:doc.data().company,
          phone:doc.data().phone,
          phase:doc.data().phase,
          leadImg:doc.data().leadImg,
          callPhaseDate:doc.data().callPhaseDate,
          newPhaseDate:doc.data().newPhaseDate,
          closePhaseDate:doc.data().closePhaseDate,
        }
        leads.push(event)
      })

        this.setState({[name]: leads })

    });

  }

  componentDidMount(){
    columns.map(c => this.leadState(c.name))
  }

  onDrag = (event, leadId) => {
    event.preventDefault();
    this.setState({draggedId: leadId});
  }

  onDrop = (event, phase) => {
    const { draggedId } = this.state;
    const updated = phaseDate(phase)
    db.collection("leads").doc(draggedId).update(updated)
    .catch(function(error) {
        console.error("Error updating document: ", error);
    })
  }

  render() {
    const { classes } = this.props;
    return(
      <GridContainer>
      {
        columns.map(c =>
          <LeadColumn
            classes={classes}
            state={this.state}
            name={c.name}
            color={c.color}
            onDrag={this.onDrag}
            onDrop={this.onDrop}
            />
          )
      }
      </GridContainer>
      );
    }
  }

export default withStyles(styles)(Leads);
