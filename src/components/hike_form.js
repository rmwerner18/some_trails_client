import React from "react"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class HikeForm extends React.Component {


    state = {
        selectedFile: null
    }

    changeHandler = (e) => {
        e.persist();
        // console.log("change", e.target.files, e.target.value)
        let file = e.target.files[0];
        console.log("file:", file);
        // console.log(this.validateSize(e));
        // if(this.validateSize(e)){ 
        // console.log(file);
        // if return true allow to setState
        this.setState({
        selectedFile: file
        });
    }
    

    fileUploadHandler = () => {
        const data = new FormData()
        console.log("state:", this.state.selectedFile);
        data.append('file', this.state.selectedFile)
        console.log("form data", data);
        // axios.post("http://localhost:3000/hikes", data)
        // .then(res => { // then print response status
        //     toast.success('upload success')
        // })
        // .catch(err => { // then print response status
        //     toast.error('upload fail')
        // })
    }




    render() {
        return(
            <>
            <img src={this.state.selectedFile}/>
            <form>
                <h3>Log a recent hike!</h3>
                <input type="text" placeholder="Name Your Hike"/>
                <input type="number" placeholder="How many miles was your hike?" />
                <input type="file" onChange={this.changeHandler}/>
                <button width="100%" type="button" className="btn btn-info" onClick={this.fileUploadHandler}>Upload File</button>
                <input type="submit" value="Post your hike"/>
            </form>
            </>
        )
    }
}





export default HikeForm