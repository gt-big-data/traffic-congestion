import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import React, { useState, useEffect} from 'react';
import results from "../utils/results.json";
import Calendar from './Calendar';
import HourSlider from './HourSlider';


const Map = (props) => {

  return (
    <MapContainer center={[33.7756, -84.3963]} zoom={15} scrollWheelZoom={true}>
      {/* Used this site for reference: https://codesandbox.io/s/heatmap-bangalore-forked-t57mz?file=/src/map.js:540-850
          We need to include geojson file for data. Atharva, you made dummy data. So, we can convert csv to geo json.
          
          In order to make it affective, we need to make an API that pulls from CSV file (use REACT functions - very easy for parsing)
          and use those points for the heatmap layer. 

          If not, create your own SQL database. 

          // Istead of making array, we should just plot the points right there. Average out the points if it is within 1 mile radius. 
          let i = 0;
          let results2 = new Array();
          while (i < results.length) {
            if (results[i].hour == hour && results[i].day_of_week == day_of_week
            && results[i].month == month) {
                results2.push(results[i]);
                <Marker position={[xcood, ycoord]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25,41], iconAnchor: [12, 41]})}>
                  <Popup>
                    Longitude: long <br /> Latitute: lat <br /> Average Delay (in seconds): results[i].delays.
                  </Popup>
                </Marker>
            }
            i++;
          }
          // Now, we can just loop through the results and then plot the points. 
          // We can also add a slider for the time. 
          // We can also add a calendar for the date. 
          // We can also add a dropdown
          //Later on, convert this to React and then because the data is dense. Do the average delay of the delay within the coordinates within a radius. 

      */}
      for ()

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[33.7756, -84.3963]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25,41], iconAnchor: [12, 41]})}>
        <Popup>
          Georgia Tech Main Campus <br /> Main Point.
        </Popup>
      </Marker>

      {/* put loop here and then when the datae is correct including hour, then create marker right there. */}
    </MapContainer>
  );
}

export default Map;
