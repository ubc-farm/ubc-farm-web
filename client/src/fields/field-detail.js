/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeleteFieldModal from './delete-field-modal';
import {bindActionCreators} from 'redux';
import {selectField} from './actions/select-field.js';
import NewTaskModal from '../tasks/components/NewTaskModal';
import {fetchFields} from './actions/fetch-fields';
import {fetchTaskByField} from './actions/fetchTaskByField';
import FieldTaskList from './FieldTaskList';
import PropTypes from 'prop-types';
import {fetchTasks} from '../tasks/actions/fetch-tasks';

const raisedbutton = {
    margin: 12,
};

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

    componentDidMount() {
        this.props.fetchFields();
        this.props.fetchTaskByField();
    }

    render(){
        if(this.props.field.length === 0){
            return(<h4>Select Field or Building...</h4>);
        }
        return(
            <div>
                <h2>{this.props.field.name}</h2>
                <DeleteFieldModal field = {this.props.field}/>
                <NewTaskModal isFieldProvided = {true} field = {this.props.field}/>
                <FieldTaskList/>

            </div>
        );
    }
}

FieldDetail.propTypes = {
    fields: PropTypes.array.isRequired,
    fetchFields: PropTypes.func.isRequired,
    fetchTaskByField: PropTypes.func.isRequired,
    fieldTasks: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired
};

function mapStateToProps(state){
    return{
        field: state.selectedField,
        fields: state.fields,
        fieldTasks: state.fieldTasks,
        tasks: state.tasks
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectField: selectField,
        fetchTaskByField: fetchTaskByField()
    }, dispatch)
}

export default connect(mapStateToProps, {fetchTasks, matchDispatchToProps, fetchFields, fetchTaskByField})(FieldDetail);
