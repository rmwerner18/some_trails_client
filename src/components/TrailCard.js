import React from "react"
class TrailCard extends React.Component {
    state = {
        bookmarked: false,
        faveArray: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/favorites", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then(resp => resp.json())
        .then(
            faves => {
                this.setState(previousState => ({
                faveArray: previousState.faveArray.concat(faves)
                }))

        let favorite = this.state.faveArray.find(fave => fave.user_id === localStorage.getItem('user_id') && fave.trail_id === this.props.trail.id)
        // console.log("trailCard favorite:", favorite)
        if (favorite) {
            this.setState({bookmarked: true})
        }
    })
    }
    
    // clickHandler = () => {
    //     document.getElementById('myModal').style.display = "block"
    // }
    // closeHandler = () => {
    //     document.getElementById('myModal').style.display = "none"
    // }
    bookmarking = () => {
        if (this.state.bookmarked === false){
            return <img alt="BookMark" onClick={this.faveHandler} width="20px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fweb-31%2F24%2Fsave-512.png&f=1&nofb=1"/>
        } else if (this.state.bookmarked === true){
            return <img alt="BookMark" onClick={this.faveHandler} width="20px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fsearch-optimization%2F512%2Fbookmark_favorite_web_badge_flat_icon-512.png&f=1&nofb=1"/>
        }
    }
    faveHandler = (e) => {
        e.persist();
        // this.state.bookmarked = !this.state.bookmarked
        this.setState({bookmarked: !this.state.bookmarked})
        this.props.faveHandler(this.props.trail)
    }

    difficultyRender = () => {
        if (this.props.trail.difficulty === "blue") {
            return <img className="diff-img" src="https://i.imgur.com/mLgjNSV.png" alt={this.props.trail.difficulty}/>
        } else if (this.props.trail.difficulty === "blueBlack"){
            return <img className="diff-img" src="https://i.imgur.com/6XJd33b.png" alt={this.props.trail.difficulty}/>
        } else if (this.props.trail.difficulty === "black"){
            return <img className="diff-img" src="https://i.imgur.com/dt0g4fb.png?1" alt={this.props.trail.difficulty}/>
        } else if (this.props.trail.difficulty === "green"){
            return <img className="diff-img" src="https://i.imgur.com/0V3ED1p.png?1" alt={this.props.trail.difficulty}/>
        } else if (this.props.trail.difficulty === "greenBlue"){
            return <img className="diff-img" src="https://i.imgur.com/IBiL4ow.png?1" alt={this.props.trail.difficulty}/>
        }
    }
    render() {
        // console.log("state in trailCard", this.state.faveArray)
        return(
            <div className="trail-card">
                {/* <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.closeHandler}>&times;</span>
                        <p id="modal-text">{this.props.trail.name}</p>
                    </div>
                </div> */}
                <div className="trail-card-front">
                    <div id="trail-img-div">
                <img id="trail-image" src={this.props.trail.image}  onClick={this.clickHandler} alt="Photo of Trail" />
                    </div>
                    {this.difficultyRender()}
                    <h4 id="trail-name">
                        {this.props.trail.name}        
                    </h4>
                    <p>{this.props.trail.location} • {this.props.trail.length} mi • {this.props.trail.stars} stars</p>
                    <p>{this.props.trail.summary}</p>
                    {this.bookmarking()}
                </div>
            </div>
        )
    }
}



export default TrailCard;