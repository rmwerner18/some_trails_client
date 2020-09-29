import React from "react"
import TrailCard from '../components/TrailCard'

export default class FavoriteContainer extends React.Component {
    
    state = {
        faveArray: [],
        favedTrails: []
    }
    
    mapFaves = () => {
        return this.state.faveArray.map(fave => 
            fetch("http://localhost:3000/trails/" + fave.trail_id)
            .then (resp => resp.json())
            .then(trail => this.setState({favedTrails: [...this.state.favedTrails, trail]}))
            // .then(console.log)
            )
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/favorites")
        .then(resp => resp.json())
        .then(faves => this.setState(() => ({faveArray: faves}),
        () => {this.mapFaves()})
        )
    }


    mapFavedTrails = () => {
        return this.state.favedTrails.map(trail => <TrailCard key={trail.id} trail={trail}/>)
    }



    
    render() {
        // console.log("faves in faves", this.state)
        return(
            <div>
                <h3>Bookmarked Trails:</h3>
                {this.mapFavedTrails()}
            </div>
        )
    }

}