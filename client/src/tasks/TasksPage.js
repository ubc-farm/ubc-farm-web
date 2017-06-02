/**
 * Created by Xingyu on 6/1/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import TaskList from './components/TaskList';
import {fetchFields} from '../fields/actions/fetch-fields.js'
import NewTaskModal from './components/NewTaskModal';
import Divider from 'material-ui/Divider';


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
        this.props.fetchFields();
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
            fields: []
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
                            <NewTaskModal/>
                        </div>
                        <Divider/>
                        <div>
                            <TaskList/>
                        </div>
                    </Tab>
                    <Tab label="Calendar" value="calendar">
                        <div>
                            <h2 style={styles.headline}>Task Calendar</h2>
                            <p>
                                This is another example of a controllable tab. Remember, if you
                                use controllable Tabs, you need to give all of your tabs values or else
                                you wont be able to select them.
                            </p>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}

TasksPage.propTypes = {
    fields: PropTypes.array.isRequired,
    fetchFields: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        fields: state.fields
    }
};

export default connect(mapStateToProps, {fetchFields})(TasksPage);