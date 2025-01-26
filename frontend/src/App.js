import logo from './logo.svg';
import './App.css';
import './WeatherClient'
import WeatherClient from './WeatherClient';

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