import React from "react"
import TrailCard from '../components/TrailCard'

export default class FavoriteContainer extends React.Component {
    
    state = {
        faveArray: []
    }
    
    mapFaves = () => {
        return this.state.faveArray.map(fave => <TrailCard key={fave.trail_id} trail={fave.trail_id}  faveHandler={this.props.faveHandler} />)
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/favorites")
        .then(resp => resp.json())
        .then(faves => this.setState({
            faveArray: faves
        }))
    }
    
    render() {
        console.log("faves in faves", this.state.faveArray)
        return(
            <div>
                <h3>Bookmarked Trails:</h3>
                {this.mapFaves()}
            </div>
        )
    }

}