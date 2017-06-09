/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeleteFieldModal from './delete-field-modal';
import NewTaskModal from '../tasks/components/NewTaskModal';
import FieldTaskList from './FieldTaskList';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

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
        if(this.props.field.length === 0){
            return(<h4>Select Field or Building...</h4>);
        }
        return(
            <div className="columns">
                <div className="column is-2-desktop" style={{height: '300px'}}>
                <h2>{this.props.field.name}</h2>
                <DeleteFieldModal field = {this.props.field}/>
                <NewTaskModal isFieldProvided = {true} field = {this.props.field}/>
                </div>
                <div className="column is-10-desktop">
                <FieldTaskList />
                </div>

            </div>
        );
    }
}

FieldDetail.propTypes = {
    fields: PropTypes.array.isRequired,
    fieldTasks: PropTypes.array.isRequired,
};

function mapStateToProps(state){
    return{
        field: state.selectedField,
        fieldTasks: state.fieldTasks,
    };
}

export default connect(mapStateToProps)(FieldDetail);
