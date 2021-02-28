import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../reuseableCompponent/table"
import Like from "../reuseableCompponent/like";
import {Route} from "react-router-dom" 
import ResturantPage from './resturantPage';

class ResturantTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: resturant => <Link to={`/resturants/${resturant._id}`}>{resturant.title}</Link>
    
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: resturant => (
        <Like liked={resturant.liked} onClick={() => this.props.onLike(resturant)} />
      )
    },
    {
      key: "delete",
      content: resturant => (
        <button
          onClick={() => this.props.onDelete(resturant)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { resturants, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={resturants}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ResturantTable;
