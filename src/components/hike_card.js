import React from 'react'

const HikeCard = (props) => {

    let findTrailById = () => {
        let trail = props.trails.find(trail => trail.id === props.hike.trail_id)
        return trail.name
    }

    let modal = () => {
        // console.log("trail here")
    }

    // console.log("hike trails:", props.trails)
    return (
    <div className="hike-card">
        <h1>{props.hike.name}</h1>
        <img src={`http://localhost:3000/hikes/${props.hike.id}/photo`} alt="photo" />
        <p>Miles: {props.hike.length}</p>
        {/* <p>{props.hike.start.toString()} - {props.hike.end.toString()}</p> */}
        <p>Trail: <span onClick={modal}>{findTrailById()}</span></p>
    </div>
    )
}

export default HikeCard