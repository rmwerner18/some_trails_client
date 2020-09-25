import React from 'react'
import HikeCard from '../components/hike_card'

class HikeContainer extends React.Component {
    hikes = () => {
        console.log("hikeContainer:", this.props)
        return this.props.hikes.map(hike => <HikeCard key={hike.id} hike={hike}/>)
    }

    render() {
        return this.hikes()
    }
}

export default HikeContainer