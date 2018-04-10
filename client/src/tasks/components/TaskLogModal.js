/**
 * Created by Xingyu on 01/03/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import AddExistingItemModal from '../../finances/components/modals/AddExistingItemModal';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Clear from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ChangeQuantityField from '../../finances/components/ChangeQuantityField';
import {fetchTaskLogs,saveTaskLog} from '../actions/tasklog-actions';
import LogList from './LogList';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import CreateSeedModal from '../../inventory/components/create-seed-modal';
import CreateEquipmentModal from '../../inventory/components/modals/new-equipment-modal';
import CreateFertilizerModal from '../../inventory/components/modals/new-fertilizer-modal';
import CreateHarvestedModal from '../../inventory/components/modals/new-harvested-modal';
import CreatePesticideModal from '../../inventory/components/modals/new-pestControl-modal';
import CreateTransplantModal from '../../inventory/components/modals/new-transplanting-modal';
import CreateVehicleModal from '../../inventory/components/modals/new-vehicles-modal';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


//import taskOptionGenerator from './TaskTypeOptionGenerator';
const fullWidthDialog = {
    width: '100%',
    maxWidth: 'none',
};

//list of inventories
const inventoryList = [
    <CreateSeedModal/>,
    <CreateTransplantModal/>,
    <CreateFertilizerModal/>,
    <CreatePesticideModal/>,
    <CreateEquipmentModal/>,
    <CreateVehicleModal/>,
    <CreateHarvestedModal/>,
];
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

            //social event
            ageGroups: [],

            //seeding
            seedingDepth: 5,

            //soil sampling
            samplingDepth: "",

            //add new item inventory
            newItemInv: 1,

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
        this.taskNameConverter = this.taskNameConverter.bind(this);
        this.handleSeedingDepth = this.handleSeedingDepth.bind(this);
        this.handleSamplingDepth = this.handleSamplingDepth.bind(this);
        this.handleSocialAgeGroup = this.handleSocialAgeGroup.bind(this);
        this.handleNewItemInv = this.handleNewItemInv.bind(this);

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

    handleNewItemInv(event, index, value){
        this.setState({newItemInv: value})
    };

    handleSocialAgeGroup(event, index, value){
        this.setState({ageGroups: value})
    };

    handleDateChange(event, date) {
        this.setState({date: date});
    };

    handleNewItemAddition(item){
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

    handleSamplingDepth(event, value){
        let num = parseFloat(value);
        this.setState({samplingDepth: num})
    }

    handleSeedingDepth(event, value){
        let num = parseFloat(value);
        this.setState({seedingDepth: num})
    }

    handleSubmit(e){
        e.preventDefault();

        //validation
        let errors = {};
        if(this.state.hours === '')
            errors.hours  = "This field is Required";
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
                taskId: this.props.task._id,
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

    taskNameConverter(taskName){
        let optionComponent;

        switch(taskName){
            case "seeding":
                optionComponent =
                    <div>
                        <div className="columns">
                            <div className="column is-6-desktop">
                                <TextField
                                    hintText="Spacing Width"
                                    floatingLabelText="Spacing Width"
                                />
                                <br/>
                                <TextField
                                    hintText="Spacing Length"
                                    floatingLabelText="Spacing Length"
                                />
                                <br/>
                                <div>Seeding Depth</div>
                                <TextField id="seedingDepth"
                                           value={this.state.seedingDepth}
                                           type="number"
                                           onChange={this.handleSeedingDepth}
                                />
                                <Slider min = {0}
                                        defaultValue={5}
                                        max = {100}
                                        value={this.state.seedingDepth}
                                        onChange={this.handleSeedingDepth}
                                        style={{width: "250px"}}
                                />

                            </div>
                            <div className="column is-6-desktop">
                                <TextField
                                    hintText="Spacing Depth"
                                    floatingLabelText="Spacing Depth"
                                />
                                <br/>
                                <TextField
                                    hintText="Spacing Units"
                                    floatingLabelText="Spacing Units"
                                />

                            </div>
                        </div>
                    </div>;
                break;

            case "irrigation":
                optionComponent =
                    <div>
                        <TextField
                            hintText="Flow Rate"
                            floatingLabelText="Flow Rate"
                        />
                    </div>;
                break;

            case "pest-control":
                optionComponent = <div> </div>;
                break;

            case "transplanting":
                optionComponent = <div>
                    <TextField
                        hintText="Spacing Width"
                        floatingLabelText="Spacing Width"
                    />
                    <br/>
                    <TextField
                        hintText="Spacing Length"
                        floatingLabelText="Spacing Length"
                    />
                    <br/>
                    <TextField
                        hintText="Spacing Depth"
                        floatingLabelText="Spacing Depth"
                    />
                    <br/>
                    <TextField
                        hintText="Spacing Units"
                        floatingLabelText="Spacing Units"
                    />

                </div>;
                break;

            case "soil sampling":
                optionComponent =
                    <div>
                        <div>Sampling Depth</div>
                        <TextField id="samplingDepth"
                                   value={this.state.samplingDepth}
                                   type="number"
                                   onChange={this.handleSamplingDepth}
                                   />
                        <Slider min = {0}
                                defaultValue={5}
                                max = {100}
                                value={this.state.samplingDepth}
                                onChange={this.handleSamplingDepth}
                                style={{width: "250px"}}
                        />
                    </div>;
                break;

            case "scouting harvest":
                optionComponent = <div> </div>;
                break;

            case "scouting pests":
                optionComponent = <div>
                    <TextField
                        hintText="Type"
                        floatingLabelText="Type"
                    /><br/>
                    <TextField
                        hintText="Common name"
                        floatingLabelText="Common name"
                    /><br/>
                    <TextField
                        hintText="(if applicable) "
                        floatingLabelText="Affected area (Roots, Stem, Leaves)"
                    /><br/>
                    <TextField
                        hintText="Affected area (%)"
                        floatingLabelText="Affected area (%)"
                    /><br/>
                    <TextField
                        hintText="Plants affected  (%)"
                        floatingLabelText="Plants affected  (%)"
                    />
                </div>;
                break;

            case "fertilizing":
                optionComponent = <div> fertilizer, equipment </div>;
                break;

            case "bed preparation":
                optionComponent = <div> equipment </div>;
                break;

            case "packing":
                optionComponent = <div> </div>;
                break;

            case "washing":
                optionComponent = <div> </div>;
                break;

            case "washing and packing":
                optionComponent = <div> </div>;
                break;

            case "social event":
                optionComponent = <div>
                    <div>Age Group</div>
                    <SelectField value={this.state.ageGroups} onChange={this.handleSocialAgeGroup} multiple={true}>
                        <MenuItem value={"0-5"} primaryText="0-5" />
                        <MenuItem value={"6-10"} primaryText="6-10" />
                        <MenuItem value={"11-15"} primaryText="11-15" />
                        <MenuItem value={"16-20"} primaryText="16-20" />
                        <MenuItem value={"21-30"} primaryText="21-30" />
                    </SelectField>
                </div>;
                break;

            case "other":
                optionComponent = <div> </div>;
                break;
        }

        return optionComponent;
    }


    render(){
        const actions = [
            <FlatButton
                label="Exit"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label={this.state.loading ? '' : "Submit"}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                icon={this.state.loading ? <CircularProgress /> : ''}
            />,
        ];

        return(
            <div key={this.state.timestamp}>
                <FlatButton label="Log" primary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />

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
                        <div classID="task_log_left" className="column is-7">


                            <div className="title is-5">New Log</div>
                            <RadioButtonGroup name="jobRole" defaultSelected="volunteer">
                                <RadioButton
                                    value="volunteer"
                                    label="Volunteer"
                                />
                                <RadioButton
                                    value="employee"
                                    label="Employee"
                                />
                            </RadioButtonGroup>
                            <TextField
                                hintText="Log hours worked"
                                floatingLabelText="hours worked"
                                name="hours"
                                type="number"
                                onChange={this.handleChange}
                                value={this.state.hours}
                                fullWidth={false}/>
                            {this.taskNameConverter(this.props.task.type)}
                            <TextField
                                hintText="Enter brief Description"
                                multiLine={true}
                                rows={5}
                                rowsMax={10}
                                floatingLabelText="Notes"
                                textareaStyle={{ backgroundColor: '#EEEEEE'}}
                                fullWidth={true}
                                onChange={this.handleDescriptionChange}
                                name="description"
                                value={this.state.description}
                                errorText={this.state.errors.name}
                            />



                        </div>

                        <div className="column is-5">
                            <div className="title is-5">Resources Used</div>
                            <AddExistingItemModal isHarvest={false} addItem={this.handleNewItemAddition}/>
                            <SelectField
                                floatingLabelText="Add new Item"
                                value={this.state.newItemInv}
                                onChange={this.handleNewItemInv}
                            >
                                <MenuItem value={0} primaryText="Seeds" />
                                <MenuItem value={1} primaryText="Transplanting" />
                                <MenuItem value={2} primaryText="Fertilizers" />
                                <MenuItem value={3} primaryText="Pest Control" />
                                <MenuItem value={4} primaryText="Equipment" />
                                <MenuItem value={5} primaryText="Vehicle" />
                                <MenuItem value={6} primaryText="Harvested Produce" />
                            </SelectField>
                            <div>{inventoryList[this.state.newItemInv]}</div>

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
                                                <FlatButton
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

    tasklogs: PropTypes.array.isRequired,
    fetchTaskLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        tasklogs: state.tasklogs,
    }
};

export default connect(mapStateToProps, {fetchTaskLogs,saveTaskLog})(TaskLogModal);