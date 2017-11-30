/**
 * Created by Xingyu on 11/17/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchInvoices} from '../../actions/invoice-actions';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//List of Invoices
class InvoiceList extends React.Component {
    componentDidMount(){
        this.props.fetchInvoices();
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
                            <TableHeaderColumn tooltip="Sort by Invoice Number" style={{verticalAlign: 'middle'}}>Invoice #</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Date" style={{verticalAlign: 'middle'}}>Date</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Client" style={{verticalAlign: 'middle'}}>Client</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Price</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.invoices.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.invoiceNumber}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.date}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.clientID}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.total.toFixed(2)}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Invoice #</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Date</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Client</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Price</TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

InvoiceList.propTypes = {
    invoices: PropTypes.array.isRequired,
    fetchInvoices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        invoices: state.invoices,
    }
};

export default connect(mapStateToProps,{fetchInvoices})(InvoiceList);