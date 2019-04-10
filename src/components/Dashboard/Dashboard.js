import React, {Component} from 'react'
import FormOrder from '../FormOrder/FormOrder';
import MainView from '../MainView';

import "./Dashboard.css";
import DashboardMenu from '../DashboardMenu';

class Dashboard extends Component { 
    render() {
        return (
            <div className="dashboard__container">
            <h1>Dashboard</h1>
            <DashboardMenu />
            {/* <FormOrder /> */}
            <MainView />
            
          </div>
        )
    }
}

export default Dashboard;