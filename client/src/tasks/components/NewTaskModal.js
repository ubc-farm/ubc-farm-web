/**
 * Created by Xingyu on 6/2/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider'
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle';
import {SaveTask} from '../actions/save-task';
import { Link, IndexLink } from 'react-router';

const styles = {
    toggle: {
        marginBottom: 16,
    },
};

const typeData = [
    {
        text: 'seeding',
        value: (
            <MenuItem
                primaryText="seeding"
                secondaryText="&#127793;"
            />
        ),
    },
    {
        text: 'irrigation',
        value: (
            <MenuItem
                primaryText="irrigation"
                secondaryText="&#128166;"
            />
        ),
    },
    {
        text: 'pest-control',
        value: (
            <MenuItem
                primaryText="pest-control"
                secondaryText="&#128028;"
            />
        ),
    },
    {
        text: 'transplanting',
        value: (
            <MenuItem
                primaryText="transplanting"
                secondaryText="&#127807;"
            />
        ),
    },
    {
        text: 'soil-sampling',
        value: (
            <MenuItem
                primaryText="soil-sampling"
                secondaryText="&#128300;"
            />
        ),
    },
    {
        text: 'scouting-harvest',
        value: (
            <MenuItem
                primaryText="scouting-harvest"
                secondaryText="&#128203;"
            />
        ),
    },
    {
        text: 'scouting-pests',
        value: (
            <MenuItem
                primaryText="scouting-pests"
                secondaryText="&#128204;"
            />
        ),
    },
    {
        text: 'fertilizing',
        value: (
            <MenuItem
                primaryText="fertilizing"
                secondaryText="&#128169;"
            />
        ),
    },

];

/**
 * Modal for creating new Task
 */
class CreateFieldModal extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            fieldsMenuData: [],
            multiDay: false,
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
            startDate: {},
            endDate: {},
            field:{},
            type:''
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createFieldsMenu = this.createFieldsMenu.bind(this);
        this.toggleDay = this.toggleDay.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    };

    componentDidMount() {
        this.state.fieldsMenuData = this.createFieldsMenu;
    }

    createFieldsMenu() {
        let data = this.props.fields.map((field) => {
            return {
                text: field.name,
                value: (
                    <MenuItem
                        key={field._id}
                        primaryText={field.name}
                    />
                ),
            }
        });
        console.log(data);
        return data;
    };

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({
            open: false,
            field: '',
            startDate: {},
            endDate: {},
            description: '',
            type: ''
        });
    };

    /**
     * Functions that handle form input changes
     *
     */
    handleChange(name, e) {
        let change = {};
        change[name] = e.target.value;
        this.setState(change);
    };

    handleStartDateChange(event, date) {
        this.setState({startDate: date, endDate: date});
    };

    handleEndDateChange(event, date){
        this.setState({endDate: date});
    };

    handleFieldChange(chosenRequest,index){
        console.log(this.props.fieldsMenuData[index]);
        this.setState({field: this.props.fieldsMenuData[index].id});
    };

    handleTypeChange(typeString){
        this.setState({type: typeString});
    };

    handleDescriptionChange(event){
        this.setState({description: event.target.value});
    };

    toggleDay(){
        this.setState({multiDay: !this.state.multiDay});
    };

    handleSubmit(e) {
        e.preventDefault();

        //validation
        let errors = {};
        if (this.state.field === '')
            errors.name = "This field is Required";
        this.setState({errors});

        //if valid, create post request
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            const {field,
                type,
                description,
                time,
                multiDay,
                startDate,
                endDate} = this.state;
            this.setState({loading: true});
            this.props.SaveTask({field,
                type,
                description,
                time,
                multiDay,
                startDate,
                endDate}).then(
                (response) => {
                    console.log("should catch error here")
                }
            )
            this.setState({done: true, loading: false});
            this.handleClose();
        }
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label={this.state.loading ? '' : "Submit"}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                icon={this.state.loading ? <CircularProgress /> : ''}
            />,
        ];

        return (
            <div key={this.state.timestamp} style={{minWidth: '100%', height: '100%'}}>
                <div style={{minWidth: '100%', height: '100%'}}>
                    <div style={{}}>
                        <FlatButton label="New Task" onTouchTap={this.handleOpen} labelStyle={{color: '#4CAF50'}}/>
                    </div>
                    <Dialog
                        title="Create New Task"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        contentStyle={{width:'100%'}}
                    >
                        <article className="message is-info">
                            <div className="message-header">
                                <p>Tip</p>
                                <button className="delete"/>
                            </div>
                            <div className="message-body">
                                You can also add tasks from the <Link to="/fields">Fields</Link> tab!
                            </div>
                        </article>
                        <form>
                            <Toggle
                                label="Multi-Day Task"
                                style={styles.toggle}
                                labelPosition="right"
                                onToggle={this.toggleDay}
                            />
                            <div style={{marginBottom:'5px'}}>
                                {this.state.multiDay ?
                                    (
                                    <div className="columns">
                                        <div className="column">
                                            <DatePicker
                                                hintText="Start Date"
                                                container="inline"
                                                fullWidth={true}
                                                onChange={this.handleStartDateChange}
                                                name="startDate"
                                                value={this.state.startDate}
                                                errorText={this.state.errors.name}
                                            />

                                        </div>
                                        <div className="column">
                                            <DatePicker
                                                hintText="Finish Date"
                                                container="inline"
                                                fullWidth={true}
                                                onChange={this.handleEndDateChange}
                                                name="endDate"
                                                value={this.state.endDate}
                                                errorText={this.state.errors.name}
                                            />
                                        </div>
                                    </div>
                                    ) : (
                                        <div className="columns">
                                            <div className="column">
                                                <DatePicker
                                                    hintText="Date"
                                                    container="inline"
                                                    fullWidth={true}
                                                    onChange={this.handleStartDateChange}
                                                    name="startDate"
                                                    value={this.state.startDate}
                                                    errorText={this.state.errors.name}
                                                />

                                            </div>
                                        </div>
                                    )}

                            </div>
                            <div className="columns">
                                <div className="column">
                                    <AutoComplete
                                        floatingLabelText="Field"
                                        filter={AutoComplete.caseInsensitiveFilter}
                                        dataSourceConfig={{text: 'text', value: 'value', id:'id'}}
                                        dataSource={this.props.fieldsMenuData}
                                        openOnFocus={true}
                                        fullWidth={true}
                                        onNewRequest={this.handleFieldChange}
                                        name="field"
                                        value={this.state.field}
                                        errorText={this.state.errors.name}
                                    />

                                </div>
                                <div className="column">
                                    <AutoComplete
                                        floatingLabelText="Activity Type"
                                        filter={AutoComplete.caseInsensitiveFilter}
                                        dataSource={typeData}
                                        openOnFocus={true}
                                        fullWidth={true}
                                        onUpdateInput={this.handleTypeChange}
                                        name="type"
                                        value={this.state.type}
                                    />

                                </div>

                            </div>
                            <TextField
                                hintText="MultiLine with rows: 2 and rowsMax: 4"
                                multiLine={true}
                                rows={5}
                                rowsMax={10}
                                floatingLabelText="Description"
                                textareaStyle={{ backgroundColor: '#EEEEEE'}}
                                fullWidth={true}
                                onChange={this.handleDescriptionChange}
                                name="description"
                                value={this.state.description}
                                errorText={this.state.errors.name}
                            /><br />


                        </form>
                    </Dialog>

                </div>
            </div>

        );
    }
}

CreateFieldModal.propTypes = {
    fieldsMenuData: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        fieldsMenuData: state.fields.map((field) => {
            return {
                text: field.name,
                value: (
                    <MenuItem
                        key={field._id}
                        id={field._id}
                        primaryText={field.name}
                    />
                ),
                id: field._id
            }
        })
    }
};

export default connect(mapStateToProps, {SaveTask})(CreateFieldModal);
