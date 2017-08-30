/**
 * Created by Xingyu on 7/24/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import AddExistingItemModal from './modals/AddExistingItemModal'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {fetchSuppliers} from '../actions/supplier-actions'
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class NewPurchasePage extends React.Component {
    componentDidMount(){
        this.props.fetchSuppliers();
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
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNewItemAddition = this.handleNewItemAddition.bind(this);

    }

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
            subtotal: this.state.subtotal + item.quantity * item.price,
        });
    }


    render(){
        return(
        <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "20px"}}>
            <div className="title is-3">Purchase Form</div>
            <div classID="purchase_form_header" className="columns">
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
                            <TableHeaderColumn style={{verticalAlign: "middle"}}>
                                <div className="columns">
                                    <div className="column">
                                        <AddExistingItemModal addItem={this.handleNewItemAddition}/>
                                    </div>
                                    <div className="column">

                                        <RaisedButton primary={true} label="Add New Item"/>
                                    </div>
                                </div>
                            </TableHeaderColumn>

                        </TableRow>

                        <TableRow>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Item Name</TableHeaderColumn>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Unit Cost</TableHeaderColumn>
                            <TableHeaderColumn style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn style={{verticalAlign: "middle"}}>Price</TableHeaderColumn>

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
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{(item.price * 1.0).toFixed(2)}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.quantity}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: "middle"}}>$ {(item.price * item.quantity).toFixed(2)}</TableRowColumn>

                            </TableRow>
                        ))}
                        <TableRow>
                            <TableRowColumn/>
                            <TableRowColumn/>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Subtotal</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>$ {
                                (this.state.subtotal).toFixed(2)
                            }</TableRowColumn>
                        </TableRow>

                    </TableBody>
                    <TableFooter adjustForCheckbox={false}>

                        <TableRow selectable={false}>
                            <TableRowColumn/>
                            <TableRowColumn/>
                            <TableRowColumn style={{verticalAlign: 'middle', fontWeight: 'bold'}}>Total</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle', fontWeight: 'bold'}}>$ {(this.state.subtotal * this.state.tax_rate).toFixed(2)}
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>


        </div>

        )
    };
}

NewPurchasePage.propTypes = {
    suppliers: PropTypes.array.isRequired,
    fetchSuppliers: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
    return {
        suppliers: state.suppliers,
    }

};

export default connect(mapStateToProps,{fetchSuppliers})(NewPurchasePage);

