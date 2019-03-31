import React, { Component } from 'react';
import './App.css';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import KosiceMap from "../components/KosiceMap/KosiceMap";
import Header from "../components/Header/Header"
import {Provider} from "react-redux";
import { store } from '../store/store';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">
                <ControlPanel />
                <KosiceMap />
            </div>
        </Provider>
    );
  }
}

export default App;
