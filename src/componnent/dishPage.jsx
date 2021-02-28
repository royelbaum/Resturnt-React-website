import React, { Component } from 'react';
import NavBar from './navBar'

class DishPage extends Component {
    state = {
        dish:{}
      }
    componentDidMount(){
        const dish = this.props.location.state
        this.setState({dish})
    }
    displayIngridients(ingridients){
        let arr = []
        for(let i=0; i<ingridients.length-1; i++){
            arr.push(`${ingridients[i]}, `)
        }
        arr.push(`${ingridients[ingridients.length-1]}`)
        return arr
    }
    render() { 
        const dish = this.props.location.state
        return (
            <div>
            <NavBar username ={this.context.username}/>
            <h2>    {dish.picture}</h2>
            <table class="table table-borderless">
            <thead>
            </thead>
            <tbody>
            <tr>
            <th scope="row">{this.displayIngridients(dish.ingridients)}</th>
            <button className="btn btn-primary">Rate The Dish</button>
             </tr>
             <tr>
            <th scope="row">{dish.rate}</th>
             </tr>
             <tr>
            <th scope="row">Dish</th>
             </tr>  
            </tbody>
          </table>
          </div>
          );
    }
}
 
export default DishPage;