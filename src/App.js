import React ,{Component} from 'react';
import './App.css';
import { Route, Redirect, Switch } from "react-router-dom";
import Resturants from './componnent/resturants';
import NotFound from './reuseableCompponent/notFound';
//import NavBar from './componnent/navBar';
import ResturantPage from './componnent/resturantPage';
import { getResturants } from './resturantserver/fakeResturantServer';
import DishPage from './componnent/dishPage';
import Profile from './componnent/Profile';
import Login from './pages/login';
import Signup from './pages/signup';
// import HomeNavBar from './componnent/homenavbar';
import  UserContextProvider from './contexts/usercontext';

class App extends Component {
  state = { 
    dish:{}
   }

  onDishClick = (newdish)=> {
    console.log("the new dish")
    console.log(newdish)
    
  }

  render() { 
    const resturants = getResturants()
    return (<React.Fragment>
   <main className="container">
   <UserContextProvider>
         <Switch>
          <Route path="/dish/:name" component={DishPage}/>
           <Route path="/profile" component={Profile} />
           <Route path="/Login" component={Login} />
           <Route path="/Signup" component={Signup} />
           <Route path="/resturants/:id" render={(props) => <ResturantPage  {...props}/>}/>
           <Route path="/api/resturants" render={() => <Resturants ondishclick={this.ondishclick}/>} />
           <Route path="/not-found" component={NotFound} />
           <Redirect from="/" exact to="/Login" />
           <Redirect to="/not-found" />           
         </Switch>
         </UserContextProvider>
       </main>
   </React.Fragment>  );
  }
}
 
export default App; 


