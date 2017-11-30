/**
 * Created by Xingyu on 11/17/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPurchases} from '../../actions/purchase-actions';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//List of Purchases
class PurchaseList extends React.Component {
    componentDidMount(){
        this.props.fetchPurchases();
    }

    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '300px',
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleToggle(event, toggled){
        this.setState({
            [event.target.name]: toggled,
        });
    }

    handleChange(event){
        this.setState({height: event.target.value});
    }

    render() {
        return (
            <div>
                <Table
                    height={'500px'}
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
                            <TableHeaderColumn tooltip="Sort by Purchase Number" style={{verticalAlign: 'middle'}}>Purhcase #</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Date" style={{verticalAlign: 'middle'}}>Date</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Supplier" style={{verticalAlign: 'middle'}}>Supplier</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Price</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.purchases.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.purchaseNumber}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.date}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.supplierID}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.total.toFixed(2)}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Purchase #</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Date</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Supplier</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Price</TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

PurchaseList.propTypes = {
    purchases: PropTypes.array.isRequired,
    fetchPurchases: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        purchases: state.purchases,
    }
};

export default connect(mapStateToProps,{fetchPurchases})(PurchaseList);