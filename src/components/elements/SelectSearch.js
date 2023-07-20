import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color, design } from '../../util/util';
// import RNPickerSelect from 'react-native-picker-select';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

class Select extends React.Component {
    /* static propTypes = {
        nom: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    label: PropTypes.string.isRequired,
                    value: PropTypes.any.isRequired,
                    icon: PropTypes.any
                }
            )
        )
    } */
    constructor(props) {
        super(props);
        //set default valeur
        const defaultValue = (typeof this.props.ext != 'undefined') ? this.props.ext : -1;
        //init resukt valeur
        this.props.getValue(defaultValue);
        //init laffichage
        this.state = { valeur: defaultValue, selectedItem: defaultValue }
    }
    render() {
        /* return(
            <RNPickerSelect
                onValueChange={(value) => {
                    this.setState({valeur:value}); 
                    this.props.getValue(value);
                }}
                items={this.props.items}
                value={this.props.ext}
                placeholder={this.props.placeholder}
                useNativeAndroidPickerStyle={false}
                style={(typeof this.props.minStyle!='undefined')?styles:pickerSelectStyles} 
                icon={() => {
                    return <Icon name="calendar" size={1.5} color="gray" />;
                }} 
            />
        ) */
        return (
            <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={false}
                initialValue={this.props.ext} // or just '2'
                onSelectItem={(value) => {
                    this.setState({ selectedItem: value });
                    this.props.getValue(value);
                }}
                dataSet={this.props.items}
            />
        )
    };
    _getIcon() {
        return (this.state.selectedItem == 0) ? (<Icon name="face-woman" color={color.mine.primary} size={26} style={styles.fldIcon} />) : (<Icon name="face-man" color={color.mine.primary} size={26} style={styles.fldIcon} />);
    }

}
/* const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0,
      borderColor: color.mine.fieldBorder,
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      paddingLeft: 40, // to ensure the text is never behind the icon
      backgroundColor:color.mine.fieldBg
      , borderRadius: 0, borderWidth:0, borderBottomWidth:1,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0,
      borderColor: color.mine.fieldBorder,
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      paddingLeft: 40, // to ensure the text is never behind the icon
      backgroundColor:color.mine.fieldBg
      , borderRadius: 0, borderWidth:0, borderBottomWidth:1,
    } 
}); */
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderColor: color.mine.fieldBorder,
        borderRadius: 4,
        paddingRight: 30, // to ensure the text is never behind the icon
        paddingLeft: 40, // to ensure the text is never behind the icon
        backgroundColor: color.mine.fieldBg,
        borderRadius: 0, borderWidth: 0, borderBottomWidth: 1,
        borderBottomWidth: 1, backgroundColor: '#fff', marginBottom: 2, marginTop: 2, borderRadius: 8, borderWidth: 0.5, borderColor: '#ccc'
    },
    inputAndroid: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: color.mine.fieldBorder,
        borderRadius: 8,
        paddingRight: 30, // to ensure the text is never behind the icon
        paddingLeft: 40, // to ensure the text is never behind the icon
        backgroundColor: color.mine.fieldBg,
        borderBottomWidth: 1, backgroundColor: '#fff', marginBottom: 2, marginTop: 2, borderRadius: 8, borderWidth: 0.5, borderColor: '#ccc'
    }
});

const styles = StyleSheet.create({

    inputAndroid: {
        fontSize: 16,
        color: '#000',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: color.mine.fieldBorder,
        borderRadius: 8,
        paddingRight: 30, // to ensure the text is never behind the icon
        paddingLeft: 40, // to ensure the text is never behind the icon
        backgroundColor: color.mine.fieldBg,
        borderBottomWidth: 1, backgroundColor: 'red', marginBottom: 2, marginTop: 2, borderRadius: 8, borderWidth: 0.5, borderColor: '#ccc',
        borderWidth: 0, paddingLeft: 10, borderBottomWidth: 0.5, borderRadius: 0, backgroundColor: 'transparent'
    }
});
// export default SelectSearch;
export default Select;