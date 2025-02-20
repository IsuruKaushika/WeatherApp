import logo from './logo.svg';
import './App.css';
import './WeatherClient'
import WeatherClient from '../src/components/Weather';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherClient/>
      </header>
    </div>
  );
}

export default App;