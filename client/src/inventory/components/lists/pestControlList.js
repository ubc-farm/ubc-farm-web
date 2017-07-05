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
class TransplantingList extends Component {
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
                            <TableHeaderColumn tooltip="Sort by Mix Ratio" style={{verticalAlign: 'middle'}}>Location</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by TC%" style={{verticalAlign: 'middle'}}>Entry Interval</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by NO3%" style={{verticalAlign: 'middle'}}>Harvest Interval</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by NH4%" style={{verticalAlign: 'middle'}}>Active Ingredient</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by K2O%" style={{verticalAlign: 'middle'}}>Active Ingredient %</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        <TableRow>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Spray</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Pesticide A</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Alternate Days</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>folial</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}></TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}></TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Nitrate</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>0.23</TableRowColumn>

                            <TableRowColumn style={{verticalAlign: 'middle'}}>
                                <div className="columns">
                                    <div className="column">
                                        Delete

                                    </div>
                                    <div className="column">
                                        <FlatButton
                                            label="Log"
                                            primary={true}
                                            onTouchTap={this.props.deleteSeed}
                                        />
                                    </div>
                                </div>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="Sort by Type" style={{verticalAlign: 'middle'}}>Type</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Product Name" style={{verticalAlign: 'middle'}}>Product Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Application Rate" style={{verticalAlign: 'middle'}}>Application Rate</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Mix Ratio" style={{verticalAlign: 'middle'}}>Location</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by TC%" style={{verticalAlign: 'middle'}}>Entry Interval</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by NO3%" style={{verticalAlign: 'middle'}}>Harvest Interval</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by NH4%" style={{verticalAlign: 'middle'}}>Active Ingredient</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by K2O%" style={{verticalAlign: 'middle'}}>Active Ingredient %</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="9" style={{textAlign: 'center'}}>
                                Super Footer
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>
        )
    }
}

// TransplantingList.propTypes = {
//     transplants: PropTypes.array.isRequired,
// };
//
// const mapStateToProps = (state) => {
//     return {
//         transplants: state.transplants,
//     }
// };

export default TransplantingList;