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
class TaskCalendar extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            tasks:[]

        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fieldNameFromId = this.fieldNameFromId.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);
        this.typeTransformer = this.typeTransformer.bind(this);
        this.loadTimeline = this.loadTimeline.bind(this);
    }

    componentDidMount(){
        console.log('why is loadtime not called?');
        this.loadTimeline();
    }


    fieldNameFromId(fieldId){
        let field = this.props.fields.find((field) => {
            return field._id === fieldId;
        });
        return field.name;
    }

    dateTransformer(dateString){
        let d = new Date(dateString).toISOString();
        return d.slice(0,10);

    }

    getTomorrow(dateString){
        let d = new Date(dateString);
        d.setDate(d.getDate() + 1);
        return d.toISOString().slice(0,10);
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
        console.log('loadTimeline');
        let container = document.getElementById('visualization');

        let data = this.props.tasks.map( (task) => (
            {
                id: task._id,
                content: task.type,
                start: this.dateTransformer(task.startDate),
                end: (task.startDate == task.endDate ? this.getTomorrow(task.startDate): this.dateTransformer(task.endDate))
            }));

        console.log(data);

        let items = new vis.DataSet(data);


        let options = {stack: true};


        let timeline = new vis.Timeline(container, items, options);
    }

    render() {
        return (
            <div>
                <div id="visualization" style={{height: '500px'}}></div>
                {this.props.tasks.map( (task, index) => (
                    <p>{this.fieldNameFromId(task.field)}</p>
                ))}
            </div>
        );
    }
}

TaskCalendar.propTypes = {
    tasks: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        fields: state.fields
    }
};

export default connect(mapStateToProps)(TaskCalendar);