import './App.css';
import InfoScreen from './components/InfoScreen'
import Map from './components/Map';

function App() {
  return (
    <div>
      <div className='sidePanel'>
        <InfoScreen/>
      </div>
      <Map id="layer0"/>
    </div>
  );
}

export default App;
