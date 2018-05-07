import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';


/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class CostOfProduction extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {

        };

        this.handleChange = this.handleChange.bind(this);
        this.fieldNameFromId = this.fieldNameFromId.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);
        this.totalHoursWorked = this.totalHoursWorked.bind(this);
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

    totalHoursWorked(){
      let hours = 0;
      let logs = this.props.tasklogs;
      this.props.fieldTasks.forEach(function(task){
        const taskIdString = task.taskId;
        logs.forEach(function(item, index){
            console.log(item.taskId);
            if(item.taskId == taskIdString){
                hours += item.hours;
            };
        });
      });
      return hours;
    }

    handleChange(event){
        this.setState({height: event.target.value});
    }

    render() {
        return (
            <div>
              <div>Total Tasks: {this.props.fieldTasks.length}</div>
              <div>Total Hours worked: {this.totalHoursWorked()} </div>
            </div>
        );
    }
}

CostOfProduction.propTypes = {
    fieldTasks: PropTypes.array.isRequired,
    tasklogs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        fieldTasks: state.fieldTasks,
        tasklogs: state.tasklogs,
    }
};

export default connect(mapStateToProps)(CostOfProduction);
