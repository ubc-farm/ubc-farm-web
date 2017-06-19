/**
 * Created by Xingyu on 6/19/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import DeleteTaskModal from '../components/DeleteTaskModal';

import PropTypes from 'prop-types';

class TaskCalendar2 extends Component{
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {

        };

        this.loadTimeline = this.loadTimeline.bind(this);

    }

    componentDidMount(){
        return this.loadTimeline();
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.data !== this.props.data) {
            this.loadTimeline();
        }
    }

    loadTimeline(){
        let container = document.getElementById('timeline');
        timeline = new vis.Timeline(container, items, groups, options);
    }

    render(){

        return (
            <div id="timeline"></div>
        )
    }

}

TaskCalendar2.propTypes = {
    tasks: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        fields: state.fields
    }
};

export default connect(mapStateToProps)(TaskCalendar2);

