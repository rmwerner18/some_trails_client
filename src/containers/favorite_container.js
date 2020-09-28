import React from "react"
import TrailCard from '../components/TrailCard'

export default class FavoriteContainer extends React.Component {
    
    renderFaves = () => {
        return this.props.faves.map(fave => <TrailCard key={fave.id} trail={fave} />)
        // console.log("trail", this.trail)
        // this.postFavorites(this.trail)
    }

    postFavorites = () => {

        // let options = {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify({trail_id: this.props.trail.id})
        // }
        
        // fetch("http://localhost:3000/favorites", options)
        // .then(resp => resp.json())
        // .then()
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