import React from "react"
import HikeForm from '../components/hike_form'

class User extends React.Component {

    state = {
        user: {}
    }
    
    componentDidMount() {
        fetch("http://localhost:3000/users/2")
        .then(resp => resp.json())
        .then(user => this.setState({user: user}))
    }
    
    
    render() {
        return(
            <>
            <h1>Welcome, {this.state.user.username}!</h1>
            <img src={this.state.user.image} />
            <h4>About Me: {this.state.user.bio}</h4>
            <HikeForm />
            </>
        )
    }
}

export default User;