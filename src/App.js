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
import CountUp from 'react-countup'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './styles/App.css'
import './styles/Tabs.css'
import 'react-tabs/style/react-tabs.css'

class App extends Component {
  state = {
    showForm: false,
    buttonStyle: 'button enter',
    tabStyle: 'tabPanel',
    carData: [],
    selectedIndex: 0
  }

  // Before mounting, check if there was anything cached
  componentWillMount() {
    const cache = localStorage['carData']
    if(cache && cache !== '[]') {
      const carData = JSON.parse(localStorage['carData'])
      console.log(carData)
      this.setState({ carData, showForm: true })
    }
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
    this.setState({ 
      carData: [...this.state.carData, data],
      selectedIndex: this.state.carData.length,
    })
    localStorage['carData'] = JSON.stringify([...this.state.carData, data])
  }

  // Remove a single entry
  removeItem = index => {
    const { carData } = this.state
    carData.splice(index, 1)
    this.setState({ carData, selectedIndex: index - 1 })
    localStorage['carData'] = JSON.stringify([...this.state.carData])
  }

  // Remove all entries
  removeAll = () => { 
    this.setState({ carData: [] }) 
    localStorage['carData'] = '[]'
  }

  // For styling and animation when changing tabs
  onSelect = selectedIndex =>  {
    this.setState({ tabStyle: 'tabPanel leave' })
    setTimeout(() => this.setState({ 
      selectedIndex, 
      tabStyle: 'tabPanel' 
    }), 250)
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
            <Tabs 
              selectedIndex={this.state.selectedIndex} 
              onSelect={selectedIndex => this.onSelect(selectedIndex) }
              selectedTabClassName='selectedTab'>
              <TabList>
                {this.state.carData.map((car, key) => {
                  return <Tab key={key}>{car.name}</Tab>
                })}
              </TabList>
              {this.state.carData.map((car, key) => {
                return <TabPanel key={key}>
                <h3>Here's a summary for your {car.name}</h3>
                <span className={this.state.tabStyle}>
                  <div className='priceBubble orange'>
                    <h2>{car.name}</h2>
                  </div>
                  <div className='priceBubble'>
                    <h2>
                      <CountUp 
                        start={Number(car.price.replace(/,/g, '')) / 2} 
                        end={Number(car.price.replace(/,/g, ''))}
                        duration={0.75} 
                        prefix='$' 
                        redraw/>
                    </h2>
                    <p>Car Price</p>
                  </div>
                  <div className='priceBubble orange'>
                    <h2>
                      <CountUp 
                        start={0} 
                        end={Number(car.fuelConsumption)}
                        duration={1} 
                        redraw/>
                    </h2>
                    <p>Miles Per Gallon</p>
                  </div>
                </span>
                <span onClick={() => this.removeItem(key)} className='removeButton'>
                  &times; Remove
                </span>&emsp;
                {this.state.carData.length > 1 && 
                  <span onClick={this.removeAll} className='removeButton'>
                    &times; Remove All
                  </span>
                }
                </TabPanel>
              })}
            </Tabs>
          }
        </div>
      </div>
    );
  }
}

export default App;
