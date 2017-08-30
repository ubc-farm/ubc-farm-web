/**
 * Created by Xingyu on 8/30/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import LogItemModel from '../modals/log-modal';

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

/**
 * Table form representation of Transplanting Items
 */
class PurchaseList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,

        };
    }


    render(){
        return (
            <div>
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
                                        <AddExistingItemModal/>
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
                                <TableHeaderColumn style={{verticalAlign: 'middle'}}>{item.name}</TableHeaderColumn>
                                <TableHeaderColumn style={{verticalAlign: 'middle'}}>{item.price}</TableHeaderColumn>
                                <TableRowColumn>
                                    <div className="columns">
                                        <div className="column">
                                            <TextField
                                                hintText="Enter Quantity"
                                                name={index.toString()}
                                                type="number"
                                                onChange={this.handleSupplierNumberChange}
                                                style={{width: "100%"}}
                                                defaultValue={0}
                                                errorText={this.state.errors.change}/>
                                        </div>
                                    </div>
                                </TableRowColumn>
                                <TableHeaderColumn style={{verticalAlign: "middle"}}>{item.price * this.state.quantity}</TableHeaderColumn>

                            </TableRow>
                        ))}
                        <TableRow>
                            <TableRowColumn/>
                            <TableRowColumn/>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Subtotal</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>$</TableRowColumn>
                        </TableRow>

                    </TableBody>
                    <TableFooter adjustForCheckbox={false}>

                        <TableRow selectable={false}>
                            <TableRowColumn/>
                            <TableRowColumn/>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Total</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>$</TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        )
    }
}

PurchaseList.propTypes = {
    equipments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        equipments: state.equipments,
    }
};

export default connect(mapStateToProps)(PurchaseList);