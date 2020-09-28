import React from 'react'

const HikeCard = (props) => {
    return (
    <>
        <h1>{props.hike.name}</h1>
        <img src={`http://localhost:3000/hikes/${props.hike.id}/photo`} alt="photo" />
    </>
    )
}

export default HikeCard