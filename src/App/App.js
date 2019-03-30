import React, { Component } from 'react';
import './App.css';
import ControlPanel from '../ControlPanel/ControlPanel';
import {KosiceMap} from "../components/KosiceMap/KosiceMap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ControlPanel />
		  <KosiceMap />
      </div>
    );
  }
}

export default App;
