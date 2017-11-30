/**
 * Created by Xingyu on 7/24/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import AddExistingItemModal from './AddExistingItemModal'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import ChangePriceField from '../ChangePriceField';
import ChangeQuantityField from '../ChangeQuantityField';
import Clear from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import NewSupplierModal from './NewSupplierModal';
import {fetchSuppliers} from '../../actions/supplier-actions';
import {savePurchase} from '../../actions/purchase-actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
class NewPurchaseModal extends React.Component {
    componentDidMount(){
    }

    constructor(props){
        super(props);
        this.state={
            date: {},
            notes: '',
            invoice_number: '',
            errors: {},
            items: [],

            subtotal: 0,
            total: 0,
            tax_rate: 1.12,

            open: false,
            validated: false,
            loading: false,
            done: false,

            supplier_id: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNewItemAddition = this.handleNewItemAddition.bind(this);
        this.handlePriceQuantityChange = this.handlePriceQuantityChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSupplierSelect = this.handleSupplierSelect.bind(this);
        this.handlePurchaseNumber = this.handlePurchaseNumber.bind(this);

    }

    handlePurchaseNumber(event, value){
        console.log("purhcase " + value);
        this.setState({invoice_number: value});};
    handleSupplierSelect(event, index, value){this.setState({supplier_id: value});};
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
                itemId: item._id,
                price: item.price,
                quantity: item.quantity,
            })

            ))];

            const new_purchase = {
                purchaseNumber: this.state.invoice_number,
                date: this.state.date,
                supplierID: this.state.supplier_id,
                itemSummary: itemSummary,
                subtotal: this.state.subtotal,
                total: this.state.total,
            };

            this.setState({loading: true});
            this.props.savePurchase(new_purchase).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();
        }
    };


    render(){
        const actions = [
            <FlatButton
                label="Cancel"
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
                    <FlatButton label="New Purchase" primary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                    <Dialog
                        title="Purchase Form"
                        actions={actions}
                        modal={true}
                        contentStyle={fullWidthDialog}
                        open={this.state.open}
                        autoDetectWindowHeight={true}
                        autoScrollBodyContent={true}
                    >

                        <div classID="purchase_form_header" className="columns" >
                            <div classID="supplier_info" className="column is-4">

                                <TextField
                                    hintText="Enter Purchase Number"
                                    floatingLabelText="Purhcase #"
                                    name="purchase_number"
                                    type="number"
                                    onChange={this.handlePurchaseNumber}
                                    value={this.state.invoice_number}
                                    fullWidth={false}
                                    errorText={this.state.errors.invoice_number}/>

                                <DatePicker
                                    hintText="Enter Date of Purchase"
                                    floatingLabelText="Date of Purchase"
                                    container="inline"
                                    fullWidth={false}
                                    onChange={this.handleDateChange}
                                    name="date"
                                    value={this.state.date}
                                    errorText={this.state.errors.date}
                                />

                            </div>
                            <div className="column is-4" style={{verticalAlign: 'middle'}}>
                                <SelectField
                                    floatingLabelText="Existing Supplier"
                                    hintText="Select an Exisiting Supplier"
                                    fullWidth={true}
                                    value={this.state.supplier_id}
                                    onChange={this.handleSupplierSelect}
                                >
                                    {
                                        this.props.suppliers.map((item) => (
                                            <MenuItem key={item._id} value={item} primaryText={item.name}/>
                                        ))
                                    }
                                </SelectField>
                                <div style={{textAlign:'center', width:'100%'}}>OR</div>
                                <NewSupplierModal/>


                            </div>
                            <div className="column is-4">

                            </div>
                        </div>
                        <div classID="order_items_table">
                            <Table
                                height={'700px'}
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
                                        <TableRowColumn/>
                                        <TableRowColumn/>
                                        <TableRowColumn/>
                                        <TableRowColumn/>
                                        <TableRowColumn style={{verticalAlign: "middle"}}>
                                            <AddExistingItemModal isHarvest={false} addItem={this.handleNewItemAddition}/>

                                        </TableRowColumn>

                                    </TableRow>

                                    <TableRow>
                                        <TableHeaderColumn style={{verticalAlign: 'middle'}}>Item Name</TableHeaderColumn>
                                        <TableHeaderColumn style={{verticalAlign: 'middle'}}>Unit Cost</TableHeaderColumn>
                                        <TableHeaderColumn style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                                        <TableHeaderColumn style={{verticalAlign: "middle"}}>Price</TableHeaderColumn>
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
                                                <ChangePriceField item={item} handlePriceQuantityChange={this.handlePriceQuantityChange}/>
                                            </TableRowColumn>
                                            <TableRowColumn style={{verticalAlign: 'middle'}}>
                                                <ChangeQuantityField item={item} handlePriceQuantityChange={this.handlePriceQuantityChange}/>
                                            </TableRowColumn>
                                            <TableRowColumn style={{verticalAlign: "middle"}}>$ {(item.price * item.quantity).toFixed(2)}</TableRowColumn>
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
                                        <TableRowColumn style={{verticalAlign: 'middle'}}>Subtotal</TableRowColumn>
                                        <TableRowColumn style={{verticalAlign: 'middle'}}>$ {
                                            (this.state.subtotal).toFixed(2)
                                        }</TableRowColumn>
                                        <TableRowColumn/>
                                    </TableRow>

                                </TableBody>
                                <TableFooter adjustForCheckbox={false}>

                                    <TableRow selectable={false}>
                                        <TableRowColumn/>
                                        <TableRowColumn/>
                                        <TableRowColumn style={{verticalAlign: 'middle', fontWeight: 'bold'}}>Total Purchase Value</TableRowColumn>
                                        <TableRowColumn style={{verticalAlign: 'middle', fontWeight: 'bold'}}>$ {(this.state.subtotal * this.state.tax_rate).toFixed(2)}
                                        </TableRowColumn>
                                        <TableRowColumn/>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </Dialog>
            </div>


        )
    };
}

NewPurchaseModal.propTypes = {
    suppliers: PropTypes.array.isRequired,
    fetchSuppliers: PropTypes.func.isRequired,
    savePurchase: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        suppliers: state.suppliers,
    }
};

export default connect(mapStateToProps, {fetchSuppliers, savePurchase})(NewPurchaseModal);

