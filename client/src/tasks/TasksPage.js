/**
 * Created by Xingyu on 6/1/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import TaskList from './components/TaskList';
import {fetchFields} from '../fields/actions/fetch-fields.js'
import {fetchTasks} from '../tasks/actions/fetch-tasks';
import NewTaskModal from './components/NewTaskModal';
import Divider from 'material-ui/Divider';
import TimeLine from './components/Timeline';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

class TasksPage extends React.Component {

    componentDidMount() {
        console.log("task page finished mounting");
        this.props.fetchFields();
        this.props.fetchTasks();
    }

    handleMenuClick(e, { name }){
        this.setState({ activeItem: name });
    }


    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            activeItem: 'list',
            fields: [],
            tasks:[]
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    render() {


        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="List" value="list">
                        <div style={{textAlign: 'center', padding: '10px'}}>
                            <NewTaskModal isFieldProvided={false}/>
                        </div>
                        <Divider/>
                        <div>
                            <TaskList/>
                            <TimeLine tasks={this.props.tasks} fiels={this.props.fields}/>
                        </div>
                    </Tab>
                    <Tab label="Calendar" value="calendar">
                        <div>
                            <h2 style={styles.headline}>Task Calendar</h2>
                            <TimeLine tasks={this.props.tasks} fiels={this.props.fields}/>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}

TasksPage.propTypes = {
    fields: PropTypes.array.isRequired,
    fetchFields: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        fields: state.fields,
        tasks: state.tasks
    }
};

export default connect(mapStateToProps, {fetchFields, fetchTasks})(TasksPage);