import logo from './logo.svg';
import './App.css';
import Greet from './components/Greet';
import Hello from './components/Hello';

function App() {
  return (
    <div className="App">
      <Greet name= "Krishna" />
      <Greet name= "Krushna"/>
      <Greet name= "Krish"/>
      {/* <Hello /> */}
    </div>
  );
}

export default App;
