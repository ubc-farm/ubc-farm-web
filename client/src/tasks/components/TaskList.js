/**
 * Created by Xingyu on 6/2/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeleteTaskModal from '../components/DeleteTaskModal';
import Table,{
    TableBody, TableCell, TableHead, TableRow

} from 'material-ui/Table';
import PropTypes from 'prop-types';
import TaskLogModal from './TaskLogModal';
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
            height: '300px',
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fieldNameFromId = this.fieldNameFromId.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);
        this.typeTransftormer = this.typeTransformer.bind(this);
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

    render() {
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell tooltip="Sort by Type" style={{verticalAlign: 'middle'}}>Type</TableCell>
                            <TableCell tooltip="Sort by Field" style={{verticalAlign: 'middle'}}>Field</TableCell>
                            <TableCell tooltip="Sort by Start Date" style={{verticalAlign: 'middle'}}>Start Date</TableCell>
                            <TableCell tooltip="Sort by End Date" style={{verticalAlign: 'middle'}}>End Date</TableCell>
                            <TableCell/>

                        </TableRow>
                    </TableHead>
                    <TableBody

                    >
                        {this.props.tasks.map( (task, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    style={{verticalAlign: 'middle'}}>{this.typeTransftormer(task.type)}</TableCell>
                                <TableCell
                                    style={{verticalAlign: 'middle'}}>{this.fieldNameFromId(task.field)}</TableCell>
                                <TableCell
                                    style={{verticalAlign: 'middle'}}>{this.dateTransformer(task.startDate)}</TableCell>
                                <TableCell
                                    style={{verticalAlign: 'middle'}}>{this.dateTransformer(task.endDate)}</TableCell>
                                <TableCell style={{verticalAlign: 'middle'}}>
                                    <div className="columns">
                                        <div className="column">
                                            <DeleteTaskModal task={task}/>
                                        </div>
                                        <div className="column">
                                            <TaskLogModal task={task} fieldName={this.fieldNameFromId(task.field)}
                                                          typeTransformer={this.typeTransformer}
                                                          dateTransformer={this.dateTransformer}/>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
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