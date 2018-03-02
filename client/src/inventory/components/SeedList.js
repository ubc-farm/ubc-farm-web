/**
 * Created by Xingyu on 6/29/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogItemModel from './modals/log-modal';
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
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class SeedList extends Component {
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
        this.fieldNameFromId = this.fieldNameFromId.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);
        this.typeTransformer = this.typeTransformer.bind(this);
    }

    //returns seed object
    fieldNameFromId(seedId){
        let seed = this.props.seeds.find((seed) => {
            return seed._id === seedId;
        });
        return seed;
    }

    dateTransformer(dateString){
        let d = new Date(dateString);
        let options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric"
        };
        let fullDate = d.toLocaleTimeString("en-us", options);
        let components = fullDate.split(",");
        return components[0] + "," + components[1] +  "," + components[2];

    }

    typeTransformer(typeString){
        switch(typeString){
            case "seeding":
                return "\u{1F331}" + " " + typeString;
                break;
            case "irrigation":
                return "\u{1F4A7}" + " " + typeString;
                break;
            case "pest-control":
                return "\u{1F41C}" + " " + typeString;
                break;
            case "transplanting":
                return "\u{1F33F}" + " " + typeString;
                break;
            case "soil-sampling":
                return "\u{1F52C}" + " " + typeString;
                break;
            case "scouting-harvest":
                return "\u{1F4CB}" + " " + typeString;
                break;
            case "scouting-pests":
                return "\u{1F4CC}" + " " + typeString;
                break;
            case "fertilizing":
                return "\u{1F4A9}" + " " + typeString;
                break;
            default:
                return typeString;
                break;
        }
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
                            <TableHeaderColumn tooltip="Sort by Crop" style={{verticalAlign: 'middle'}}>Crop</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Variety" style={{verticalAlign: 'middle'}}>Variety</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Weight" style={{verticalAlign: 'middle'}}>Weight</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Unit" style={{verticalAlign: 'middle'}}>Unit</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Product Name" style={{verticalAlign: 'middle'}}>Name</TableHeaderColumn>
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
                        {this.props.seeds.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.crop}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.variety}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.weight}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.unit}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.quantity}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.product}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.store}</TableRowColumn>
                                <TableRowColumn style={{verticalAlign: 'middle'}}>{item.price}</TableRowColumn>

                                <TableRowColumn style={{verticalAlign: 'middle'}}>
                                    <div className="columns">
                                        <div className="column">
                                            Delete

                                        </div>
                                        <div className="column">
                                            <LogItemModel item={item} inventory="seeds"/>
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
                            <TableHeaderColumn tooltip="Sort by Crop" style={{verticalAlign: 'middle'}}>Crop</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Variety" style={{verticalAlign: 'middle'}}>Variety</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Weight" style={{verticalAlign: 'middle'}}>Weight</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Unit" style={{verticalAlign: 'middle'}}>Unit</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Quantity" style={{verticalAlign: 'middle'}}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Product Name" style={{verticalAlign: 'middle'}}>Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Store" style={{verticalAlign: 'middle'}}>Store</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sort by Price" style={{verticalAlign: 'middle'}}>Price</TableHeaderColumn>
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
        );
    }
}

SeedList.propTypes = {
    seeds: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seeds: state.seeds,
    }
};

export default connect(mapStateToProps)(SeedList);