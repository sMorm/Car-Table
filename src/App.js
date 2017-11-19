/**
 * Author   : Serey Morm
 * Contact  : serey_morm@student.uml.edu
 * Hosted   : weblab.cs.uml.edu/~smorm/461f2017/hw5
 * This component is responsible for rendering the 
 * application header, and button to start the app.
 * Upon clicking the get started button, it will 
 * be responsible for rendering the form component,
 * along with the results inside of the table.
 */

import React, { Component } from 'react';
import Form from './Form'
import './styles/App.css';

class App extends Component {
  state = {
    showForm: false,
    buttonStyle: 'button enter',
    carData: [],
  }

  /**
   * Sets a timeout so that the animation for the button
   * to leave can happen, then render the form.
   */
  showForm = () => {
    this.setState({ buttonStyle: 'button leave'})
    setTimeout(() => {this.setState({ showForm: true })}, 500)
  }

  /**
   * Uses the spread operator to append the new data to the table
   */
  appendCarData = data => {
    this.setState({ carData: [...this.state.carData, data] })
  }

  render() {
    return (
      <div className='App'>
        <div className='AppContainer'>
          <header className='App-header'>          
            <h1 className='App-title'>Price & Fuel</h1>
            <h1 className='App-subtitle'>Consumption</h1>
          </header>
          {!this.state.showForm
            ? <span className={this.state.buttonStyle} onClick={this.showForm}>Get Started</span>
            : <Form appendCarData={this.appendCarData}/>
          }
          <br/><br/>
          {this.state.carData.length > 0 &&
          <table className='TableContainer'>
            <tbody>
              <tr>
                <th>Summary</th>
                <th>Car Price</th>
                <th>Fuel Consumption</th>
              </tr>
              {
                this.state.carData.map((car, key) => {
                  return(
                    <tr key={key}>
                      <td>Vehicle {key + 1}</td>
                      <td>${car.price}</td>
                      <td>{car.fuelConsumption}mpg</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          }
        </div>
      </div>
    );
  }
}

export default App;
