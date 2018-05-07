/**
 * Created by Xingyu on 11/13/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchClients} from '../../actions/client-actions';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//List of Clients
class ClientList extends React.Component {
    componentDidMount(){
        this.props.fetchClients();
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
                            <TableHeaderColumn tooltip="Sort by Type" style={{verticalAlign: 'middle'}}>Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Field" style={{verticalAlign: 'middle'}}>Telephone</TableHeaderColumn>
                            <TableHeaderColumn/>

                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.props.clients.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.name}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.telephone}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>
                                    <div className="columns">
                                        <div className="column">
                                            Delete
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
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Name</TableRowColumn>
                            <TableRowColumn style={{verticalAlign: 'middle'}}>Telephone</TableRowColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

ClientList.propTypes = {
    clients: PropTypes.array.isRequired,
    fetchClients: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        clients: state.clients,
    }
};

export default connect(mapStateToProps,{fetchClients})(ClientList);
