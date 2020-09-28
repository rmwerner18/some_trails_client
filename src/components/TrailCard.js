import React from "react"

class TrailCard extends React.Component {
    state = {
    }

    clickHandler = () => {
        document.getElementById('myModal').style.display = "block"
    }

    closeHandler = () => {
        document.getElementById('myModal').style.display = "none"
    }

    render() {
        console.log(this.props.trail.difficulty)
        return(
            <div className="trail-card">
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.closeHandler}>&times;</span>
                        <p id="modal-text">{this.props.trail.name}</p>
                    </div>
                </div>
                <div className="trail-card-front" onClick={this.clickHandler}>
                    <img src={this.props.trail.image} alt={this.props.trail.name}/>
                    <h4>{this.props.trail.name}</h4>
                    <p>Location: {this.props.trail.location}</p>
                    <p>Difficulty: {this.props.trail.difficulty}</p>
                    <p>Summary: {this.props.trail.summary}</p>
                </div>
            </div>
        )
    }
}




export default TrailCard;