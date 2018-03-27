/**
 * Created by Xingyu on 10/6/2017.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import timeline from '../tasks/components/TimeLineJS';
import {fetchFields} from './actions/fetch-fields.js'
import {fetchTasks} from '../tasks/actions/fetch-tasks';

class FieldTimeLine extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            tasks:[],
            fields:[],
            fieldTasks:[],
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
                margin: {
                    item: 10
                }};
        timeline.create(dom_node,items,groups,options);
    }
    componentWillUpdate(){
    }

    componentDidUpdate(){
        let updatedData = {items: this.loadItems(), groups: this.loadGroups()};
        timeline.setData(updatedData);
        timeline.setGroups(this.loadGroups());
        timeline.setItems(this.loadItems());
    }

    componentWillUnmount() {
        timeline.destroy();
    }


    loadItems(){
        return this.props.fieldTasks.map( (task) => (
            {
                id: task._id,
                group: task.type,
                content: this.typeTransformer(task.type),
                start: this.dateTransformer(task.startDate),
                end: (task.startDate == task.endDate ? this.getTomorrow(task.startDate): this.dateTransformer(task.endDate))
            }));
    }

    loadGroups(){
        let task_type = this.props.fieldTasks.map( (task) => (
            {
                id: task.type,
                content: task.type
            }));
        let unique_type = [];
        let unique_task_type = [];
        task_type.forEach(function(task){
            if (unique_type.indexOf(task.id) < 0){
                unique_type.push(task.id);
                unique_task_type.push(task);
            }
        });
        return unique_task_type;

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
            <div className="FieldTimeLine"></div>
        )

    }


}

FieldTimeLine.propTypes = {
    fields: PropTypes.array.isRequired,
    fetchFields: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired,

    fieldTasks: PropTypes.array.isRequired,
    maxHeight: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => {
    return {
        fields: state.fields,
        tasks: state.tasks,
        fieldTasks: state.fieldTasks
    }
};

export default connect(mapStateToProps, {fetchTasks, fetchFields})(FieldTimeLine);