import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Modal from '@material-ui/core/Modal';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
import fire from '../firebase'

const localizer = momentLocalizer(moment)
const db = fire.firestore()

class DashboardCalendar extends Component {

  state = {
    events:[],
    modal:false,
    modalTitle:'',
    modalText:'',
    modalId:'',
    addEventModal:'',
    addEventTitle:'',
    addEventStart:null,
    addEventEnd:null,
    addEventDescription:''
  };

  toggle = (event) => {

    this.setState(prevState => ({
      modal: !prevState.modal,
      modalTitle:event.title,
      modalDescription:event.description,
      modalId:event.id
    }));
  }

  toggleAddEvent = (event) => {
    this.setState(prevState => ({
      addEventModal: !prevState.addEventModal,
    }));
  }

  addEvent = () => {
    const { addEventTitle, addEventDescription, addEventStart, addEventEnd } = this.state
    db.collection("events").add({
    title:addEventTitle,
    description:addEventDescription,
    startTime:addEventStart,
    endTime:addEventEnd
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    this.setState(prevState => ({
      addEventModal: !prevState.addEventModal,
      addEventEnd:null,
      addEventStart:null,
      addEventTitle:'',
      addEventDescription:''
    }));
  }

  handleSelect = ({ start, end }) => {

    this.setState(prevState => ({
      addEventModal: !prevState.addEventModal,
      addEventStart:start,
      addEventEnd:end,
    }));

   }

   deleteEvent = id =>{
     db.collection("events").doc(id).delete().then(function() {
       console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });

      this.setState(prevState => ({
        modal: !prevState.modal
      }));
   }

  componentDidMount(){

  const events = []
  db.collection('events').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {

      const event = {
        id:doc.id,
        title:doc.data().title,
        description:doc.data().description,
        start:doc.data().startTime.toDate(),
        end:doc.data().endTime.toDate()
      }
      events.push(event)
    })

      this.setState({events})
  })

    db.collection('events')
    .onSnapshot(snapshot => {
      let events = [];

      snapshot.forEach(doc => {
        const event = {
          id:doc.id,
          title:doc.data().title,
          description:doc.data().description,
          start:doc.data().startTime.toDate(),
          end:doc.data().endTime.toDate()
        }
        events.push(event)
      });

      this.setState({events})

    });


  }

  render() {

  const { events, modalTitle, modalDescription, modal, modalId, addEventModal, addEventTitle, addEventDescription, addEventStart, addEventEnd } = this.state

    return(
      <>
      <Paper style={{padding:50}}>
      <div>
      <Calendar
        selectable
        localizer={localizer}
        views={['month', 'day', 'week','agenda']}
        events={events}
        defaultView='month'
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={event => this.toggle(event)}
        onSelectSlot={this.handleSelect}
        resizable
        style={{ height: "100vh" }}
      />
      </div>
      </Paper>


      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modal}
        onClose={this.toggle}
      >
      <Paper style={{width:'50%',padding:20,marginLeft:'25%',marginRight:'25%',marginTop:'10%'}}>
        <div >
          <h3 id="modal-title">{modalTitle}</h3>
          <p id="simple-modal-description">
            {modalDescription}
          </p>

        </div>
        <hr />
        <div >
        <Button color="secondary" onClick={() => this.deleteEvent(modalId)}>Delete</Button>
        <Button  onClick={this.toggle}>Cancel</Button>
        </div>
        </Paper>
      </Modal>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={addEventModal}
        onClose={this.toggleAddEvent}
      >
      <Paper style={{width:'50%',padding:20,marginLeft:'25%',marginRight:'25%',marginTop:'10%'}}>
        <div >
          <h3 id="modal-title">Add Event</h3>
          <div >
            {addEventStart && <div>Time: {moment(addEventStart).format('MMMM Do YYYY, h:mm A')} - {moment(addEventEnd).format('MMMM Do YYYY, h:mm A')}</div>}
          </div>

          <div >

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>

              <TextField
                  id="outlined-full-width"
                  label="Title"
                  fullWidth
                  value={addEventTitle}
                  onChange={e => this.setState({ addEventTitle: e.target.value })}
                  margin="normal"
                />

            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>

              <TextField
                  id="outlined-full-width"
                  multiline
                  max="5"
                  label="Description"
                  fullWidth
                  value={addEventDescription}
                  onChange={e => this.setState({ addEventDescription: e.target.value })}
                  margin="normal"
                />
            </GridItem>
          </GridContainer>

          </div>

        </div>

        <div >
        <Button color="success" onClick={this.addEvent}>Add Event</Button>
          <Button  onClick={this.toggleAddEvent}>Cancel</Button>
        </div>
        </Paper>
      </Modal>

    </>
    );
  }
}

export default DashboardCalendar;
