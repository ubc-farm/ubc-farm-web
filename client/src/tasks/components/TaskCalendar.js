/**
 * Created by Xingyu on 6/2/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import DeleteTaskModal from '../components/DeleteTaskModal';

import PropTypes from 'prop-types';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};


/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class TaskList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {

        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fieldNameFromId = this.fieldNameFromId.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);
        this.typeTransformer = this.typeTransformer.bind(this);
        this.loadTimeline = this.loadTimeline.bind(this);
    }

    componentDidMount(){
        this.loadTimeline();
    }


    fieldNameFromId(fieldId){
        let field = this.props.fields.find((field) => {
            return field._id === fieldId;
        });
        return field.name;
    }

    dateTransformer(dateString){
        let d = new Date(dateString);
        let options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric"
        };
        let fullDate = d.toLocaleTimeString("en-us", options);
        let components = fullDate.split(",");
        return components[0] + "," + components[1] +  "," + components[2];

    }

    typeTransformer(typeString){
        switch(typeString){
            case "seeding":
                return "\u{1F331}" + " " + typeString;
                break;
            case "irrigation":
                return "\u{1F4A7}" + " " + typeString;
                break;
            case "pest-control":
                return "\u{1F41C}" + " " + typeString;
                break;
            case "transplanting":
                return "\u{1F33F}" + " " + typeString;
                break;
            case "soil-sampling":
                return "\u{1F52C}" + " " + typeString;
                break;
            case "scouting-harvest":
                return "\u{1F4CB}" + " " + typeString;
                break;
            case "scouting-pests":
                return "\u{1F4CC}" + " " + typeString;
                break;
            case "fertilizing":
                return "\u{1F4A9}" + " " + typeString;
                break;
            default:
                return typeString;
                break;
        }
    }


    handleToggle(event, toggled){
        this.setState({
            [event.target.name]: toggled,
        });
    }

    handleChange(event){
        this.setState({height: event.target.value});
    }

    loadTimeline(){
        let container = document.getElementById('visualization');

        let items = new vis.DataSet([
            {id: 1, content: 'item 1', start: '2013-04-20'},
            {id: 2, content: 'item 2', start: '2013-04-14'},
            {id: 3, content: 'item 3', start: '2013-04-18'},
            {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
            {id: 5, content: 'item 5', start: '2013-04-25'},
            {id: 6, content: 'item 6', start: '2013-04-27'}
        ]);


        let options = {};


        let timeline = new vis.Timeline(container, items, options);
    }

    render() {
        return (
            <div>
                <div id="visualization" style={{height: '500px'}}></div>
            </div>
        );
    }
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        fields: state.fields
    }
};

export default connect(mapStateToProps)(TaskList);