//App.js

import axios from 'axios';
import './App.css';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

const testing = () => {
  console.log("testing");
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={apiCall}>Make API Call</button>
        <button onClick={testing}>Make API Call</button>

      </header>
    </div>
  );
}

export default App;