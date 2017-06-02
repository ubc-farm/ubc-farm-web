/**
 * Created by Xingyu on 6/1/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import TaskList from './components/TaskList';


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
            activeItem: 'list'
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    render() {

        const { activeItem } = this.state;

        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="List" value="list">
                        <div>
                            <h2 style={styles.headline}>Task List</h2>
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

};

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps)(TasksPage);