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
class PestControlList extends Component {
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
                            <TableHeaderColumn tooltip="Sort by Mix Ratio" style={{verticalAlign: 'middle'}}>Mix Ratio (Water : Mix)</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Application Location" style={{verticalAlign: 'middle'}}>Application Location</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Entry Interval" style={{verticalAlign: 'middle'}}>Entry Interval</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Harvest Interval" style={{verticalAlign: 'middle'}}>Harvest Interval</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Active Ingredient" style={{verticalAlign: 'middle'}}>Active Ingredient</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Active Ingredient %" style={{verticalAlign: 'middle'}}>Active Ingredient %</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.pesticides.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.type}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.name}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.rate}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.ratio}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.location}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.entry}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.harvest}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.active}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.percentage}</TableRowColumn>

                                <TableRowColumn style={{verticalAlign: 'middle'}}>
                                    <div className="columns">
                                        <div className="column">
                                            Delete

                                        </div>
                                        <div className="column">
                                            <FlatButton
                                                label="Log"
                                                primary={true}
                                                onTouchTap={this.props.deletePesticide}
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
                            <TableHeaderColumn tooltip="Sort by Mix Ratio" style={{verticalAlign: 'middle'}}>Mix Ratio (Water : Mix)</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Application Location" style={{verticalAlign: 'middle'}}>Application Location</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Entry Interval" style={{verticalAlign: 'middle'}}>Entry Interval</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Harvest Interval" style={{verticalAlign: 'middle'}}>Harvest Interval</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Active Ingredient" style={{verticalAlign: 'middle'}}>Active Ingredient</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Active Ingredient %" style={{verticalAlign: 'middle'}}>Active Ingredient %</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="10" style={{textAlign: 'center'}}>
                                Super Footer
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>
        )
    }
}

PestControlList.propTypes = {
    pesticides: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        pesticides: state.pesticides,
    }
};

export default connect(mapStateToProps)(PestControlList);