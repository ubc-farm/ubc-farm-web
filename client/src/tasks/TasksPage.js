/**
 * Created by Xingyu on 6/1/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Tabs, {Tab} from 'material-ui/Tabs';
import TaskList from './components/TaskList';
import {fetchFields} from '../fields/actions/fetch-fields.js'
import {fetchTasks} from '../tasks/actions/fetch-tasks';
import NewTaskModal from './components/NewTaskModal';
import Divider from 'material-ui/Divider';
import TimeLine from './components/TimeLine';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        fontWeight: 400,
    },
};
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class TasksPage extends React.Component {


    componentDidMount() {
        console.log("task page finished mounting");
        this.props.fetchFields();
        this.props.fetchTasks();
    }

    handleMenuClick(e, tab){
        //this.setState({ tab });
    };


    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            tab: 'list',
            fields: [],
            tasks:[]
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    render() {
        const newTaskButtonStyle = {minWidth: '100%', height: '100%', color:"#8AA62F"};

        const tab = this.state.tab;
        return (
            <div>
                <AppBar position="static">
                    <Tabs
                        value={tab}
                        onChange={this.handleMenuClick}
                        fullWidth
                    >
                        <Tab label="List" value="list" />
                        <Tab label="Timeline" value="timeline" />
                    </Tabs>
                </AppBar>
                {tab === 'list' && <TabContainer style={{marginLeft: "10%", marginRight: "10%", marginTop: "20px"}}>
                    <div className="columns">
                        <div className = "column is-2-desktop">
                            <h2 style={styles.headline}>Task List</h2>
                        </div>
                        <div className="column is-10-desktop" style={{textAlign: 'center',padding:'10px'}}>
                            <NewTaskModal isFieldProvided={false} buttonStyle={newTaskButtonStyle}/>
                        </div>
                    </div>

                    <Divider/>

                    <div>
                        <TaskList/>
                    </div>
                </TabContainer>}
                {tab === 'timeline' && <TabContainer style={{marginLeft: "10%", marginRight: "10%", marginTop: "20px"}}>
                    <div className="columns">
                        <div className = "column is-2-desktop">
                            <h2 style={styles.headline}>Task Timeline</h2>
                        </div>
                        <div className="column is-10-desktop" style={{textAlign: 'center',padding:'10px'}}>
                            <NewTaskModal isFieldProvided={false} buttonStyle={newTaskButtonStyle}/>
                        </div>
                    </div>

                    <Divider/>
                    <div>
                        <TimeLine/>
                    </div>
                </TabContainer>}


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