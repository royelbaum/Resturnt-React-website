import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../reuseableCompponent/table"
import NavBar from "./navBar"
// import Like from "../reuseableCompponent/like";
// import {Route} from "react-router-dom" 
// import ResturantPage from './resturantPage';

class DishTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: resturant => <Link to={`/dish/${resturant._id}`}>{resturant.title} </Link>
    
    },
    { path: "price", label: "Price" },
    { path: "Rate", label: "Rate" },
  ];
  render() {
    const { dishes, onSort, sortColumn } = this.props;
    return (
      <React.Fragment>
    
      <Table
        columns={this.columns}
        data={dishes}
        sortColumn={sortColumn}
        onSort={onSort}
      />
     </React.Fragment>
    );
  }
}

export default DishTable;
