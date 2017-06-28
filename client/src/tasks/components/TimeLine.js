/**
 * Created by Xingyu on 6/28/2017.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import timeline from './TimeLineJS';
import {fetchFields} from '../../fields/actions/fetch-fields.js'
import {fetchTasks} from '../actions/fetch-tasks';

class TimeLine extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            tasks:[],
            fields:[]
        };

        this.loadItems = this.loadItems.bind(this);
        this.loadGroups = this.loadGroups.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);
        this.typeTransformer = this.typeTransformer.bind(this);
    }

    componentDidMount(){
        console.log("[from timeline'" + this.props.fields);
        let dom_node = ReactDOM.findDOMNode(this);
        let items = this.loadItems();
        let groups = this.loadGroups();
        let options =
            {
                width: '100%',
                height: '300px',
                margin: {
                    item: 20
                }};
        timeline.create(dom_node,items,groups,options);
    }
    componentWillUpdate(){
        console.log("timeline responded to data change!");
        let updatedData = {items: this.loadItems(), groups: this.loadGroups()};
        console.log("updated: " + updatedData);
        timeline.setData(updatedData);
        timeline.setGroups(this.loadGroups());
        timeline.setItems(this.loadItems());
    }

    componentWillUnmount() {
        timeline.destroy();
    }


    loadItems(){
        return this.props.tasks.map( (task) => (
            {
                id: task._id,
                group: task.field,
                content: this.typeTransformer(task.type),
                start: this.dateTransformer(task.startDate),
                end: (task.startDate == task.endDate ? this.getTomorrow(task.startDate): this.dateTransformer(task.endDate))
            }));
    }

    loadGroups(){
        return this.props.fields.map( (field) => (
            {
                id: field._id,
                content: field.name
            }));

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

    render(){
        return(
            <div className="Timeline"></div>
        )

    }


}

TimeLine.propTypes = {
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

export default connect(mapStateToProps, {fetchFields, fetchTasks})(TimeLine);


