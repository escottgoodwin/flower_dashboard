import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import fire from '../../firebase'


import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '90%',
  height: '90%',
};

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

      let item = {customerId:customerId, name:key, customerLat:customerLat, customerLong:customerLong, sales:sales, number:number,msg: key + ' - $' + sales}
      custs.push(item)
    }

    return custs
}

class Map1 extends Component {

    state = {
      showingInfoWindow: false,
      custs:[],
      customers:[],
      activeMarker: {},
      selectedPlace: {},

    };

  componentDidMount(){

    // Initial call for sales list
    const sales = []

    const customers = []
    db.collection('customers').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const customer = {
          name: doc.data().name,
          lat:doc.data().lat,
          long:doc.data().long,
          phone:doc.data().phone
        }
        customers.push(customer)
      })
        this.setState({customers})
    })

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

      const groupedCust = groupBy(sales,'customer')
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

        const groupedCust = groupBy(sales,'customer')
        const custs = personSalesList1(groupedCust)

        this.setState({
          custs
        });

      });

    }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {

    const { custs, customers } = this.state
    console.log(custs)
      return (

          <Map
            google={this.props.google}
            zoom={12}
            style={mapStyles}
            initialCenter={{ lat: 33.732248, lng: -116.382486 }}
            onClick={this.onMapClicked}
          >

          {custs.map((store, index) =>

            <Marker key={index} id={index}
            position={{
             lat: store.customerLat,
             lng: store.customerLong
           }}
           title={store.msg}
           name={store.msg}
           sales={store.sales}
           onClick={this.onMarkerClick}
           />


         )
         }
         <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
          <div>
            <h5>{this.state.selectedPlace.name}</h5>
          </div>
      </InfoWindow>

          </Map>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDyLUwGFi9V44ALq6o68gxAfwR-m8OA_X4'
})(Map1);
