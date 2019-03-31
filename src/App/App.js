import React, { Component } from 'react';
import {MemoryRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";

import './App.css';
import Header from "../components/Header/Header"
import { store } from '../store/store';
import UserPage from "../components/UserPage/UserPage";
import KosiceMap from "../components/KosiceMap/KosiceMap";
import ControlPanel from "../components/ControlPanel/ControlPanel";

class App extends Component {
  render() {
    return (
        <MemoryRouter initialEntries={['/', '/user']} initialIndex={0}>
            <Provider store={store}>
                <div className="App">
                    <Header />
                    <ControlPanel />
                    <Route path={'/user'} component={UserPage} exact />
                    <Route path={'/'} component={KosiceMap} exact />
                </div>
            </Provider>
        </MemoryRouter>

    );
  }
}

export default App;
