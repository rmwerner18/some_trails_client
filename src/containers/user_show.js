import React from "react"
import HikeForm from '../components/hike_form'
import HikeContainer from './hike_container'
import FavoriteContainer from './favorite_container'


class User extends React.Component {

    state = {
        user: {}
    }
    
    componentDidMount() {
        // fetch(`http://localhost:3000/users/${this.props.user.id}`, {
        //     method: "GET",
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        // })
        // .then(resp => resp.json())
        // .then(user => 
        this.setState({user: this.props.user})
    }

    hikeEditHandler = (id, state) => {
        let formData = new FormData()
        if (state.photo) {
            formData.append('hike[photo]', state.photo)
        }
        formData.append('hike[name]', state.name)
        formData.append('hike[length]', state.length)
        formData.append('hike[start]', state.start)
        formData.append('hike[end]', state.end)
        formData.append('hike[trail_id]', state.trail_id)
        formData.append('hike[user_id]', this.props.user.id)

        fetch(`http://localhost:3000/hikes/${id}`, {
            method: "PATCH", 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        }).then(response => response.json())
        .then(result => {
          console.log('result:', result);
        let newArray = this.state.user.hikes
        let index = newArray.findIndex(hike => hike.id === id)
        newArray.splice(index, 1, result)
        this.setState(previousState => (
            {user: {
                hikes: newArray,
                bio: previousState.user.bio,
                favorites: previousState.user.favorites,
                id: previousState.user.id,
                image: previousState.user.image,
                password_digest: previousState.user.password_digest,
                username: previousState.user.username,
            }}
        ))
        alert('Your changes have been saved!')
        })
    }

    formSubmitHandler = (e, state) => {
        e.preventDefault()        
        let trail = () => this.props.trails.find(trail => trail.name === state.trail)

        let formData = new FormData()
        if (state.photo) {
            formData.append('hike[photo]', state.photo)
        }
        formData.append('hike[name]', state.name)
        formData.append('hike[length]', state.length)
        formData.append('hike[start]', state.start)
        formData.append('hike[end]', state.end)
        formData.append('hike[trail_id]', trail().id)
        formData.append('hike[user_id]', this.props.user.id)
        
        fetch('http://localhost:3000/hikes', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        }).then(response => response.json())
        .then(result => {
          console.log('result:', result);
        let newArray = this.state.user.hikes
        newArray.push(result)
        this.setState(previousState => (
            {user: {
                hikes: newArray,
                bio: previousState.user.bio,
                favorites: previousState.user.favorites,
                id: previousState.user.id,
                image: previousState.user.image,
                password_digest: previousState.user.password_digest,
                username: previousState.user.username,
            }}
        ))
        })
    }

    render() {
        console.log(this.state.user)
        return (
            this.state.user.hikes
            ?
            <div className="user-show">
                <h1 className="user-welcome">Welcome, {this.state.user.username}!</h1>
                <div className="prof-pic">
                    <img className="prof-pic" src={this.state.user.image} alt={this.state.user.username}/>
                    <h4>About Me: {this.state.user.bio}</h4>
                </div>
                <FavoriteContainer user={this.state.user} faves={this.props.faves} trails={this.props.trails} faveHandler={this.props.faveHandler}/>
                <HikeForm trails={this.props.trails} editHandler={this.hikeEditHandler} submitHandler={this.formSubmitHandler} />
                <HikeContainer hikes={this.state.user.hikes} trails={this.props.trails} editHandler={this.hikeEditHandler}/>
            </div>
            :
            "loading" 
        )
    }
        
}

export default User;