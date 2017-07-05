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
class FertilizerList extends Component {
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
                            <TableHeaderColumn tooltip="Sort by Type" style={{verticalAlign: 'middle'}}>Type</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Product Name" style={{verticalAlign: 'middle'}}>Product Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Application Rate" style={{verticalAlign: 'middle'}}>Application Rate</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Mix Ratio" style={{verticalAlign: 'middle'}}>Mix Ratio</TableHeaderColumn>
                            <TableHeaderColumn tooltip="View Active Ingredients" style={{verticalAlign: 'middle'}} width={400}>Active Ingredients</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Unit Price</TableHeaderColumn>
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

                        {this.props.fertilizers.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.type}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.name}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.rate}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.ratio}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}} width={400}>
                                    TC%: {item.tc}, NO3%: {item.no3}, NH4%: {item.nh4}, K2O%: {item.k2o}, P2O5%: {item.p2o5}
                                </TableRowColumn>
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
                                                onTouchTap={this.props.deleteTranpslant}
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
                            <TableHeaderColumn tooltip="Sort by Type" style={{verticalAlign: 'middle'}}>Type</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Product Name" style={{verticalAlign: 'middle'}}>Product Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Application Rate" style={{verticalAlign: 'middle'}}>Application Rate</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Mix Ratio" style={{verticalAlign: 'middle'}}>Mix Ratio</TableHeaderColumn>
                            <TableHeaderColumn tooltip="View Active Ingredients" style={{verticalAlign: 'middle'}}>Active Ingredients</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Unit Price</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="8" style={{textAlign: 'center'}}>
                                Super Footer
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>
        )
    }
}

FertilizerList.propTypes = {
    fertilizers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        fertilizers: state.fertilizers,
    }
};

export default connect(mapStateToProps) (FertilizerList);