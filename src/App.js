import React from 'react';
import logo from './logo.svg';
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
    fetch('http://localhost:3000/trails')
    .then(resp => resp.json())
    .then(trails => this.setState({trailArray: trails}))
  }

  searchHandler = (searchString) => {
    this.setState({search: searchString})
    this.filterTrails()
  }

  filterTrails = () => {
    return this.state.trailArray.filter(trail => trail.name.toLowerCase().includes(this.state.search.toLowerCase()))
  }

  faveHandler = (faveTrail) => {
    // console.log("fave in app", faveTrail)
    // console.log("clicking: ", faveTrail)
    if (this.state.faveArray.includes(faveTrail)) {
    } else {
      this.setState(() => ({
        faveArray: [faveTrail, ...this.state.faveArray]
      }))
    }
  }


  render() { 
    // console.log("faves in app", this.state.faveArray) 
     return this.state.trailArray.length > 0  
     ?
     <>
      <div className="App">
          <NavBar />
        <Switch>
          <Route path="/trails" render={() => <TrailsContainer trails={this.filterTrails()} searchHandler={this.searchHandler} faveHandler={this.faveHandler}/>} />
          <Route path="/users" render={() => <User trails={this.filterTrails()} faves={this.state.faveArray}/>} />
          <Route path="/login" />
          <Route path="/" render={() => <Home />}/>
        </Switch>
      </div>
    </>
    :
    "loading"
  }
}

export default App;
