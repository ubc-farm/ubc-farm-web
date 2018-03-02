/**
 * Created by Xingyu on 7/4/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
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
class HarvestedList extends Component {
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
                            <TableHeaderColumn tooltip="Sort by Item Name" style={{verticalAlign: 'middle'}}>Item Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Variety" style={{verticalAlign: 'middle'}}>Variety</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Price</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Unit" style={{verticalAlign: 'middle'}}>Unit</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.harvested.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.name}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.variety}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.price}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.quantity}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.unit}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>
                                    <div className="columns">
                                        <div className="column">
                                            Delete

                                        </div>
                                        <div className="column">
                                            <LogItemModel item={item} inventory="harvested"/>
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
                            <TableHeaderColumn tooltip="Sort by Item Name" style={{verticalAlign: 'middle'}}>Item Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Variety" style={{verticalAlign: 'middle'}}>Variety</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Price</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Unit" style={{verticalAlign: 'middle'}}>Unit</TableHeaderColumn>
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

HarvestedList.propTypes = {
    harvested: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        harvested: state.harvested,
    }
};

export default connect(mapStateToProps)(HarvestedList);