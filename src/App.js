import React from 'react';
import './App.css';
import TrailsContainer from './containers/TrailsContainer'
import { Route, Switch } from 'react-router-dom'
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

    // let person = {
    //   username: "sylvia",
    //   password: "whatscooking",
    //   bio: "Sylvia Woods was an American restaurateur who founded the sould food restaurant Sylvia's in Harlem on Lenox Avenue, New York City in 1962. She published two cookbooks and was an important figure in the community.",
    //   image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Syvia_of_Sylvia%27s_reaturant_N.Y.C_%28cropped%29.jpg"
    // }

    // fetch('http://localhost:3000/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',

    //   },
    //   body: JSON.stringify({user: person})
    // })
    //   .then(r => r.json())
    //   .then(console.log)


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

  loginHandler = (e, loginState) => {
    // e.preventDefault()
    console.log(loginState)
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({user: loginState})
    }).then(r => r.json())
    .then(result => {
      console.log(result)
      localStorage.setItem('token', result.jwt);
      localStorage.setItem('user_id', JSON.parse(result.user).id);
      this.setState({user: JSON.parse(result.user)});
      this.props.history.push('/')
    })
  }

  render() { 
    //  return this.state.trailArray.length > 0  
    //  ?
    console.log('faves in app:', this.state.faveArray)
    return (
     <>
      <div className="App">
          <NavBar />
        <Switch>
          <Route path="/trails" render={() => <TrailsContainer trails={this.filterTrails()} faves={this.state.faveArray} locationSubmitHandler={this.locationSubmitHandler} searchHandler={this.searchHandler} faveHandler={this.faveHandler}/>} />
          <Route path="/users" render={() => <User trails={this.filterTrails()} faves={this.state.faveArray} faveHandler={this.faveHandler}/>} />
          <Route path="/login" render={() => <Login submitHandler={this.loginHandler}/>}/>
          <Route path="/" render={() => <Home />}/>
        </Switch>
      </div>
    </>
    )
    // :
    // "loading..."
  }
}

export default App;
