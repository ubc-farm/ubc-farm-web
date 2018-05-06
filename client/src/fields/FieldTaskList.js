/**
 * Created by Xingyu on 6/5/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import DeleteTaskModal from '../tasks/components/DeleteTaskModal';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
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

let tableData = [];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class FieldTaskList extends Component {
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
            // height: '300px',
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
                <Table
                    fixedHeader={true}
                    fixedFooter={false}
                    selectable={false}
                    multiSelectable={false}
                    style={{borderLeft: 'solid 2px #f5f5f5',borderBottom: 'solid 2px #f5f5f5'}}
                    height="220px"

                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        style={{verticalAlign: 'middle'}}
                    >

                        <TableRow>
                            <TableHeaderColumn tooltip="Sort by Type" style={{verticalAlign: 'middle'}}>Type</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Field" style={{verticalAlign: 'middle'}}>Field</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Start Date" style={{verticalAlign: 'middle'}}>Start Date</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by End Date" style={{verticalAlign: 'middle'}}>End Date</TableHeaderColumn>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Actions</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.fieldTasks.map( (task, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{this.typeTransftormer(task.type)}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{this.fieldNameFromId(task.field)}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{this.dateTransformer(task.startDate)}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{this.dateTransformer(task.endDate)}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>
                                    <div className="columns">
                                        <div className="column" style={{padding: 0}}>
                                            <DeleteTaskModal task = {task}/>
                                        </div>
                                        <div className="column" style={{padding: 0}}>
                                            <FlatButton
                                                label="Log"
                                                primary={true}
                                                onTouchTap={this.props.deleteTask}

                                            />
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
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Type</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Field</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Start Date</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>End Date</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Actions</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="5" style={{textAlign: 'center'}}>
                                Super Footer
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

FieldTaskList.propTypes = {
    fieldTasks: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
    maxHeight: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        fieldTasks: state.fieldTasks,
        fields: state.fields,
        tasks: state.tasks
    }
};

export default connect(mapStateToProps)(FieldTaskList);
