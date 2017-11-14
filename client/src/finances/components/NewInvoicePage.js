/**
 * Created by Xingyu on 7/24/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import AddExistingItemModal from './modals/AddExistingItemModal'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import ChangePriceField from './ChangePriceField';
import ChangeQuantityField from './ChangeQuantityField';
import Clear from 'material-ui/svg-icons/content/clear';
import RemoveItemButton from './RemoveItemButton';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class NewInvoicePage extends React.Component {
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
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNewItemAddition = this.handleNewItemAddition.bind(this);
        this.handlePriceQuantityChange = this.handlePriceQuantityChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

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

    deleteItem(e,item){
        console.log("delete item");
        const newState = this.state.items;
        if (newState.indexOf(item) > -1) {
            newState.splice(newState.indexOf(item), 1);
            this.setState({items: newState})
            this.handlePriceQuantityChange();
        }
        console.log(this.state.items);
    }


    render(){
        return(
            <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "20px"}}>
                <div className="title is-3">Invoice Form</div>
                <div classID="purchase_form_header" className="columns">
                    <div classID="details" className="column is-4">

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
                            hintText="Enter Date of Sale"
                            floatingLabelText="Date of Sale"
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
                                    <AddExistingItemModal addItem={this.handleNewItemAddition} isHarvest={true}/>
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
                                <TableRowColumn style={{verticalAlign: 'middle', fontWeight: 'bold'}}>Total Sales Value</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle', fontWeight: 'bold'}}>$ {(this.state.subtotal * this.state.tax_rate).toFixed(2)}
                                </TableRowColumn>
                                <TableRowColumn/>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>


            </div>

        )
    };
}

NewInvoicePage.propTypes = {

};

const mapStateToProps = (state) => {
    return {
    }

};

export default connect(mapStateToProps)(NewInvoicePage);