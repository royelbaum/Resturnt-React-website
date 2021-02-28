import React, { Component } from 'react';
import {Link , Route, browserHistory} from "react-router-dom"
import DishPage from './dishPage';

class Dish extends Component {
    render() { 
        const {dish} =this.props
        return (
            <tr key={dish.name}>
          <th scope="row">
            <button class="link"
             onClick={() =>{this.props.history.push({
               pathname:"/dish/"+dish.name,
              state:dish})}}> {dish.name} </button>
            <br></br>
            {dish.ingridients.map((ingridient)=> `${ingridient},`)}
            </th>
          <td>{dish.price}</td>
          <td>{dish.rate}</td>
          <td>{dish.picture}</td>
          <td></td> 
          </tr> );
    }
}
 
export default Dish;