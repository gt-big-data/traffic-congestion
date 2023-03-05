import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import HeatmapLayer from "react-leaflet-heatmap-layer";
import fs from 'fs';
import parse from 'csv-parse';

const Map = () => {
  return (
    <MapContainer center={[33.7756, -84.3963]} zoom={15} scrollWheelZoom={true}>
      {/* Used this site for reference: https://codesandbox.io/s/heatmap-bangalore-forked-t57mz?file=/src/map.js:540-850
          We need to include geojson file for data. Atharva, you made dummy data. So, we can convert csv to geo json.
          
          In order to make it affective, we need to make an API that pulls from CSV file (use REACT functions - very easy for parsing)
          and use those points for the heatmap layer. 

          If not, create your own SQL database. 
      */}
      {/* <HeatmapLayer
          points={geojson.features}
          longitudeExtractor={(m) => m.geometry.coordinates[0]}
          latitudeExtractor={(m) => m.geometry.coordinates[1]}
          intensityExtractor={(m) => parseFloat(m.geometry.coordinates[1])} //we need to change some of the data so it matches our csv layout. 
          //the intensity if 1 - 0.2 2 - 0.4 3- 0.6 4 - 0.8 5 - 1.0
          max={100} //the max and min values are weird. We need to understand how it works. 
          minOpacity={0.2}
        /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[33.7756, -84.3963]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25,41], iconAnchor: [12, 41]})}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
