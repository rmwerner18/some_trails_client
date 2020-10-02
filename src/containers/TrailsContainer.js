import React from "react"
import TrailCard from '../components/TrailCard'
import SearchTrails from '../components/search_trail_form'
import SearchTrailLocations from '../components/SearchTrailLocations'

export default class TrailsContainer extends React.Component {

    searchHandler = (searchValue) => {
        this.props.searchHandler(searchValue)
    }
    
    trailGenerator = () => {
        return this.props.trails.map(trail => <TrailCard key={trail.id} user={this.props.user} trail={trail} faves={this.props.faves} faveHandler={this.faveHandler}/>)
    }

    faveHandler = (faveTrail) => {
        this.props.faveHandler(faveTrail)
    }

    // locationSearchHandler = (searchTerm) => {
    //     this.props.locationSearchHandler(searchTerm)
    // }

    render() {
        return this.props.trails.length > 0  
        ?
            <div className="trails-container">
                <div>
                    <SearchTrailLocations locationSubmitHandler={this.props.locationSubmitHandler} />
                    <SearchTrails searchHandler={this.searchHandler}/>
                </div>
                {this.trailGenerator()}
            </div>
        :
        "loading..."
    }

}