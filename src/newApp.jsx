import React ,{Component} from 'react';
import './App.css';
import { Route, Redirect, Switch } from "react-router-dom";
import Resturants from './componnent/resturants';
import NotFound from './reuseableCompponent/notFound';
import NavBar from './componnent/navBar';
import ResturantPage from './componnent/resturantPage';
import { getResturants } from './resturantserver/fakeResturantServer';
import DishPage from './componnent/dishPage';
import Profile from './componnent/Profile';

class NewApp extends Component {
  state = { 
    dish:{}
   }

   onDishClick = (newdish) =>{
    this.setState({dish:newdish})
  }
  render() { 
    const resturants = getResturants()
    return (<React.Fragment>
      <NavBar/>
   <main className="container">
         <Switch>
         <Route path="/dish/:name" render={(props) => <DishPage dish={this.state.dish} {...props}/>}/>
           <Route path="/profile" component={Profile} />
           <Route path="/resturants/:id" render={(props) => <ResturantPage ondishclick={this.onDishClick} resturants={resturants} {...props}/>}/>
           <Route path="/resturants" render={() => <Resturants ondishclick={this.ondishclick}/>} />
           <Route path="/not-found" component={NotFound} />
           <Redirect from="/" exact to="/resturants" />
           <Redirect to="/not-found" />
         </Switch>
       </main>
   </React.Fragment>  );
  }
}
 
export default NewApp; 


