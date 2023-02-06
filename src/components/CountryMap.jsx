import React, { Component } from 'react'
import { MapContainer, GeoJSON } from 'react-leaflet';
import countries from '../data/countries.json'
import "leaflet/dist/leaflet.css";
import './CountryMap.css'
import { latLng } from 'leaflet';

export default class CountryMap extends Component {
  state = { color: '#ff0000' }

  countryStyle = {
    fillColor: 'green',
    weight: 0.5,
    opacity: 0.7,
    color: 'white',
  }
 
  latLng = (lat, lng) => {
    return latLng(lat, lng)
  }

  changeColor = (event) => {
    event.target.setStyle({
      color: "orange",
      weight: 2,
      fillColor: this.state.color,
     })
    this.setState({ color: event.target.value })
  }
  
  onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN
    layer.bindPopup(countryName )
    
    layer.on({
      mouseover: () => {
        layer.setStyle({ fillColor: 'orange' })
      }
    })
    
    layer.on({
      mouseout: () => {
        layer.setStyle({ fillColor: 'green' })
      }
    })

    layer.on({
      click: (event) => {
        console.log(countryName, event.latlng)
        localStorage.setItem('country', countryName + " " + event.latlng)
      }
    })
    
    layer.on({
      click: this.changeColor
    })
 
  }

  render() {
    return (
      <div>
        <MapContainer style={{ height: '85vh', width: '80vw'}} zoom={1.5} center={[20, 0]}>
          <GeoJSON 
            style={this.countryStyle} 
            data={countries.features} 
            onEachFeature={this.onEachCountry}
          />
        </MapContainer>
      </div>
    )
  }

}
