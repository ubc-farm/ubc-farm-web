/**
 * Created by Xingyu on 10/6/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeleteFieldModal from './delete-field-modal';
import NewTaskModal from '../tasks/components/NewTaskModal';
import PropTypes from 'prop-types';
import '../../../server/static/css/style.css';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider'
import { Link } from 'react-router';

class FieldDetail extends Component{

    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            fields: [],
            tasks:[],
            fieldTasks:[]
        };
    }


    render(){

        const newTaskButtonStyle = {minWidth: '100%', height: '33%', color:"#8AA62F"};

        if(this.props.field.length === 0){
            return(<div className="field_info"><h4>Select Field or Building...</h4></div>);
        }
        return(
                <div style={{height: "100%"}}>
                    <div className="field_info">
                        <div className="field_name">{this.props.field.name}</div>
                        <Divider/>
                        <div className="field_detail">Active Tasks: {this.props.fieldTasks.length}</div>
                        <Divider/>
                        <div className="field_species">Field species: {this.props.fieldTasks.length}</div>
                    </div>
                    <div style={{minWidth: '100%'}} >
                    <Link to="/reports">
                        <FlatButton label="New report" style={newTaskButtonStyle}/>
                    </Link>

                        <Divider/>
                        <div style={{position: 'bottom', bottom: '0px', height: '50%'}} >
                            <NewTaskModal isFieldProvided = {true} field = {this.props.field} buttonStyle={newTaskButtonStyle}/>
                        </div>

                        <Divider/>

                        <div style={{height: '50%'}}>
                            <DeleteFieldModal field = {this.props.field} style={{minWidth: '100%', height: '100%'}}/>
                        </div>

                    </div>
                </div>
        );
    }




    componentWillUpdate(nextProps, nextState){
        console.log(nextProps.field.polygon);
        if(nextProps.field.polygon) {
            let avgLat = 0; 
            let avgLon = 0;
            nextProps.field.polygon.forEach(function(e){
                
                console.log("longitude: "+e.lng + "Latitude" + e.lat);
            });
            
        }
    }
}

FieldDetail.propTypes = {
};

function mapStateToProps(state){
    return{
        field: state.selectedField,
        fieldTasks: state.fieldTasks
    };
}

export default connect(mapStateToProps, {})(FieldDetail);
