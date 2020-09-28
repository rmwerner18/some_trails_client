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

    difficultyRender = () => {
        if (this.props.trail.difficulty === "blue") {
            return <img src="https://i.imgur.com/mLgjNSV.png" alt={this.props.trail.difficulty}/>
        } else if (this.props.trail.difficulty === "blueBlack"){
            return <img src="https://i.imgur.com/6XJd33b.png" alt={this.props.trail.difficulty}/>
        } else if (this.props.trail.difficulty === "black"){
            return <img src="https://i.imgur.com/dt0g4fb.png?1" alt={this.props.trail.difficulty}/>
        } else if (this.props.trail.difficulty === "green"){
            // don't know if it's called "green"
            return <img src="https://i.imgur.com/0V3ED1p.png" alt={this.props.trail.difficulty}/>
        } else if (this.props.trail.difficulty === "greenBlue"){
            // don't know if its called "greenBlue"
            return <img src="https://i.imgur.com/IBiL4ow.png" alt={this.props.trail.difficulty}/>
        }
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
                    {this.difficultyRender()}
                    <p>Location: {this.props.trail.location}</p>
                    <p>Summary: {this.props.trail.summary}</p>
                </div>
            </div>
        )
    }
}




export default TrailCard;