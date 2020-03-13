import React, { Component} from "react";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import Control from "react-leaflet-control"
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      markers: [
        [-8.571246, 115.311178],
        // [-8.554540888307615, 115.28263092041017],
        // [-8.58373704233361, 115.29945373535158],
        // [-8.572534132055914, 115.3502655029297],
      ],
      polyline: [
        [-8.554540888307615, 115.28263092041017],
      ]
    };
  }

  addMarker = (e) => {
    const {markers} = this.state
    let mark = [e.latlng.lat, e.latlng.lng]
    markers.push(mark)
    this.setState({markers})
    console.log(mark)
  }

  clearMarker = () => {
    this.setState({markers: [[-8.571246, 115.311178]]})
  }

  render() {
    return (
      <Map 
        center={[-8.571246, 115.311178]} 
        onClick={this.addMarker}
        zoom={13} 
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

        <Control position="topright">
          <button onClick={this.clearMarker}>Clear</button>
        </Control>

        {/* {this.state.markers.map((position, idx) => 
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>
          )} */}
        {this.state.markers.reduce((x, y) => 
          <Polyline key={`marker-${y}`} color="lime" positions={this.state.markers} />
        )}
        

      </Map>
    );
  }
}

export default App;
