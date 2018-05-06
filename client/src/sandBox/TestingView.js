/**
 * Created by Xingyu on 6/1/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import {fetchFields} from '../fields/actions/fetch-fields.js'
import {fetchTasks} from '../tasks/actions/fetch-tasks';
import Divider from 'material-ui/Divider';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        fontWeight: 400,
    },
};

class TestView extends React.Component {

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
            fields: [],
            tasks:[]
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    render() {


        return (
            <div>
                    <Tab label="Test" value="list">
                        <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "20px"}}>
                        <div className="columns">
                            <div className = "column is-2-desktop">
                                <h2 style={styles.headline}>Sand box view</h2>
                            </div>
                            <div className="column is-10-desktop" style={{textAlign: 'center',padding:'10px'}}>
                                <h1>testing for sand box</h1>
                            </div>
                        </div>

                        <Divider/>
                        </div>
                    </Tab>
                

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        fields: state.fields,
        tasks: state.tasks
    }
};

export default connect(mapStateToProps, {fetchFields, fetchTasks})(TestView);