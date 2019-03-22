import React, {Component} from 'react'
import FormOrder from '../FormOrder/FormOrder';

class Dashboard extends Component { 
    render() {
        return (
            <div className="App">
            <h1>Dashboard</h1>
            <FormOrder />
          </div>
        )
    }
}

export default Dashboard;