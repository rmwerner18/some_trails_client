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
    search: ""
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

  render() {
    return this.state.trailArray.length > 0  
    ?
    <>
      <div className="App">
          <NavBar />
        <Switch>
          <Route path="/trails" render={() => <TrailsContainer trails={this.filterTrails()} searchHandler={this.searchHandler}/>} />
          <Route path="/users" render={() => <User trails={this.filterTrails()}/>} />
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
