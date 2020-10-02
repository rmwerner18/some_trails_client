import React from "react"


export default class Login extends React.Component {

    state = {
        hasAccount: false,
        username: "",
        password: "",
        bio: "",
        image: ""
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    changeHasAccount = () => {
        this.setState(previousState => ({hasAccount: !previousState.hasAccount}))
    }

    render() {
        return(!this.state.hasAccount ?
            <>
                <button onClick={this.changeHasAccount}>Have an account? Log In</button>
                <form onSubmit={(e) => this.props.newUserHandler(e, this.state)}>
                    <input type="text" name="username" onChange={this.changeHandler} value={this.state.username} placeholder='username' />
                    <input type="password" name="password" onChange={this.changeHandler} value={this.state.password} placeholder='password' />
                    <input type="text" name="bio" onChange={this.changeHandler} value={this.state.bio} placeholder='bio' />
                    <input type="text" name="image" onChange={this.changeHandler} value={this.state.image} placeholder='profile pic' />
                    <input type="submit"/>
                </form>
            </>
            :
            <>
                <button onClick={this.changeHasAccount}>Back to Sign Up</button>
                <form onSubmit={(e) => this.props.submitHandler(e, this.state)}>
                    <input type="text" name="username" onChange={this.changeHandler} value={this.state.username} placeholder='username'/>
                    <input type="password" name="password" onChange={this.changeHandler} value={this.state.password} placeholder='password'/>
                    <input type="submit"/>
                </form>
            </>
            
        )
    }



}