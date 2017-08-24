/**
 * Created by Xingyu on 8/23/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
class EquipmentSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItem: {},
        };
        this.handleUpdateInput = this.handleUpdateInput.bind(this);

    };

    handleUpdateInput(value){
        this.setState({
            selectedItem: value,
        });
    };

    render() {
        return (
            <div>
                <AutoComplete
                    floatingLabelText="Item"
                    hintText="Select an Item"
                    fullWidth={true}
                    dataSource={this.props.equipments}
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSourceConfig={{text: 'name', value: '_id'}}
                    onUpdateInput={this.handleUpdateInput}
                />
            </div>
        );
    }
}

EquipmentSelector.propTypes = {
    equipments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        equipments: state.equipments,
    }
};

export default connect(mapStateToProps) (EquipmentSelector);