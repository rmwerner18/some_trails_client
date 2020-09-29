import React from "react"
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';

class HikeForm extends React.Component {


    state = {
        photo: null,
        name: "",
        length: "",
        start: "",
        end: "",
        trail: ""
    }

    componentDidMount = () => {
        if (this.props.hike) {
            let findTrailById = () => {
                let trail = this.props.trails.find(trail => trail.id === this.props.hike.trail_id)
                return trail.name
            }        
            let hike = this.props.hike
            this.setState({
                photo: hike.photo,
                name: hike.name,
                length: hike.length,
                start: Date.parse(hike.start),
                end: Date.parse(hike.end),
                trail: findTrailById(hike.id), 
                trail_id: this.props.hike.trail_id
            })
        }
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
    


    editHandler = () => {
        this.props.editHandler(this.props.hike.id, this.state)
    }

    submitHandler = (e) => {
        this.props.submitHandler(e, this.state)
        // this.setState({
        //     photo: null,
        //     name: "",
        //     length: "",
        //     start: "",
        //     end: "",
        //     trail: ""
        // })
    }


    render() {
        return(
            <>
            <form onSubmit={(e) => this.submitHandler(e)}>
            <fieldset>
                {this.props.hike 
                ?
                <legend>Edit Hike</legend>
                :
                <legend>Log a recent hike</legend>
                }
                    <input type="text" name="name" onChange={this.changeHandler} value={this.state.name} placeholder="Name Your Hike" />
                    <input list="browsers" name="trail" placeholder="Where was your hike" onChange={this.changeHandler} value={this.state.trail} />
                    <datalist id="browsers">
                    {this.mapTrails()}
                    </datalist><br></br>
                    <input type="number" name="length" step="0.1" onChange={this.changeHandler} value={this.state.length} placeholder="How many miles was your hike" /><br></br>
                    <input type="datetime-local" id="start-time" name="start" onChange={this.changeHandler} value={this.state.start}/>
                    <label for="start-time">Start date and time</label><br></br>
                    <input type="datetime-local" id="end-time" name="end" onChange={this.changeHandler} value={this.state.end}/>
                    <label for="end-time">End date and time</label><br></br>
                    {this.props.hike 
                    ?
                    null
                    :
                    <input type="file" name="photo" onChange={this.changeHandler} />
                    }
                    {this.props.hike 
                    ?
                    <button type="button" onClick={this.editHandler}>Submit Changes</button>
                    :
                    <input type="submit" value="Post your hike"/>
                    }
                </fieldset>
            </form>
            </>
        )
    }
}





export default HikeForm