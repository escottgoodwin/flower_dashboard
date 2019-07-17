import React from "react";
import moment from 'moment'

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Avatar from '@material-ui/core/Avatar';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

const toDates = date => moment(date.toDate()).format('MMMM D YYYY, h:mm A')

export default function LeadCard(props){

    const { id, name, company, leadImg, newPhaseDate, callPhaseDate, closePhaseDate, onDrag } = props;

    return(

      <Card draggable onDrag={(event) => onDrag(event, id)} >
        <CardHeader>
        <GridContainer>
        <GridItem xs={12} sm={12} md={9}>
          <div>{name}</div>
          <div>{company}</div>
        </GridItem>
          <GridItem xs={12} sm={12} md={3}>
          {leadImg !== null && leadImg.length>0 && <Avatar src={leadImg} style={{margin: 10}} />}
        </GridItem>
        </GridContainer>
        </CardHeader>
        <CardBody>
          {newPhaseDate !== null && <div>Added: {toDates(newPhaseDate)}</div>}
          {callPhaseDate !== null && <div>Called: {toDates(callPhaseDate)}</div>}
          {closePhaseDate !== null && <div>Closed: {toDates(closePhaseDate)}</div>}
        </CardBody>
      </Card>

    );
  }
