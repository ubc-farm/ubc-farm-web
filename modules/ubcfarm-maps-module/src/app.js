import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import Places from './components/Places'

class App extends Component{
    render(){
        const location = {
            lat: 49.249683,
            lng: -123.237421
        }
        const markers = [
            {
                location:{
                    lat: 49.249683,
                    lng: -123.237421
                }
            }
        ]
        return(
            <div>
                This is the map!
                <div style={{width:300,height:600}}>
                    <Map center={location} markers={markers}/>
                </div>
                <div>
                    <Places />
                </div>


            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('app'))



