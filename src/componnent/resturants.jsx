import React, { Component } from 'react';
import SearchBox from '../reuseableCompponent/searchBox';
import Pagination from './../reuseableCompponent/pagination';
import {getResturants , deleteResturant} from '../resturantserver/fakeResturantServer';
import ResturantTable from './resturantTable';
import ListGroup from '../reuseableCompponent/listGroup';
import _, { toInteger } from "lodash";
import { paginate } from './../helpfulAlgo/paginate';
import axios from "axios"
import {UserContext} from "../contexts/usercontext"
import NavBar from "./navBar"

class Resturants extends Component {
  static contextType = UserContext

    state = { 
        resturants: [],
        showresturants:[],
        genres: [],
        currentPage: 1,
        pageSize: 5,
        searchQuery: "",
        selectedGenre: {id:-1, name:"AllGenres"},
        from:0,
        to:30,
        sortColumn: { path: "title", order: "asc" }
     }
     componentDidMount() {
      axios.get(`http://localhost:9000/api/resturants/from/serch=${this.state.searchQuery}&genre=${this.state.selectedGenre.name}&from=${this.state.from}&to=${this.state.to}`,)
      .then((result)=>{
        this.setState({resturants:result.data})
      })
      .catch((e)=> console.error("there was an error with the getting the resturants from the server: ", e))
      axios.get("http://localhost:9000/api/genres")
      .then((result)=> {this.setState({genres:[{_id:"", name:"AllGenres"}, ...result.data]})
     }).catch((e)=> console.error("there was an error with the getting the genres from the server: ", e))
        // const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
        // this.setState({ resturants: getResturants(), genres });
      }

    //  componentDidMount() {
    //   axios.get(`http://localhost:9000/api/resturants/from/${toInteger(this.state.from)}-${toInteger(this.state.to)}`,).then((result)=> this.setState({resturants:result.data})).catch((e)=> console.error("there was an error with the getting the resturants from the server: ", e))
    //   axios.get("http://localhost:9000/api/genres").then((result)=> {this.setState({genres:[{_id:"", name:"AllGenres"}, ...result.data]})
    //  }).catch((e)=> console.error("there was an error with the getting the genres from the server: ", e))
    //     // const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    //     // this.setState({ resturants: getResturants(), genres });
    //   }
      handleSearch = (input) =>{
          this.setState({searchQuery:input})
      }
      handlePageChange = (page) =>{
        this.setState({currentPage:page})
      }
      handleDelete = resturant => {
        const resturants = this.state.resturants.filter(m => m._id !== resturant._id);
        this.setState({ resturants });
        deleteResturant(resturant._id);
      };
    
      handleLike = resturant => {
        const resturants = [...this.state.resturants];
        const index = resturants.indexOf(resturant);
        resturants[index] = { ...resturants[index] };
        resturants[index].liked = !resturants[index].liked;
        this.setState({ resturants });
      };
    
      handleGenreSelect = genre => {
        this.setState({selectedGenre:genre, currentPage:1}, () => this.componentDidMount())
       
      };
    
      handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre:{id:-1, name:"AllGenres"}, currentPage: 1 }
          , ()=> this.componentDidMount() );
      };
    
      handleSort = sortColumn => {
        this.setState({ sortColumn });
      };
      getPagedData = () => {
        const {
          pageSize,
          currentPage,
          sortColumn,
          selectedGenre,
          searchQuery,
          movies: allMovies
        } = this.state;
    
        let filtered = allMovies;
        if (searchQuery)
          filtered = allMovies.filter(m =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        else if (selectedGenre && selectedGenre._id)
          filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    
        const movies = paginate(sorted, currentPage, pageSize);
    
        return { totalCount: filtered.length, data: movies };
      };

      // async filterByGenre(){
      //   console.log("i am in the filterbygenre ", this.selectedGenre)
      //   const newresturant = await axios.get(`http://localhost:9000/api/resturants/genres/${this.selectedGenre.name}/in`)
      //   console.log("this is the new resturants from the filter: ", newresturant)
      //   this.setState({showresturants:newresturant})

      //   return newresturant
      // }

    render() { 
       // console.log("this is the resturants" , this.state.resturants)
        const  { currentPage,pageSize, searchQuery ,resturants, selectedGenre ,sortColumn} = this.state
        let filtered = resturants;
        // if (searchQuery)
        //   filtered = resturants.filter(m =>
        //     m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        //   );

        // else if (selectedGenre && selectedGenre._id){
        //   filtered = this.filterByGenre()
        // } 

        // if (selectedGenre && selectedGenre._id){
        //     console.log("the state selcatedgenre id: ", selectedGenre)
        //     filtered = resturants.filter(m => {
        //     m.genres.indexOf(selectedGenre)>=0});
        // }
    
        //const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    
        const showResturants = paginate(filtered, currentPage, pageSize);
        let totalCount = filtered.length


        return ( 
          <React.Fragment>
            <NavBar username ={this.context.username}/>
        <div className="row">
        <div className="col-3">
          <ListGroup
           items={this.state.genres}
           selectedItem={selectedGenre}
           handleGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h3>Showing {totalCount} Resturants in the database.</h3>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <ResturantTable 
          resturants={showResturants}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
          <Pagination
            range={this.state.to-this.state.from}
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div> 
      </React.Fragment> );
    }
}
 
export default Resturants;