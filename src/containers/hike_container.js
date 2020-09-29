import React from 'react'
import HikeCard from '../components/hike_card'

class HikeContainer extends React.Component {
    state = {
        hikes: this.props.hikes
    }

    deleteHandler = (id) => { 
        if (id) {
            let hikes = this.state.hikes
            let deletedHike = hikes.find(hike => hike.id === id)
            let index = hikes.findIndex(hike => hike === deletedHike)
            hikes.splice(index, 1)
            this.setState({hikes: hikes})
            fetch(`http://localhost:3000/hikes/${id}`, {
                method: "DELETE"
            })
        }
    }

    closeHandler = () => {
        document.getElementById('myModal').style.display = "none"
    }

    hikes = () => {
        return this.state.hikes.map(hike => <HikeCard key={hike.id} hike={hike} trails={this.props.trails} deleteHandler={this.deleteHandler} editHandler={this.props.editHandler}/>)
    }

    render() {
        return <>
        {this.state.edit 
        ?
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={this.closeHandler}>&times;</span>
                
            </div>
        </div>
        :
        null
        }
        {this.hikes()}
        </>
    }
}

export default HikeContainer