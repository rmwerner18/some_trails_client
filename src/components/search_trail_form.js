import React from "react"

class SearchTrails extends React.Component {

    state = {
        search: ""
    }
    
    
    changeHandler = (e) => {
        e.persist();
        this.setState({search: e.target.value})
        this.props.searchHandler(e.target.value)
    }
    
    
    render() {
        return(
            <div className="ui search">
            <div className="ui icon input">
            <input className="prompt" onChange={this.changeHandler} value={this.state.search} placeholder="Search trails by name"/>
            <i className="search icon" />
            </div>
        </div>
        )
    }

}


export default SearchTrails;