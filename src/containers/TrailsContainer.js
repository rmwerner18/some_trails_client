import React from "react"
import TrailCard from '../components/TrailCard'

export default class TrailsContainer extends React.Component {


    trailGenerator = () => {
        return this.props.trails.map(trail => <TrailCard key={trail.id} trail={trail}/>)
    }

    render() {
        return (
            <div>
                <p>Hello</p>
                {this.trailGenerator()}
            </div>
        )
    }

}