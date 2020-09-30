import React from "react"

class SearchTrailLocations extends React.Component {

    state ={
        search: ""
    }

    changeHandler = (e) => {
        console.log("lookin for trails")
        this.setState({search: e.target.value})
        this.props.locationSearchHandler(e.target.value)
    }

    render() {
        console.log("state in SearchTrailLocations:", this.state.search)
        return(
            <div className="ui search">
            <div className="ui icon input">
                <input className="prompt" onChange={this.changeHandler} value={this.state.search} placeholder="Search trails by location"/>
                <i className="search icon" />
            </div>
        </div>
        )
    }
}

export default SearchTrailLocations