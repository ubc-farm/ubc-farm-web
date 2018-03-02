/**
 * Created by Xingyu on 6/2/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import CircularProgress from 'material-ui/Progress';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/Menu';
//import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField'
//import Toggle from 'material-ui/Toggle';
import Switch from 'material-ui/Switch';
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
class NewTaskModal extends Component {
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
        if(this.props.isFieldProvided){
            this.setState({field: this.props.field._id});
        }

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
            type: '',
            multiDay: false,
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
            );
            this.setState({done: true, loading: false});
            this.handleClose();
        }
    };

    render() {
        const actions = [
            <Button
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <Button
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

                    <Button label="New Task" onTouchTap={this.handleOpen} style={this.props.buttonStyle} />
                        {/*labelStyle={{color: '#FFFFFF'}} style={{}} backgroundColor={'#8AA62F'} hoverColor={"#a4c639"}*/}

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
                                You can also add tasks from the {this.props.isFieldProvided ?
                                (<Link to="/tasks">Tasks</Link> ):(<Link to="/fields">Fields</Link>)} tab!
                            </div>
                        </article>
                        <form>
                            <Switch
                                checked={this.state.multiDay}
                                onChange={this.toggleDay}
                                value="multiDay"
                            />
                            <div style={{marginBottom:'5px'}}>
                                {this.state.multiDay ?
                                    (
                                    <div className="columns" style={{margin:0}}>
                                        <div className="column">
                                            <TextField
                                                id="startDate"
                                                label="Start Date"
                                                type="date"
                                                defaultValue=""
                                                name="startDate"
                                                value={this.state.startDate}
                                                onChange = {this.handleStartDateChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                        </div>
                                        <div className="column">
                                            <TextField
                                                id="endDate"
                                                label="Finish Date"
                                                type="date"
                                                defaultValue=""
                                                name="endDate"
                                                value={this.state.endDate}
                                                onChange = {this.handleEndDateChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    ) : (
                                        <div className="columns">
                                            <div className="column">
                                                <TextField
                                                    id="date"
                                                    label="Date"
                                                    type="date"
                                                    defaultValue=""
                                                    name="startDate"
                                                    value={this.state.startDate}
                                                    onChange = {this.handleStartDateChange}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    fullWidth={true}
                                                />

                                            </div>
                                        </div>
                                    )}

                            </div>
                            <div className="columns">

                                    {this.props.isFieldProvided ?
                                        (
                                            <div></div>

                                        ) : (
                                            <div className="column">
                                                <TextField
                                                    select
                                                    floatingLabelText="Field"
                                                    hintText="Select Field"
                                                    name="field"
                                                    autoWidth={false}
                                                    value={this.state.field}
                                                    onChange={this.handleFieldChange}
                                                    errorText={this.state.errors.name}
                                                >
                                                    {this.props.fieldsMenuData.map((text,value) => (
                                                        value
                                                    ))}
                                                </TextField>
                                            </div>




                                        )}



                                <div className="column">
                                    <TextField
                                        select
                                        floatingLabelText="Activity Type"
                                        hintText="Select Activity Type"
                                        name="type"
                                        autoWidth={false}
                                        value={this.state.type}
                                        onChange={this.handleTypeChange()}
                                        errorText={this.state.errors.type}
                                    >
                                        {typeData.map((text,value) => (
                                            value
                                        ))}
                                    </TextField>

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

NewTaskModal.propTypes = {
    fieldsMenuData: PropTypes.array.isRequired,
    isFieldProvided: PropTypes.bool.isRequired,
    buttonStyle: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, {SaveTask})(NewTaskModal);
