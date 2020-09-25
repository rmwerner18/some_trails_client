import React from 'react'

const HikeCard = (props) => {
    return (
    <>
        <h1>{props.hike.name}</h1>
        <img src={props.hike.photo} alt=""/>
    </>
    )
}

export default HikeCard