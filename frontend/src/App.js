import logo from './logo.svg';
import './App.css';
import Wheel from './Components/wheel.jsx';
import ParentComponent from './Components/SmallerComponent/year.jsx';

function App() {
  return (
    <div>
		
      <ParentComponent/>
    </div>
  );
}

export default App;
