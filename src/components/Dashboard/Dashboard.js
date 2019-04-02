import React, {Component} from 'react'
import FormOrder from '../FormOrder/FormOrder';
import MainView from '../MainView/MainView';

class Dashboard extends Component { 
    render() {
        return (
            <div className="App">
            <h1>Dashboard</h1>
            {/* <FormOrder /> */}
            <MainView />
            
          </div>
        )
    }
}

export default Dashboard;