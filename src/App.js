import React from 'react';
import './App.css';
import TrailsContainer from './containers/TrailsContainer'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar';
import User from './containers/user_show';
import Home from './components/Home';

class App extends React.Component {
  
  state = {
    trailArray: [],
    search: "",
    faveArray: []
  }
  
  componentDidMount = () => {
    fetch('http://localhost:3000/trails/?name=${form.value}')
    .then(resp => resp.json())
    .then(trails => this.setState({trailArray: trails}))

    fetch("http://localhost:3000/favorites")
    .then(resp => resp.json())
    .then(
      faves => this.setState(previousState => ({
      faveArray: previousState.faveArray.concat(faves)
    }))
    )
  }

  searchHandler = (searchString) => {
    this.setState({search: searchString})
    this.filterTrails()
  }

  filterTrails = () => {
    return this.state.trailArray.filter(trail => trail.name.toLowerCase().includes(this.state.search.toLowerCase()))
  }
  
  
  faveHandler = (faveTrail) => {
    console.log("faveTrail.favorites:", faveTrail.favorites)
    let favorite = this.state.faveArray.find(fave => fave.user_id === 3 || fave.trail_id === faveTrail.id)
    console.log("favorite", favorite)
    if (favorite) {
      console.log("**UNFAVORITED**")
      let newArray = this.state.faveArray
      let index = newArray.findIndex(fav => fav.id === favorite.id)
      newArray.splice(index, 1)
      this.setState({faveArray: newArray})
      fetch(`http://localhost:3000/favorites/${favorite.id}`, {
        method: "DELETE"
      })
    } else {
      console.log('**FAVORITED**')
    let object = {
      user_id: 3,
      trail_id: faveTrail.id}

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"},
      body: JSON.stringify(object)}

    fetch("http://localhost:3000/favorites", options)
    .then(resp => resp.json())
    .then(result => {console.log("newfaves:", result)
    this.setState(() => ({
      faveArray: [result, ...this.state.faveArray]
    }))})
    // console.log("object:", object, "options:", options)

    // UNCOMMENT ONCE YOU FIGURE OUT HOW TO DELETE
    // if (this.state.faveArray.includes(faveTrail)) {
    // } else {
      // this.setState(() => ({
      //   faveArray: [result, ...this.state.faveArray]
      // }))
    // }
      }
    console.log('***********************')
  }

  locationSearchHandler = (searchterm) => {
    console.log("searchTerm in app:", searchterm)
  }

  

  render() { 
    console.log("this.state.faveArray:", this.state.faveArray) 
     return this.state.trailArray.length > 0  
     ?
     <>
      <div className="App">
          <NavBar />
        <Switch>
          <Route path="/trails" render={() => <TrailsContainer trails={this.filterTrails()} locationSearchHandler={this.locationSearchHandler} searchHandler={this.searchHandler} faveHandler={this.faveHandler}/>} />
          <Route path="/users" render={() => <User trails={this.filterTrails()} faves={this.state.faveArray} faveHandler={this.faveHandler}/>} />
          <Route path="/login" />
          <Route path="/" render={() => <Home />}/>
        </Switch>
      </div>
    </>
    :
    "loading..."
  }
}

export default App;
