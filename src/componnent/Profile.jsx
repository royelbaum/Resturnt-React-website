import React, { Component } from 'react';

class Profile extends Component {
    state = { 
        name:"my name",
        level:2,
        favoritres:" my favoit",
        highestrank:"my highest ranks",
        picture:"my picture",
        album:[]
     }
    render() { 
        return (
            <table class="table table-borderless">
            <thead>
                <tr>
                <th scope="col-2"></th>
                <th scope="col-2"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row-4">{this.state.name}</th>
                <th scope="row-4">{this.state.picture}</th>
                </tr>
                <tr>
                <th scope="row">Level: {this.state.level}
                </th>
                </tr>
                <tr>
                <th scope="row">My Favorit Resturant: {this.state.favoritres}</th>
                </tr>
                <tr>
                <th scope="row">Highest Rank: {this.state.highestrank}</th>
                </tr>
            </tbody>
            </table>

          );
    }
}
 
export default Profile;