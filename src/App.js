import React from 'react';
import './App.css';
import TrailsContainer from './containers/TrailsContainer'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar';
import User from './containers/user_show';
import Home from './components/Home';
import Login from './components/login'

class App extends React.Component {
  
  state = {
    trailArray: [],
    search: "",
    faveArray: [],
    user: {}
  }

  
  componentDidMount = () => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }}).then(resp => resp.json())
        .then(result => this.setState({user: JSON.parse(result.user)}))


      fetch('http://localhost:3000/trails', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(trails => {
        console.log(trails)
        this.setState({trailArray: trails})
      })

      fetch("http://localhost:3000/favorites", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(
        faves => this.setState(previousState => ({
        faveArray: previousState.faveArray.concat(faves)
      }))
      )
    } else {
      this.props.history.push('/login')
    }
  }

  searchHandler = (searchString) => {
    this.setState({search: searchString})
    this.filterTrails()
  }

  filterTrails = () => {
    return this.state.trailArray.filter(trail => trail.name.toLowerCase().includes(this.state.search.toLowerCase()))
  }
  
  
  faveHandler = (faveTrail) => {
    console.log(localStorage.getItem('user_id'))
    console.log('faveArray in app', this.state.faveArray)

    let favorite = this.state.faveArray.find(fave => parseInt(fave.user_id) === parseInt(localStorage.getItem('user_id')) && fave.trail_id === faveTrail.id)
    console.log('favorite:', favorite)
    if (favorite) {
      console.log('**UNFAVORITED**')
      let newArray = this.state.faveArray
      let index = newArray.findIndex(fav => fav.id === favorite.id)
      newArray.splice(index, 1)
      this.setState({faveArray: newArray})
      fetch(`http://localhost:3000/favorites/${favorite.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    } else {
      console.log('**FAVORITED**')

    let object = {
      user_id: localStorage.getItem('user_id'),
      trail_id: faveTrail.id}

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(object)}

    fetch("http://localhost:3000/favorites", options)
    .then(resp => resp.json())
    .then(result => {console.log("newfaves:", result)
    this.setState(() => ({
      faveArray: [result, ...this.state.faveArray]
    }))})
      }
  }

  locationSubmitHandler = (searchTerm) => {
    fetch(`http://localhost:3000/trails/?location=${searchTerm}`, {
      method: "GET",
      headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(resp => resp.json())
    .then(trails => this.setState({trailArray: trails}))
  }

  newUserHandler = (e, state) => {
    let user = {
      username: state.username,
      password: state.password,
      bio: state.bio,
      image: state.image,
    }
    e.preventDefault()
    console.log(state)
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({user: user})
    }).then(resp => resp.json())
    .then(console.log)
  }

  loginHandler = (e, loginState) => {
    let user = {
      username: loginState.username,
      password: loginState.password
    }
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({user: user})
    }).then(r => r.json())
    .then(result => {
      console.log(result)
      localStorage.setItem('token', result.jwt);
      this.setState({user: JSON.parse(result.user)});
      this.props.history.push('/')
    })
  }

  logoutHandler = () => {
    localStorage.removeItem('token')
    this.setState({user: {}})
  }

  render() { 
    //  return this.state.trailArray.length > 0  
    //  ?
    console.log("app state:", this.state)
    console.log('faves in app:', this.state.faveArray)
    return (
     <>
      <div className="App">
          <NavBar user={this.state.user} />
        <Switch>
          <Route path="/trails" render={() => this.state.user.id ? 
              <TrailsContainer user={this.state.user} trails={this.filterTrails()} faves={this.state.faveArray} locationSubmitHandler={this.locationSubmitHandler} searchHandler={this.searchHandler} faveHandler={this.faveHandler}/>
              :
              <Redirect to={'/login'}/>}/>
          <Route path="/users" render={() => this.state.user.id ? 
              <User  user={this.state.user} trails={this.filterTrails()} faves={this.state.faveArray} faveHandler={this.faveHandler}/>
              :
              <Redirect to={'/login'}/>}/>
          <Route path="/login" render={() => this.state.user.id ?
              <Redirect to={'/users'}/>
              :
              <Login submitHandler={this.loginHandler} newUserHandler={this.newUserHandler} />}/>
          <Route path="/logout" render={() => this.state.user.id ?
              this.logoutHandler()
              :
              <Redirect to={'/login'}/>}/>
          <Route path="/" render={() => <Home />}/>
        </Switch>
      </div>
    </>
    )
    // :
    // "loading..."
  }
}

export default withRouter(App);
