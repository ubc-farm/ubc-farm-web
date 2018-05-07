/**
 * Created by Xingyu on 8/30/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SubsequenceSuburst from '../visuals/graphs/SequenceSunburst.js';
import BioDiversityData from './BioDiversityData.js';
import CostOfProduction from './CostOfProduction.js';
import CircularProgress from 'material-ui/CircularProgress';

class ReportPage extends React.Component{

    componentDidMount() {
        console.log("reports page finished mounting");
    }

    constructor(props){
        super(props);
        this.state = {
            loading:false
        }
    };

    render(){
        if(this.props.selectedField.name === undefined){
            return(<div className="field_info"><h4>Please go back to fields page to select the field to generate report from</h4></div>);
        }

        if(this.state.loading){
            return (
                <div style={styles.loadingContainer}>
                    <div style={{padding:'10px'}}>
                        <CircularProgress />
                    </div>
                    <h3>Creating report please wait</h3>
                </div>
                );
        }else{
            //is not loading
            return (
                <div className="columns" style={{margin: '10px'}}>
                    <div className="column" style={{border:'2px solid'}}>
                        <BioDiversityData id="bioDiversity"/>
                    </div>
                    <div className="column" style={{border:'2px solid'}}>
                        <CostOfProduction/>
                    </div>

                </div>
            );
        }
    }
}

ReportPage.propTypes = {

};

const styles = {
    loadingContainer: {
        width: '50%',
        height: '50%',
        float: 'right'
    },

}

const mapStateToProps = (state) => {
    return {
        selectedField: state.selectedField
    }
};

export default connect(mapStateToProps, {}) (ReportPage);
