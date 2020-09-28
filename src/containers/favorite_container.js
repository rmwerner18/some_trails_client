import React from "react"
import TrailCard from '../components/TrailCard'

export default class FavoriteContainer extends React.Component {
    
    renderFaves = () => {
        return this.props.faves.map(fave => <TrailCard key={fave.id} trail={fave} />)
    }
    
    render() {
        // console.log("faves in faves", this.props.faves)
        return(
            <div>
                <h3>Bookmarked Trails:</h3>
                {this.renderFaves()}
            </div>
        )
    }

}