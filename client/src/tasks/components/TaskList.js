/**
 * Created by Xingyu on 6/2/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TaskLogModal from './TaskLogModal';
import LogListModal from './LogListModal';
import DeleteTaskModal from '../components/DeleteTaskModal';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,

} from 'material-ui/Table';
/*styles*/
const localStyle = {
  pointerContainer: {
      cursor: 'pointer',
  },
    shortH: {
      width: 200, verticalAlign: 'middle', cursor: 'pointer'
    },
    mediumH: {
      width: 300, verticalAlign: 'middle', cursor: 'pointer'
    },
    longH: {
      width: 500, verticalAlign: 'middle', cursor: 'pointer'
    },
    short: {
        width: 200, verticalAlign: 'middle',
    },
    medium: {
        width: 300, verticalAlign: 'middle',
    },
    long: {
        width: 500, verticalAlign: 'middle',
    }

};
/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class TaskList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '500px',
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fieldNameFromId = this.fieldNameFromId.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);
        this.typeTransformer = this.typeTransformer.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    fieldNameFromId(fieldId){
        let field = this.props.fields.find((field) => {
            return field._id === fieldId;
        });
        if(field == null){
            return 'undefined';
        }
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

    handleSort(tasks){
        console.log("sorting tasks");
    }

    render() {
        return (
            <div>
                <Table
                    fixedHeader={true}
                    fixedFooter={false}
                    selectable={false}
                    multiSelectable={false}
                    height={this.state.height}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        style={{verticalAlign: 'middle'}}
                    >

                        <TableRow>
                            <TableHeaderColumn tooltip="Sort by Type" onClick={() => this.handleSort(this.props.tasks)} style={localStyle.shortH}><div  style={{cursor: 'pointer'}}>Type</div></TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Field" onClick={() => this.handleSort(this.props.tasks)} style={localStyle.shortH}><div  style={{cursor: 'pointer'}}>Field</div></TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Start Date" onClick={() => this.handleSort(this.props.tasks)} style={localStyle.mediumH}><div  style={{cursor: 'pointer'}}>Start Date</div></TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by End Date" onClick={() => this.handleSort(this.props.tasks)} style={localStyle.mediumH}><div style={{cursor: 'pointer'}}>End Date</div></TableHeaderColumn>
                            <TableHeaderColumn/>

                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}

                    >
                        {this.props.tasks.map( (task, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={localStyle.short}>{this.typeTransformer(task.type)}</TableRowColumn>
                                <TableRowColumn style={localStyle.short}>{this.fieldNameFromId(task.field)}</TableRowColumn>
                                <TableRowColumn style={localStyle.mediumH}>{this.dateTransformer(task.startDate)}</TableRowColumn>
                                <TableRowColumn style={localStyle.mediumH}>{this.dateTransformer(task.endDate)}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>
                                    <div className="columns">
                                        <div className="column">
                                            <DeleteTaskModal task = {task}/>
                                        </div>
                                        <div className="column">
                                            <TaskLogModal task={task} fieldName={this.fieldNameFromId(task.field)}/>
                                        </div>
                                        <div className="column">
                                            <LogListModal task={task} typeTransformer={this.typeTransformer} dateTransformer={this.dateTransformer}/>
                                        </div>
                                    </div>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableRowColumn tooltip="Sort by Type" onClick={() => this.handleSort(this.props.tasks)} style={localStyle.shortH}>Type</TableRowColumn>
                            <TableRowColumn tooltip="Sort by Field" onClick={() => this.handleSort(this.props.tasks)} style={localStyle.shortH}>Field</TableRowColumn>
                            <TableRowColumn tooltip="Sort by Start Date" onClick={() => this.handleSort(this.props.tasks)} style={localStyle.mediumH}>Start Date</TableRowColumn>
                            <TableRowColumn tooltip="Sort by End Date" onClick={() => this.handleSort(this.props.tasks)} style={localStyle.mediumH}>End Date</TableRowColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                    </TableFooter>
                </Table>
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