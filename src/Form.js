/**
 * Author   : Serey Morm
 * Contact  : serey_morm@student.uml.edu
 * Hosted   : weblab.cs.uml.edu/~smorm/461f2017/hw5
 * The following component will render a form that allows
 * the user the input information for the price and 
 * fuel consumption of the car. Upon submission, the
 * onSubmit() function will verify that the form is
 * valid, if not, it will display an error.
 */

import React, { Component } from 'react'
import Scroll from 'react-scroll'
import InputRange from 'react-input-range'

import 'react-input-range/lib/css/index.css'
import './styles/Slider.css'

const carMakes = [ 'Toyota', 'Tesla', 'Honda', 'Audi']

export default class Form extends Component {
  state = {
    fuelConsumption: '',
    name: '',
    price: '',
    addMore: false,
    errors: {}
  }
  onChange = event => { this.setState({ [event.target.name]: event.target.value })}

  /**
   * Handles form submissions and form data validation.
   * It will also format prices to add commas using the
   * international number format.
   * Upon submission, we check to see if the inputs are
   * empty, if they are, we set our errors object with
   * the following keys for each input box. Then we
   * display and skip the process of appending the table.
   * 
   * For better user experience, upon appending to the 
   * table, it will scroll to the newly added item. If
   * there is an error, an animation will scroll back
   * up to the input boxes, then animate and change
   * the error text to red.
   */
  onSubmit = event => {
    event.preventDefault()
    const price = new Intl.NumberFormat().format(Number(this.state.price))
    const fuelConsumption = Number(this.state.fuelConsumption)
    let errors = {}
    if(this.state.price === '')
      errors.price = 'Car Price required'
    if(this.state.fuelConsumption === '')
      errors.fuelConsumption = 'Fuel Consumption required'
    if(this.state.name === '')
      errors.name = 'Car name required'
    if(errors.price || errors.fuelConsumption || errors.name ){
      Scroll.animateScroll.scrollToTop()
      setTimeout(() => this.setState({ errors }), 250)      
      return
    }
    if(this.state.price < 0)
      errors.price = 'Car price should be positive'
    if(this.state.fuelConsumption < 0)
      errors.fuelConsumption = 'Fuel Consump should be positive'
    if(errors.price || errors.fuelConsumption){
      Scroll.animateScroll.scrollToTop()
      setTimeout(() => this.setState({ errors }), 250)      
      return
    }
    this.setState({ 
      price: '',
      fuelConsumption: '',
      name: '',
      addMore: true,
      errors: {}
    })
    this.props.appendCarData({ fuelConsumption, price, name: this.state.name })
    Scroll.animateScroll.scrollToBottom()
  }

  /**
   * Adds dummy data using a random number between 60 and 20 for
   * the fuel consumption, and a value between $2,000 and $100,000
   * for the price of the car.
   */
  addDummyData = () => {
    const fuelConsumption = new Intl.NumberFormat().format(Math.floor(Math.random() * (60 - 20) + 20))
    const price = new Intl.NumberFormat().format(Math.floor(Math.random() * (100000 - 2000) + 2000))
    const name = carMakes[Math.floor(Math.random() * carMakes.length )]
    this.props.appendCarData({ fuelConsumption, price, name })
    this.setState({ errors: {} })
    Scroll.animateScroll.scrollToBottom()
  }

  render() {
    return (
      <span className='FormContainer'>
        <form onSubmit={this.onSubmit} className='FormContent'>
          <span className='FormFlex'>
            <span className='FormFlex-item'>
                {this.state.errors.price
                  ? <label className='LabelError'>{this.state.errors.price}</label>
                  : <label>Car Price</label>
                }
              <input
                type='number'
                name='price'
                value={this.state.price}
                onChange={this.onChange}/>
                <br/><br/>
              <InputRange
                value={this.state.price === '' ? 501 : Number(this.state.price)}
                onChange={price => this.setState({ price })}
                formatLabel={price => `$${new Intl.NumberFormat().format(price)}`}
                step={500}
                minValue={500}
                maxValue={100000}/>
            </span>
            <span className='FormFlex-item'>
              {this.state.errors.fuelConsumption
                ? <label className='LabelError'>{this.state.errors.fuelConsumption}</label>
                : <label>Fuel Consumption</label>
              }       
              <input
                type='number'
                name='fuelConsumption'
                value={this.state.fuelConsumption}
                onChange={this.onChange}/>
              <br/><br/>
              <InputRange
                value={this.state.fuelConsumption === '' ? 1 : Number(this.state.fuelConsumption)}
                onChange={fuelConsumption => this.setState({ fuelConsumption })}
                formatLabel={fuelConsumption => `${fuelConsumption} MPG`}
                step={1}
                minValue={1}
                maxValue={50}/>
            </span>
          </span>
          <br/><br/>
          <span>
            {this.state.errors.name
              ? <label className='LabelError'>{this.state.errors.name}</label>
              : <label>Car Name</label>
            }
            <input
              type='text'
              name='name'
              value={this.state.name}
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
