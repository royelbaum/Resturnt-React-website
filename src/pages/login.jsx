import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
//import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import { result } from 'lodash';
import {UserContext} from "../contexts/usercontext"
import HomeNavBar from '../componnent/homenavbar';
// Redux stuff
//import { connect } from 'react-redux';
//import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme
});

class Login extends Component {
    static contextType = UserContext

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.UI.errors) {
//       this.setState({ errors: nextProps.UI.errors });
//     }
//   }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    Axios.post(`http://localhost:9000/api/auth`,userData,)
    .then((result)=>{
    //console.log("the result in login", result)
    this.context.userLogin(result.data)
    this.props.history.push("/api/resturants")
    // this.setState({token:result.data.token}) 
    })
    .catch((e)=>console.error("there was an error: ", e))
 //   this.props.loginUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  render() {
    

    return (
        <React.Fragment>
        <HomeNavBar/>
      <Grid container className="form">
        <Grid item sm />
        <Grid item sm>
          {/* <img src={AppIcon} alt="monkey" className={classes.image} /> */}
          <Typography variant="h2" className="pagetitle">
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className="email"
              helperText={this.state.email}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className="password"
              helperText={this.state.password}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit"
            >
              Login
              {
                <CircularProgress size={30} className="loading" />
              }
            </Button>
            <br />
            <small>
              dont have an account ? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
      </React.Fragment>
    );
  }
}



export default Login;
// export default connect(
//   mapStateToProps,
//   mapActionsToProps
// )(withStyles(styles)(Login));