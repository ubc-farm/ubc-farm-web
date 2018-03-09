/**
 * Created by Xingyu on 1/08/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {fetchTaskLogs} from '../actions/tasklog-actions';
import LogDescriptionModal from './LogDescriptionModal';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//List of Logs
class LogList extends React.Component {
    componentDidMount(){
        this.props.fetchTaskLogs();
    }

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
        const filteredLogs = [];
        const taskIdString = this.props.taskId;
        this.props.tasklogs.forEach(function(item, index){
            if(item.taskId == taskIdString){
                filteredLogs.push(item);
            }
        });
        return (
            <div>
                <Table
                    height={'300px'}
                    fixedHeader={true}
                    fixedFooter={false}
                    selectable={false}
                    multiSelectable={false}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        style={{verticalAlign: 'middle'}}
                    >

                        <TableRow>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Date</TableHeaderColumn>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Logged By</TableHeaderColumn>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Hours</TableHeaderColumn>
                            <TableHeaderColumn />
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {
                            filteredLogs.map( (item, index) => (
                            <TableRow key={index}>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>{item.date}</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>{item.userName}</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: "middle"}}>{item.hours}</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>

                            <LogDescriptionModal description={item.description}/>
                            </TableRowColumn>

                            </TableRow>

                            ))
                        }

                    </TableBody>
                    <TableFooter adjustForCheckbox={false}>

                        <TableRow selectable={false}>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Date</TableHeaderColumn>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Logged By</TableHeaderColumn>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Hours</TableHeaderColumn>
                            <TableHeaderColumn style={{verticalAlign: "middle"}}>{}</TableHeaderColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

LogList.propTypes = {
    taskId: PropTypes.string.isRequired,
    tasklogs: PropTypes.array.isRequired,
    fetchTaskLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        tasklogs: state.tasklogs,
    }
};

export default connect(mapStateToProps,{fetchTaskLogs})(LogList);