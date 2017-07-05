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
                            <TableHeaderColumn tooltip="Sort by Product Name" style={{verticalAlign: 'middle'}}>Product</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Store" style={{verticalAlign: 'middle'}}>Store</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Price</TableHeaderColumn>
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
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Hammer</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>3</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}></TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>2.50</TableRowColumn>

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
                            <TableHeaderColumn tooltip="Sort by Product Name" style={{verticalAlign: 'middle'}}>Product</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Store" style={{verticalAlign: 'middle'}}>Store</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Price</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="5" style={{textAlign: 'center'}}>
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