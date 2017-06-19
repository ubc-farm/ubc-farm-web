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
 *
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
        this.nodeToString = this.nodeToString.bind(this);
    }

    componentDidMount(){
        console.log('why is loadtime not called?');
        this.loadTimeline();
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.data !== this.props.data) {
            this.loadTimeline();
        }
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

    loadTimeline(data){
        console.log('loadTimeline');
        let container = this.getDOMNode();
        container.setAttribute("id", "timeline");
        container.setAttribute("height", "500px");


        console.log(data);

        let items = new vis.DataSet(data);


        let options = {stack: true};


        return vis.Timeline(container, items, options);
    }

    nodeToString ( node ) {
    let tmpNode = document.createElement( "div" );
    tmpNode.appendChild( node.cloneNode( true ) );
    let str = tmpNode.innerHTML;
    tmpNode = null;
    node = null; // prevent memory leaks in IE
    return str;
}

    render() {
        return (
            <div id="visualization" ref="timeline">
                {
                    this.loadTimeline(this.props.tasks.map( (task) => (
                        {
                            id: task._id,
                            group: task.field,
                            content: this.typeTransformer(task.type),
                            start: this.dateTransformer(task.startDate),
                            end: (task.startDate == task.endDate ? this.getTomorrow(task.startDate): this.dateTransformer(task.endDate))
                        })))
                }
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