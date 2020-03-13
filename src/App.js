import React, { Component} from "react";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import Control from "react-leaflet-control"
import "./App.css";
import axios from 'axios';

const server = 'https://cool-reach-265406.appspot.com/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      markers: [
        // [-8.571246, 115.311178],
        // [-8.554540888307615, 115.28263092041017],
        // [-8.58373704233361, 115.29945373535158],
        // [-8.572534132055914, 115.3502655029297],
      ],
      polyline: []
    };
  }

  componentDidMount() {
    let initialPosition = [];

    axios.get(`${server}/api/location`)
      .then(({data}) => {
        data.map(loc => initialPosition.push([loc.latitude, loc.longitude]))
        this.setState({polyline: initialPosition})
      });
  }

  addToWeb = (latitude, longitude) => {
    axios.post(`${server}/api/location`, {
      latitude: latitude,
      longitude: longitude
    })
      .then(({data}) => console.log(data))
  }

  truncateTable = () => {
    axios.post(`${server}/api/location/delete`, {})
      .then(({data}) => console.log(data))
  }

  addPolyline = (e) => {
    const {polyline} = this.state
    let loc = [e.latlng.lat, e.latlng.lng]
    polyline.push(loc)
    this.setState({polyline})
    this.addToWeb(e.latlng.lat, e.latlng.lng)
    console.log(loc)
  }

  clearPolyline = () => {
    this.setState({polyline: []})
    this.truncateTable()
  }

  render() {
    return (
      <Map 
        center={[-8.571246, 115.311178]} 
        onClick={this.addPolyline}
        zoom={13} 
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

        <Control position="topright">
          <button onClick={this.clearPolyline}>Clear</button>
        </Control>

        {/* {this.state.markers.map((position, idx) => 
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>
          )} */}

        <Polyline key={`marker-${this.state.polyline.length}`} color="lime" positions={this.state.polyline} />        

      </Map>
    );
  }
}

export default App;
