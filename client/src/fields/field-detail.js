/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeleteFieldModal from './delete-field-modal'
import {bindActionCreators} from 'redux';
import {selectField} from './actions/select-field.js';
import NewTaskModal from '../tasks/components/NewTaskModal'
import {fetchTaskByField} from './actions/fetchTaskByField'
import TaskList from '../tasks/components/TaskList';
import PropTypes from 'prop-types';

const raisedbutton = {
    margin: 12,
};

class FieldDetail extends Component{
    render(){
        if(this.props.field.length === 0){
            return(<h4>Select Field or Building...</h4>);
        }
        return(
            <div>
                <h2>{this.props.field.name}</h2>
                <DeleteFieldModal field = {this.props.field}/>
                <NewTaskModal isFieldProvided = {true} field = {this.props.field}/>
                <TaskList/>

            </div>
        );
    }
}

FieldDetail.propTypes = {
    fetchTaskByField: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return{
        field: state.selectedField
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectField: selectField
    }, dispatch)
}

export default connect(mapStateToProps, {matchDispatchToProps, fetchTaskByField})(FieldDetail);
