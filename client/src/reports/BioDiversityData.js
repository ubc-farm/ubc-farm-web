/**
 * Created by Tushar Chutani on 3/25/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SubsequenceSuburst from '../visuals/graphs/SequenceSunburst.js';
import CircularProgress from 'material-ui/CircularProgress';
import {setSpecies} from './actions';
import {bindActionCreators} from 'redux';

class BioDiversityData extends React.Component{

    
    componentDidMount(){
        var latitudeArray = [];
        var longitudeArray = [];
        this.props.selectedField.polygon.map((cords)=>{
            latitudeArray.push(cords.lat);
            longitudeArray.push(cords.lng);
        });
        var startLat = latitudeArray.reduce((a,b)=>Math.min(a,b))
        var endLat = latitudeArray.reduce((a,b)=>Math.max(a,b))
        var startLon = longitudeArray.reduce((a,b)=>Math.min(a,b))
        var endLon = latitudeArray.reduce((a,b)=>Math.max(a,b))
        this.props.setSpecies(startLat, endLat, startLon, endLon).then(()=>{
            this.setState({loading:false});
        });
    }

    constructor(props){
        super(props);
        this.state = {
            loading:true
        }
    };

    render(){
        if(this.props.selectedField.name === undefined){
            return(<div className="field_info"><h4>Please go back to fields page to select the field to generate report from</h4></div>);
        }

         if(this.state.loading){
            return (
                <div style={styles.loadingContainer}>
                    <div style={{padding:'10px',display:'flex'}}>
                        <CircularProgress style={{paddingTop:'10px'}}/>
                        <div className="title is-4">&#32;&#32;Generating biodiversity chart please wait </div>
                    </div>
                </div>
                );
        }else{
            //is not loading
            return (
                <div className="pageDiv" style={{margin: '10px'}}>
                    <div className="title is-3"> Biodiversity breakdown </div>
                    <SubsequenceSuburst data={this.props.species}/>
                </div>
            );
        }
    }
}

BioDiversityData.propTypes = {

};

const styles = {
    loadingContainer: {
        width: '50%',
        height: '50%',
        float: 'right'
    },

}

function mapDispathToProps(dispatch){
    return bindActionCreators({
        setSpecies
    }, dispatch)
} 

const mapStateToProps = (state) => {
    return {
        species: state.species,
        selectedField: state.selectedField,
    }
};

export default connect(mapStateToProps, mapDispathToProps) (BioDiversityData);