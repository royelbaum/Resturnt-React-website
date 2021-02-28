import React,  { createContext , useState ,Component  } from 'react'
import Axios from 'axios'

export const UserContext = createContext();

class UserContextProvider extends Component {
    state = {
        userId:"1",
        username:"",
        token:""
      }

      componentDidMount(){
          Axios.get(`http://localhost:9000/api/users/${localStorage.getItem("id")}`).then(result =>{
            const {_id, username, token} = result.data
            this.setState({userId:_id, username, token})}).catch(e => console.log("there is an error in user context didmount"))
      }

userLogin = (user) => {
        console.log(user)
        const{ _id , username , token} = user
        localStorage.setItem("id", _id)
            this.setState({userId:_id, username, token})
        }


    render() { 
        return (
            <UserContext.Provider value={{...this.state, userLogin:this.userLogin}}>
                {this.props.children}
            </UserContext.Provider>


          );
    }
}
 
export default UserContextProvider;