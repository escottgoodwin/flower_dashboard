import React from "react";
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import LeadCard from "components/LeadCard";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

export default function LeadColumn(props) {

    const { classes, color, name, state, onDrag, onDrop } = props;

    return(

        <GridItem xs={12} sm={12} md={4}>

        <Card
          onDragOver={e => e.preventDefault()}
          onDrop={event => onDrop(event,name)}
        >
          <CardHeader color={color}>
            <h4 className={classes.cardTitleWhite}>{name}

            {name==='news' &&
            <Link to={{
              pathname: "add_lead",
              state:
                {  }
              }}>

            <Button style={{color:'green'}}>Add Lead</Button>
            </Link>
            }
             </h4>
          </CardHeader>

        <CardBody style={{minHeight:'70vh'}}>

          { state[name].map(l => <LeadCard onDrag={onDrag} {...l} />) }

        </CardBody>

        </Card>
      </GridItem>
    );

}
