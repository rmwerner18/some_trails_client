import React from "react"
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';

class HikeForm extends React.Component {


    state = {
        selectedFile: null
    }

    changeHandler = (e) => {
        e.persist();
        // console.log("change", e.target.files, e.target.value)
        // let file = e.target.files[0];
        // console.log("file:", file);
        // console.log(this.validateSize(e));
        // if(this.validateSize(e)){ 
        // console.log(file);
        // if return true allow to setState
        // this.setState({
        // selectedFile: file
        // });
    }
    

    fileUploadHandler = () => {
        // const data = new FormData()
        // console.log("state:", this.state.selectedFile);
        // data.append('file', this.state.selectedFile)
        // console.log("form data", data);
        // axios.post("http://localhost:3000/hikes", data)
        // .then(res => { // then print response status
        //     toast.success('upload success')
        // })
        // .catch(err => { // then print response status
        //     toast.error('upload fail')
        // })
    }

    mapTrails = () => {  
        // makes sure the trail names are unique, wont be an issue with api
        let names = this.props.trails.map(trail => trail.name)
        let unique = [...new Set(names)];
        // w/ api, do: this.props.trails.map(trail => <option value={trail.name} />)
        return unique.map(trail => <option value={trail}/>)
    }


    render() {
        return(
            <>
            <form>
            <fieldset>
                <legend>Log a recent hike</legend>
                    <input type="text" placeholder="Name Your Hike"/><br></br>
                    <input list="browsers" name="browser" placeholder="Where was your hike"/>
                    {/* <label for="browser">Where was your hike</label> */}
                    <datalist id="browsers">
                    {this.mapTrails()}
                    </datalist><br></br>
                    <input type="number" step="0.01" placeholder="How many miles was your hike" /><br></br>
                    <input type="datetime-local" id="start-time" name="start-time" />
                    <label for="start-time">Start date and time</label><br></br>
                    <input type="datetime-local" id="end-time" name="end-time" />
                    <label for="end-time">End date and time</label><br></br>
                    <input type="file" onChange={this.changeHandler}/>
                    <button width="100%" type="button" className="btn btn-info" onClick={this.fileUploadHandler}>Upload File</button><br></br>
                    <input type="submit" value="Post your hike"/>
                </fieldset>
            </form>
            </>
        )
    }
}





export default HikeForm