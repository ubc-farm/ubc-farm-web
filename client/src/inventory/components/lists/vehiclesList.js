/**
 * Created by Xingyu on 7/4/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

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
class VehicleList extends Component {
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
                            <TableHeaderColumn tooltip="Sort by Brand" style={{verticalAlign: 'middle'}}>Brand</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Model" style={{verticalAlign: 'middle'}}>Model</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Year" style={{verticalAlign: 'middle'}}>Year</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Price</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.vehicles.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.brand}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.model}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.year}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.price}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.quantity}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>
                                    <div className="columns">
                                        <div className="column">
                                            Delete

                                        </div>
                                        <div className="column">
                                            <FlatButton
                                                label="Log"
                                                primary={true}
                                                onTouchTap={this.props.deleteEquipment}
                                            />
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
                            <TableHeaderColumn tooltip="Sort by Brand" style={{verticalAlign: 'middle'}}>Brand</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Model" style={{verticalAlign: 'middle'}}>Model</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Year" style={{verticalAlign: 'middle'}}>Year</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Price</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="6" style={{textAlign: 'center'}}>
                                Super Footer
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>
        )
    }
}

VehicleList.propTypes = {
    vehicles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        vehicles: state.vehicles,
    }
};

export default connect(mapStateToProps)(VehicleList);