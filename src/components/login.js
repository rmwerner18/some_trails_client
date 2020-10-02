import React from "react"


export default class Login extends React.Component {

    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return(
            <form onSubmit={(e) => this.props.submitHandler(e, this.state)}>
                <input type="text" name="username" onChange={this.changeHandler} value={this.state.username}/>
                <input type="password" name="password" onChange={this.changeHandler} value={this.state.password}/>
                <input type="submit"/>
            </form>
        )
    }



}