import React from "react"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class HikeForm extends React.Component {


    state = {
        photo: null,
        name: "",
        length: ""
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
    

    submitHandler = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('hike[photo]', this.state.photo)
        formData.append('hike[name]', this.state.name)
        formData.append('hike[length]', this.state.length)
        formData.append('hike[user_id]', 3)
        formData.append('hike[trail_id]', 9)
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/hikes");
        request.send(formData)
        // this.refreshPage()
    }

    refreshPage = () => {
        window.location.reload(false)
    }


    render() {
        console.log(this.state)
        return(
            <>
            <img src={this.state.selectedFile}/>
            <form onSubmit={this.submitHandler}>
                <h3>Log a recent hike!</h3>
                <input type="text" name="name" onChange={this.changeHandler} value={this.state.name} placeholder="Name Your Hike" />
                <input type="number" name="length" onChange={this.changeHandler} value={this.state.miles} placeholder="How many miles was your hike?" />
                <input type="file" name="photo" onChange={this.changeHandler} />
                {/* <button width="100%" type="button" className="btn btn-info" onClick={this.fileUploadHandler}>Upload File</button> */}
                <input type="submit" value="Post your hike"/>
            </form>
            </>
        )
    }
}





export default HikeForm