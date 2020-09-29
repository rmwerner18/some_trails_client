import React from 'react'
import HikeForm from './hike_form'


class HikeCard extends React.Component {

    state = {
        isInEditMode: false
    }

    findTrailById = () => {
        let trail = this.props.trails.find(trail => trail.id === this.props.hike.trail_id)
        if (trail) {
            return trail.name
        } else return this.props.hike.trail
    }

    modalHandler = (e) => {
        document.getElementById('myModal').style.display = "block"
    }

    closeHandler = () => {
        document.getElementById('myModal').style.display = "none"
    }

    changeEditMode = () => {
        this.setState(previousState => ({isInEditMode: !previousState.isInEditMode}))
    }
    

    render() {
        return (
            <div className="hike-card">

                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.closeHandler}>&times;</span>
                        <p id="modal-text">Hellooo</p>
                    </div>
                </div>

                <div className="hike-card-photo">
                    <img src={`http://localhost:3000/hikes/${this.props.hike.id}/photo`} alt="hike pic" onClick={this.modalHandler} />
                </div>

                {this.state.isInEditMode 
                ?
                <div className="edit-hike-card-content" onDoubleClick={this.changeEditMode}>
                    <HikeForm hike={this.props.hike} trails={this.props.trails} editHandler={this.props.editHandler}/>
                </div>    
                :
                <div className="hike-card-content" onDoubleClick={this.changeEditMode}>
                    <h1>{this.props.hike.name}</h1>
                    <p>Miles: {this.props.hike.length}</p>
                    <p>{this.props.hike.start} - {this.props.hike.end}</p>
                    <p>Trail: <span onClick={this.modalHandler}>{this.findTrailById()}</span></p>
                </div>
                }

                <div className="hike-card-buttons">
                    <button onClick={() => this.props.deleteHandler(this.props.hike.id)}>Delete</button>
                </div>

            </div>
        )
    }
}

export default HikeCard