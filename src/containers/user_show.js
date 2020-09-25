import React from "react"
import HikeForm from '../components/hike_form'
import HikeContainer from './hike_container'


class User extends React.Component {

    state = {
        user: {}
    }
    
    componentDidMount() {
        fetch("http://localhost:3000/users/3")
        .then(resp => resp.json())
        .then(user => this.setState({user: user}))
    }
    
    
    render() {
        console.log("HIKES", this.state.user.hikes)
        return (
            this.state.user.hikes
            ?
            <>
            <h1>Welcome, {this.state.user.username}!</h1>
            <img src={this.state.user.image} alt={this.state.user.username}/>
            <h4>About Me: {this.state.user.bio}</h4>
            <HikeForm trails={this.props.trails}/>
            </>
            :
            null 
        )
    }
        
}

export default User;