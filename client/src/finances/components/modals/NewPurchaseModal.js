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
import RemoveItemButton from '../RemoveItemButton';
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
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNewItemAddition = this.handleNewItemAddition.bind(this);
        this.handlePriceQuantityChange = this.handlePriceQuantityChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleOpen(){
        this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false, name: ''});
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
            // const new_client = {
            //     name: this.state.name,
            //     address:
            //         {
            //             number: this.state.number,
            //             street: this.state.street,
            //             postal: this.state.postal,
            //             city: this.state.city,
            //         },
            //     telephone: this.state.telephone,
            // };

            this.setState({loading: true});
            // this.props.SaveClient(new_client).then(
            //     (response) => {console.log("should catch error here")}
            // );
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

        // const form = (
        //
        //
        // );

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
                                    hintText="Enter Invoice Number"
                                    floatingLabelText="Invoice #"
                                    name="invoice_number"
                                    type="number"
                                    onChange={this.handleChange}
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
                            <div className="column is-4">

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
                                            <RaisedButton primary={true} fullWidth={true} style={{margin:"5px"}} label="Add New Item"/>
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

export default connect()(NewPurchaseModal);

