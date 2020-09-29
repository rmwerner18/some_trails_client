import React from "react"
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';

class HikeForm extends React.Component {


    state = {
        photo: null,
        name: "",
        length: "",
        startTime: "",
        endTime: "",
        trail: ""
    }

    changeHandler = (e) => {
        if (e.target.files) {
            let photo = e.target.files[0];
            this.setState({
                photo: photo
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
     

    mapTrails = () => {  
        // makes sure the trail names are unique, wont be an issue with api
        let names = this.props.trails.map(trail => trail.name)
        let unique = [...new Set(names)];
        // w/ api, do: this.props.trails.map(trail => <option value={trail.name} />)
        return unique.map(trail => <option value={trail}/>)
    }
    

    submitHandler = (e) => {
        e.preventDefault()
        let trail = () => this.props.trails.find(trail => trail.name === this.state.trail)
        let formData = new FormData()
        formData.append('hike[photo]', this.state.photo)
        formData.append('hike[name]', this.state.name)
        formData.append('hike[length]', this.state.length)
        formData.append('hike[start]', this.state.startTime)
        formData.append('hike[end]', this.state.endTime)
        formData.append('hike[trail_id]', trail().id)
        formData.append('hike[user_id]', 3)
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/hikes");
        request.send(formData)
        // this.refreshPage()
    }

    refreshPage = () => {
        window.location.reload(false)
    }


    render() {
        // console.log(this.state)
        return(
            <>
            <form onSubmit={this.submitHandler}>
            <fieldset>
                <legend>Log a recent hike</legend>
                    <input type="text" name="name" onChange={this.changeHandler} value={this.state.name} placeholder="Name Your Hike" />
                    <input list="browsers" name="trail" placeholder="Where was your hike" onChange={this.changeHandler} value={this.state.trail} />
                    {/* <label for="browser">Where was your hike</label> */}
                    <datalist id="browsers">
                    {this.mapTrails()}
                    </datalist><br></br>
                    <input type="number" name="length" step="0.1" onChange={this.changeHandler} value={this.state.length} placeholder="How many miles was your hike" /><br></br>
                    <input type="datetime-local" id="start-time" name="startTime" onChange={this.changeHandler} value={this.state.startTime}/>
                    <label for="start-time">Start date and time</label><br></br>
                    <input type="datetime-local" id="end-time" name="endTime" onChange={this.changeHandler} value={this.state.endTime}/>
                    <label for="end-time">End date and time</label><br></br>
                    <input type="file" name="photo" onChange={this.changeHandler} />
                    <img src={this.state.selectedFile}/>
                    <input type="submit" value="Post your hike"/>
                </fieldset>

            {/* <form onSubmit={this.submitHandler}>
                <h3>Log a recent hike!</h3>
                {/* <button width="100%" type="button" className="btn btn-info" onClick={this.fileUploadHandler}>Upload File</button> */}
                {/* <input type="submit" value="Post your hike"/> */}
            </form>
            </>
        )
    }
}





export default HikeForm