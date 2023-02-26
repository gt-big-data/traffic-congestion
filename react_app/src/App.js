import './App.css';
import InfoScreen from './components/InfoScreen'
import Map from './components/Map';

function App() {
  return (
    <div class="map-view">
      <Map id="layer0"/>
      <InfoScreen />
    </div>
  );
}

export default App;
