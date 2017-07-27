/**
 * Created by Xingyu on 7/12/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {logItem} from '../../actions/universal-actions';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {logEquipment} from '../../actions/equipment-actions';
import LogScatter from '../visuals/LogScatter';
import Divider from 'material-ui/Divider';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


const styles = {
    button:{
        margin:12
    }

};

class LogItemModal extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
            change: 0,
            task:{}
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);

    };

    dateTransformer(dateString){
        let d = new Date(dateString);
        return d

    }

    handleOpen(){
        this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false});
    };

    handleSubmit(e){
        e.preventDefault();
        console.log(this.props.item);

        const newValue = parseFloat(this.props.item.quantity) + parseFloat(this.state.change);
        this.setState({loading: true});
        this.props.logEquipment({id: this.props.item._id,timestamp: Date.now(),value: newValue}).then(
            (response) => {console.log("should catch error here")}
        );
        this.setState({done: true, loading: false});
        this.handleClose();

    };
    handleChange(e){
        if(this.state.errors[e.target.name]){
            console.log("handle error fired");
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors,
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value,
            });

        }

    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
                style={styles.button}
            />,
            <FlatButton
                label={this.state.loading ? '' : "Edit"}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                icon={this.state.loading ? <CircularProgress /> : ''}
                style={styles.button}
            />,
        ];

        const form = (
            <div>
                <FlatButton label="Edit" primary={true} onTouchTap={this.handleOpen} />
                <Dialog
                    title={"Edit " + this.props.item.name + " Quantity"}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >


                    <LogScatter data={this.props.item.log.map((log_entry) => ({x:this.dateTransformer(log_entry.timestamp), y: log_entry.value}))}/>
                    <Divider/>
                    <Table
                        height={'300px'}
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
                                <TableHeaderColumn tooltip="Sort by Supplier Name" style={{verticalAlign: 'middle'}}>Supplier Name</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Sort by Start Unit" style={{verticalAlign: 'middle'}}>Unit</TableHeaderColumn>
                                <TableHeaderColumn/>

                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            deselectOnClickaway={true}
                            showRowHover={true}
                            stripedRows={false}
                        >
                            {this.props.item.suppliers.map( (supplier, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn style={{verticalAlign: 'middle'}}>{supplier.name}</TableRowColumn>
                                    <TableRowColumn style={{verticalAlign: 'middle'}}>{supplier.quantity}</TableRowColumn>
                                    <TableRowColumn style={{verticalAlign: 'middle'}}>{supplier.unit}</TableRowColumn>
                                    <TableRowColumn>
                                        <div className="columns">
                                            <div className="column">
                                                <TextField
                                                    hintText="Enter Change"
                                                    name="change"
                                                    type="number"
                                                    onChange={this.handleChange}
                                                    style={{width: "100%"}}
                                                    value={this.state.change}
                                                    errorText={this.state.errors.change}/>
                                            </div>
                                        </div>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                            <TableRow key="new_supplier">
                                <TableRowColumn/>
                                <TableRowColumn/>
                                <TableRowColumn/>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>
                                    <FlatButton>New Supplier</FlatButton>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                        <TableFooter
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn tooltip="Sort by Supplier Name" style={{verticalAlign: 'middle'}}>Supplier Name</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Sort by Start Unit" style={{verticalAlign: 'middle'}}>Unit</TableHeaderColumn>
                                <TableHeaderColumn/>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    {!!this.state.errors.global && <p>this.state.errors.global</p>}
                </Dialog>
            </div>
        );

        return (
            <div key={this.state.timestamp}>
                {form}
            </div>

        );
    }
}

LogItemModal.propTypes = {
    item: PropTypes.object.isRequired,
};

export default connect(null, {logEquipment})(LogItemModal);