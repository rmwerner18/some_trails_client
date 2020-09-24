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
        return(
            <div className="trail-card">
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.closeHandler}>&times;</span>
                        <p id="modal-text">{this.props.trail.name}</p>
                    </div>
                </div>
                <div className="trail-card-front" onClick={this.clickHandler}>
                    <img src={this.props.trail.image} />
                    <p>{this.props.trail.name}</p>
                    <p>{this.props.trail.location}</p>
                    <p>{this.props.difficulty}</p>
                    <p>{this.props.trail.summary}</p>
                </div>
            </div>
        )
    }
}




export default TrailCard;