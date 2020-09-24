import React from "react"

class TrailCard extends React.Component {

    render() {
        return(
            <div>
                <p>{this.props.trail.name}</p>
                <p>{this.props.trail.location}</p>
                <p>{this.props.trail.summary}</p>
            </div>
        )
    }
}




export default TrailCard;