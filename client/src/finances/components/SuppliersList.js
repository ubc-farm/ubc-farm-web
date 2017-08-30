/**
 * Created by Xingyu on 7/31/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import EditSupplierModal from './EditSupplierModal';

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
class EquipmentList extends Component {
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
                    height={'100%'}
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
                            <TableHeaderColumn tooltip="Sort by Product Name" style={{verticalAlign: 'middle'}}>Product Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Unit" style={{verticalAlign: 'middle'}}>Unit</TableHeaderColumn>

                            <TableHeaderColumn/>
                            name: String,
                            price: Number,
                            store: String,
                            life: Number,
                            quantity: Number
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.equipments.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.name}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.quantity}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.unit}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>
                                    <div className="columns">
                                        <div className="column">
                                            Delete

                                        </div>
                                        <div className="column">
                                            <LogItemModel item={item}/>
                                        </div>
                                    </div>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="Sort by Product Name" style={{verticalAlign: 'middle'}}>Product Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Unit" style={{verticalAlign: 'middle'}}>Unit</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                                Super Footer
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>
        )
    }
}

EquipmentList.propTypes = {
    equipments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        equipments: state.equipments,
    }
};

export default connect(mapStateToProps)(EquipmentList);