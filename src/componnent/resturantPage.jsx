import React, { Component } from 'react';
import axios from "axios"
import _ from "lodash"
import Pagination from './../reuseableCompponent/pagination';
import { paginate } from './../helpfulAlgo/paginate';
import DishTable from "./dishesTable"
import NavBar from "./navBar"
import {UserContext} from "../contexts/usercontext"

class ResturantPage extends Component {
static contextType = UserContext


    componentDidMount(){
        axios.get(`http://localhost:9000/api/resturants/id/${this.props.match.params.id}`).then((result)=>{
             this.setState({...result.data[0]}),()=>
            console.log("this is the new state: ", this.state)
        }).catch((e)=> console.error("there was an error with the getting the resturants from the server: ", e))
    }

    handlePageChange = (page) => {
        this.setState({currentPage:page})
    }
    render() { 
        const  { currentPage,pageSize ,menu ,sortColumn} = this.state
        let filtered = menu;
        //const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
       // console.log("this is the filtered: ", filtered)
       // console.log("this is the state: ", this.state)
        const showDishes = paginate(menu, currentPage, pageSize);
      //  console.log("this is the show dishes: " ,showDishes)
        let totalCount = filtered.length
      
       return (
           <React.Fragment>
               <NavBar username ={this.context.username}/>
           <div className="row">
        <div className="col">
          <h3>Showing {totalCount} dishes in the {this.state.title}.</h3>
          <DishTable 
          dishes={showDishes}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
          <Pagination
           // range={this.state.to-this.state.from}
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>  );
        </React.Fragment>
         );
    }
    state={
      _id:"",
      menu: [],
      genres: [],
      rate: -1,
      title: "",
      currentPage:1,
      pageSize:2,
  
  }
  
}
 
export default ResturantPage;