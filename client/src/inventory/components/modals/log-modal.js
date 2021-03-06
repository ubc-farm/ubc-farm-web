/**
 * Created by Xingyu on 7/12/2017.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {logItem} from '../../actions/universal-actions';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {logEquipment} from '../../actions/equipment-actions';
import {logVehicle} from '../../actions/vehicles-action';
import {logSeed} from '../../actions/seeds-put';
import {logTransplant} from '../../actions/transplant-actions'
import {logFertilizer} from '../../actions/fertilizer-actions'
import {logPesticide} from '../../actions/pest-actions'
import {logHarvested} from '../../actions/harvested_actions'
import LogScatter from '../visuals/LogScatter';
import Divider from 'material-ui/Divider';
import NewSupplierModal from './new-supplier-modal-nested';
import update from 'immutability-helper'
import PieChart from '../visuals/PieChart';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


const styles = {
    button:{
        margin:12
    }

};




class LogItemModal extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            item_to_change:{},
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
            suppliers_change: [],
            offsets:{left: 481, top: 60},
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);
        this.handleSupplierNumberChange = this.handleSupplierNumberChange.bind(this);
        this.addSupplier = this.addSupplier.bind(this);

    };

    dateTransformer(dateString){
        return new Date(dateString);
    }

    componentDidMount(){

        let supplierList = this.props.item.suppliers.map((supplier) => (0));
        this.setState({suppliers_change: supplierList});
    }

    handleOpen(event){
        this.setState({open: true});

    };

    handleClose(){
        this.setState({open: false});
    };

    handleSubmit(e){
        e.preventDefault();

        //set new quantities for total and suppliers
        let newValue = 0;
        this.props.item.suppliers.map((supplier, index) => {
            supplier.quantity = parseFloat(supplier.quantity) + this.state.suppliers_change[index];
            newValue += supplier.quantity;
        });

        //push changes to database
        this.setState({loading: true});

        switch(this.props.inventory){
            case 'seeds':
                this.props.logSeed({id: this.props.item._id,log: {timestamp: Date.now(),value: newValue},suppliers:this.props.item.suppliers});
                break;
            case 'transplants':
                this.props.logTransplant({id: this.props.item._id,log: {timestamp: Date.now(),value: newValue},suppliers:this.props.item.suppliers});
                break;
            case 'fertilizers':
                this.props.logFertilizer({id: this.props.item._id,log: {timestamp: Date.now(),value: newValue},suppliers:this.props.item.suppliers});
                break;
            case 'pesticides':
                this.props.logPesticide({id: this.props.item._id,log: {timestamp: Date.now(),value: newValue},suppliers:this.props.item.suppliers});
                break;
            case 'equipments':
                this.props.logEquipment({id: this.props.item._id,log: {timestamp: Date.now(),value: newValue},suppliers:this.props.item.suppliers});
                break;
            case 'vehicles':
                this.props.logVehicle({id: this.props.item._id,log: {timestamp: Date.now(),value: newValue},suppliers:this.props.item.suppliers});
                break;
            case 'harvested':
            this.props.logHarvested({id: this.props.item._id,log: {timestamp: Date.now(),value: newValue},suppliers:this.props.item.suppliers});
            break;

        }

        // this.props.logEquipment({id: this.props.item._id,log: {timestamp: Date.now(),value: newValue},suppliers:this.props.item.suppliers});
        //TO DO - ADD SUPPLIER INFO TO SUPPLIER DATABASE
        this.setState({done: true, loading: false});
        this.handleClose();

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

    addSupplier(supplier){
        console.log(supplier);

        this.props.item.suppliers = update(this.props.item.suppliers, {$push: [supplier]});
        this.state.suppliers_change = update(this.state.suppliers_change,{$push: [0]});

        console.log(this.props.item.suppliers);

        this.forceUpdate();
    }

    handleSupplierNumberChange(e){
        console.log(e.target.name);
        console.log(e.target.value);

        this.setState({
            suppliers_change: update(this.state.suppliers_change, {[e.target.name]: {$set: parseInt(e.target.value)}}),
        });

        console.log(this.state.suppliers_change);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
                style={styles.button}
            />,
            <FlatButton
                label={this.state.loading ? '' : "Edit"}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                icon={this.state.loading ? <CircularProgress /> : ''}
                style={styles.button}
            />,
        ];


        return (
            <div key={this.state.timestamp}>
                <div>
                    <FlatButton label="Edit" primary={true} onTouchTap={this.handleOpen} />
                    <Dialog
                        title={"Edit " + this.props.item.name + " Quantity"}
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        ref = 'dialog'
                    >

                        <Table
                            height={'230px'}
                            fixedHeader={true}
                            fixedFooter={true}
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
                                    <TableHeaderColumn tooltip="Sort by Supplier Name" style={{verticalAlign: 'middle'}}>Supplier Name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Sort by Start Unit" style={{verticalAlign: 'middle'}}>Unit</TableHeaderColumn>
                                    <TableHeaderColumn style={{verticalAlign: "middle"}}>Change</TableHeaderColumn>

                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                deselectOnClickaway={true}
                                showRowHover={true}
                                stripedRows={false}
                            >
                                {this.props.item.suppliers.map( (supplier, index) => (
                                    <TableRow key={index}>
                                        <TableRowColumn style={{verticalAlign: 'middle'}}>{supplier.name}</TableRowColumn>
                                        <TableRowColumn style={{verticalAlign: 'middle'}}>{supplier.quantity}</TableRowColumn>
                                        <TableRowColumn style={{verticalAlign: 'middle'}}>{supplier.unit}</TableRowColumn>
                                        <TableRowColumn>
                                            <div className="columns">
                                                <div className="column">
                                                    <TextField
                                                        hintText="Enter Change"
                                                        name={index.toString()}
                                                        type="number"
                                                        onChange={this.handleSupplierNumberChange}
                                                        style={{width: "100%"}}
                                                        defaultValue={0}
                                                        errorText={this.state.errors.change}/>
                                                </div>
                                            </div>
                                        </TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter adjustForCheckbox={false}>

                                <TableRow selectable={false}>
                                    <TableRowColumn style={{verticalAlign: 'middle'}}>Total:</TableRowColumn>
                                    <TableRowColumn style={{verticalAlign: 'middle'}}>{this.props.item.quantity}</TableRowColumn>
                                    <TableRowColumn/>
                                    <TableRowColumn style={{verticalAlign: 'middle'}}>
                                        <NewSupplierModal addSupplier={this.addSupplier}/>
                                    </TableRowColumn>
                                </TableRow>
                            </TableFooter>
                        </Table>

                        {!!this.state.errors.global && <p>this.state.errors.global</p>}
                    </Dialog>
                </div>
            </div>

        );
    }
}

LogItemModal.propTypes = {
    item: PropTypes.object.isRequired,
    inventory: PropTypes.string.isRequired,

};

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps, {logSeed,logTransplant, logEquipment, logVehicle,logFertilizer,logPesticide,logHarvested})(LogItemModal);