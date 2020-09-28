import React from "react"
import TrailCard from '../components/TrailCard'
import SearchTrails from '../components/search_trail_form'

export default class TrailsContainer extends React.Component {

    searchHandler = (searchValue) => {
        // console.log("searchValue", searchValue)
        this.props.searchHandler(searchValue)
    }
    
    trailGenerator = () => {
        return this.props.trails.map(trail => <TrailCard key={trail.id} trail={trail}/>)
    }

    render() {
        return (
            <div className="trails-container">
                <SearchTrails searchHandler={this.searchHandler}/>
                {this.trailGenerator()}
            </div>
        )
    }

}