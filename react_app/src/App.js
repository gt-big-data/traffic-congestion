import './App.css';
import InfoScreen from './components/InfoScreen'
import Map from './components/Map';
import React, { useState, useEffect } from 'react';

function App() {
  const [month, setMonth] = useState("Oct");
  const [year, setYear] = useState(2022);
  const [time, setTime] = useState(12);
  const [day, setDay] = useState(0)
  
  
  return (
    <div class="map-view">
      <Map id="layer0" setDay= {setDay} setMonth = {setMonth} setYear = {setYear} setTime = {setTime} month = {month} year = {year} day = {day} time = {time}/>
      <InfoScreen setDay= {setDay} setMonth = {setMonth} setYear = {setYear} setTime = {setTime} month = {month} year = {year} day = {day} time = {time}/>
  
    </div>
  );
}

export default App;
