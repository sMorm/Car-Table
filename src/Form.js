/**
 * Author   : Serey Morm
 * Contact  : serey_morm@student.uml.edu
 * Hosted   : weblab.cs.uml.edu/~smorm/461f2017/hw4
 * The following component will render a form that allows
 * the user the input information for the price and 
 * fuel consumption of the car. Upon submission, the
 * onSubmit() function will verify that the form is
 * valid, if not, it will display an error.
 */

import React, { Component } from 'react'

export default class Form extends Component {
  state = {
    fuelConsumption: '',
    price: '',
    addMore: false,
    errors: {}
  }
  onChange = event => { this.setState({ [event.target.name]: event.target.value })}

  /**
   * Handles form submissions and form data validation.
   * It will also format prices to add commas using the
   * international number format.
   */
  onSubmit = event => {
    event.preventDefault()
    const price = new Intl.NumberFormat().format(Number(this.state.price))
    const fuelConsumption = Number(this.state.fuelConsumption)
    let errors = {}
    if(this.state.price === '')
      errors.price = 'Price is required'
    if(this.state.fuelConsumption === '')
      errors.fuelConsumption = 'Fuel Consumption is required'
    if(errors.price || errors.fuelConsumption){
      console.log('err')
      this.setState({ errors })
      return
    }
    this.setState({ 
      price: '',
      fuelConsumption: '',
      addMore: true
    })
    this.props.appendCarData({ fuelConsumption, price })
  }

  /**
   * Adds dummy data using a random number between 60 and 20 for
   * the fuel consumption, and a value between $2,000 and $100,000
   * for the price of the car.
   */
  addDummyData = () => {
    const fuelConsumption = new Intl.NumberFormat().format(Math.floor(Math.random() * (60 - 20) + 20))
    const price = new Intl.NumberFormat().format(Math.floor(Math.random() * (100000 - 2000) + 2000))
    this.props.appendCarData({ fuelConsumption, price })
    this.setState({ errors: {} })
  }
  render() {
    return (
      <span className='FormContainer'>
        <form onSubmit={this.onSubmit} className='FormFlex'>
          <span>
              {this.state.errors.price
                ? <label className='LabelError'>{this.state.errors.price}</label>
                : <label>Car Price</label>
              }
            <input
              type='number'
              name='price'
              value={this.state.price}
              onChange={this.onChange}/>
          </span>
          <span>
            {this.state.errors.fuelConsumption
              ? <label className='LabelError'>{this.state.errors.fuelConsumption}</label>
              : <label>Fuel Consumption</label>
            }       
            <input
              type='number'
              name='fuelConsumption'
              value={this.state.fuelConsumption}
              onChange={this.onChange}/>
          </span>
        </form>
        <h5>Compare car prices along with its fuel consumption. Start by entering the price of the car and how many milage it can cover per gallon.</h5>        
        <br/>
        <span className='button' onClick={this.onSubmit}>
          {this.state.addMore ? 'Add Another' :'Add Vehicle' }
        </span>&nbsp;&nbsp;
        <span className='button' onClick={this.addDummyData}>
          Dummy Data
        </span>
  </span>
    )
  }
}
