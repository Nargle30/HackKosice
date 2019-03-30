import React, { Component } from 'react';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import KosiceMap from "../components/KosiceMap/KosiceMap";
import {Provider} from "react-redux";
import { store } from '../store/store';
import UserPage from "../components/UserPage/UserPage";

class User extends Component {
  render() {
    return (
        <Provider store={store}>
			<UserPage />
        </Provider>
    );
  }
}

export default User;
