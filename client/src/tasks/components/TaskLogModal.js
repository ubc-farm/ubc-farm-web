/**
 * Created by Xingyu on 01/03/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AddExistingItemModal from '../../finances/components/modals/AddExistingItemModal';
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField';
import Clear from 'material-ui-icons/Clear';
import Dialog from 'material-ui/Dialog';
import ChangeQuantityField from '../../finances/components/ChangeQuantityField';
import {fetchTaskLogs,saveTaskLog} from '../actions/tasklog-actions';
import LogList from './LogList';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const fullWidthDialog = {
    width: '100%',
    maxWidth: 'none',
};
class TaskLogModal extends React.Component {
    componentDidMount(){
        this.props.fetchTaskLogs();
    }

    constructor(props){
        super(props);
        this.state={
            userName: "Test",
            date: {},
            hours: "",
            description: "",
            errors: {},
            items: [],

            log_list: [],

            open: false,
            validated: false,
            loading: false,
            done: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNewItemAddition = this.handleNewItemAddition.bind(this);
        this.handlePriceQuantityChange = this.handlePriceQuantityChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleOpen(){
        this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false});
    };

    handleChange(e){
        if(this.state.errors[e.target.name]){
            console.log("handle error fired");
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors,
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value,
            });

        }

    };

    handleDateChange(event, date) {
        this.setState({date: date});
    };

    handleNewItemAddition(item){
        console.log("handling new item addition!");
        console.log(item);
        this.setState({
            items: [
                ...this.state.items,
                item
            ],
        });
    }

    handlePriceQuantityChange(){
        let i;
        let subtotal = 0;
        for (i = 0; i < this.state.items.length; i++){
            let item = this.state.items[i];
            subtotal += (item.price * item.quantity);
        }
        this.setState({
            subtotal: subtotal,
            total: subtotal * 1.12,
        });
    }

    deleteItem(item){
        console.log("delete item");
        const newState = this.state.items;
        if (newState.indexOf(item) > -1) {
            newState.splice(newState.indexOf(item), 1);
            this.setState({items: newState});
            this.handlePriceQuantityChange();
        }
        console.log(this.state.items);
    }

    handleDescriptionChange(event){
        this.setState({description: event.target.value});
    };

    handleSubmit(e){
        e.preventDefault();

        //validation
        let errors = {};
        if(this.state.name === '')
            errors.name  = "This field is Required";
        this.setState({errors});

        //if valid, create post request
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            const itemSummary = [(this.state.items.map((item) => ({
                    itemId: item.selectedItem._id,
                    quantity: item.quantity,
                })

            ))];

            const curDate = Date.now();

            const new_tasklog = {
                userName: this.state.userName,
                date: curDate,
                hours: this.state.hours,
                description: this.state.description,
                items: itemSummary,
            };

            this.setState({loading: true});
            this.props.saveTaskLog(new_tasklog).then(
                (response) => {console.log("should catch error here")}
            );
            this.props.fetchTaskLogs();
            this.setState({done: true, loading: false});
            //this.handleClose();
        }
    };


    render(){
        const actions = [
            <Button
                label="Exit"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return(
            <div key={this.state.timestamp}>
                <Button label="Log" primary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />

                <Dialog
                    title = {this.props.fieldName + " task log"}
                    actions={actions}
                    modal={true}
                    contentStyle={fullWidthDialog}
                    open={this.state.open}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                >

                    <div classID="task_log_form" className="columns" style={{marginTop: "1em"}} >
                        <div classID="task_log_left" className="column is-4">
                            <div className="title is-5">Summary</div>

                            <div className="text-info">Task Type: {this.props.typeTransformer(this.props.task.type)}</div>
                            <div className="text-info">Duration: {this.props.dateTransformer(this.props.task.startDate) +" -- " + this.props.dateTransformer(this.props.task.endDate)}</div>
                            <div className="text-info">Aggregated Hours: {this.state.hours}</div>

                            <div className="title is-5" style={{marginTop: "1em"}}>Previous Logs</div>

                            <LogList/>


                        </div>
                        <div classID="task_log_rignt" className="column is-2">
                            <div className="title is-5">New Log</div>
                            <TextField
                                hintText="Log hours worked"
                                floatingLabelText="hours worked"
                                name="hours"
                                type="number"
                                onChange={this.handleChange}
                                value={this.state.hours}
                                fullWidth={false}/>
                            <TextField
                                hintText="MultiLine with rows: 2 and rowsMax: 4"
                                multiLine={true}
                                rows={5}
                                rowsMax={10}
                                floatingLabelText="Description"
                                textareaStyle={{ backgroundColor: '#EEEEEE'}}
                                fullWidth={true}
                                onChange={this.handleDescriptionChange}
                                name="description"
                                value={this.state.description}
                                errorText={this.state.errors.name}
                            />


                        </div>
                        <div className="column is-6">
                            <div className="title is-5">Resources Used</div>
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
                                    <AddExistingItemModal isHarvest={false} addItem={this.handleNewItemAddition}/>

                                    <TableRow>
                                        <TableHeaderColumn style={{verticalAlign: 'middle'}}>Item Name</TableHeaderColumn>
                                        <TableHeaderColumn style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                                        <TableHeaderColumn style={{verticalAlign: "middle"}}>Remove Item</TableHeaderColumn>

                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                    deselectOnClickaway={true}
                                    showRowHover={true}
                                    stripedRows={false}
                                >
                                    {this.state.items.map( (item, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn style={{verticalAlign: 'middle'}}>{item.selectedItem.name}</TableRowColumn>
                                            <TableRowColumn style={{verticalAlign: 'middle'}}>
                                                <ChangeQuantityField item={item} handlePriceQuantityChange={this.handlePriceQuantityChange}/>
                                            </TableRowColumn>
                                            <TableRowColumn style={{verticalAlign: 'middle'}}>
                                                <Button
                                                    icon={<Clear color="#000000" />}
                                                    onClick={this.deleteItem.bind(this,item)}
                                                />
                                            </TableRowColumn>

                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableRowColumn/>
                                        <TableRowColumn/>
                                        <TableRowColumn/>
                                    </TableRow>

                                </TableBody>
                                <TableFooter adjustForCheckbox={false}>

                                    <TableRow selectable={false}>
                                        <TableRowColumn/>
                                        <TableRowColumn/>
                                        <TableRowColumn/>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            <Button
                                variant="raised"
                                label={this.state.loading ? '' : "Submit"}
                                primary={true}
                                disabled={false}
                                onTouchTap={this.handleSubmit}
                                icon={this.state.loading ? <CircularProgress /> : ''}
                            />
                        </div>
                    </div>

                </Dialog>
            </div>


        )
    };
}

TaskLogModal.propTypes = {
    task: PropTypes.object.isRequired,
    fieldName: PropTypes.string.isRequired,
    typeTransformer: PropTypes.func.isRequired,
    dateTransformer: PropTypes.func.isRequired,

    tasklogs: PropTypes.array.isRequired,
    fetchTaskLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        tasklogs: state.tasklogs,
    }
};

export default connect(mapStateToProps, {fetchTaskLogs,saveTaskLog})(TaskLogModal);