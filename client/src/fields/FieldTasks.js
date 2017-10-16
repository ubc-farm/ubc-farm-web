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
import '../../../server/static/css/style.css'
import {Tabs, Tab} from 'material-ui/Tabs';
import TaskList from '../tasks/components/TaskList';
import TimeLine from '../tasks/components/TimeLine';
import FieldTimeLine from './FieldTimeLine';
import {fetchFields} from './actions/fetch-fields.js';
import {fetchTasks} from '../tasks/actions/fetch-tasks';

class FieldTasks extends Component{

    componentDidMount() {
        console.log("task page finished mounting");
        this.props.fetchFields();
        this.props.fetchTasks();
    }

    handleMenuClick(e, { name }){
        this.setState({ activeItem: name });
    }

    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            fields: [],
            tasks:[],
            fieldTasks:[],

            activeItem: 'list',
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }



    render(){
        if(this.props.field.length === 0){
            return( <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="List" value="list">
                        <div style={{ marginTop: "20px"}}>
                            <div>
                                <TaskList/>
                            </div>
                        </div>
                    </Tab>
                    <Tab label="Timeline" value="timeline">
                        <div style={{ marginTop: "20px"}}>
                            <div>
                                <TimeLine/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>

            </div>);
        }
        return(
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="List" value="list">
                        <div style={{ marginTop: "20px"}}>
                            <div>
                                <FieldTaskList />
                            </div>
                        </div>
                    </Tab>
                    <Tab label="Timeline" value="timeline">
                        <div style={{ marginTop: "20px"}}>
                            <div>
                                <FieldTimeLine/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}

FieldTasks.propTypes = {
    fieldTasks: PropTypes.array.isRequired,

    fields: PropTypes.array.isRequired,
    fetchFields: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return{
        field: state.selectedField,
        fieldTasks: state.fieldTasks,

        fields: state.fields,
        tasks: state.tasks
    };
}

export default connect(mapStateToProps,{fetchFields, fetchTasks})(FieldTasks);
