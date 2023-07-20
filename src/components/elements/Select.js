import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color, design } from '../../util/util';
import RNPickerSelect from 'react-native-picker-select';
class Select extends React.Component {
    static propTypes = {
        nom: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    label: PropTypes.string.isRequired,
                    value: PropTypes.any.isRequired,
                    icon: PropTypes.any
                }
            )
        ).isRequired,
        icon: PropTypes.shape(
            {
                name: PropTypes.string.isRequired,
                color: PropTypes.string,
                size: PropTypes.number
            }
        ),
        minStyle:PropTypes.bool
    }
    /* static defaultProps = {
        type: 'date',
        design: {
            textInput: {
                padding: 10,
                paddingLeft: 40,
                backgroundColor: 'transparent',
                color: '#333',
                marginBottom: 2,
                marginTop: 2,
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: '#37474f'
            },
            close: { color: 'orange', size: 24 }
        }
    } */
    constructor(props) {
        super(props);
        //set default valeur
        const defaultValue = (typeof this.props.ext != 'undefined') ? this.props.ext : -1;
        //init resukt valeur
        this.props.getValue(defaultValue);
        //init laffichage
        this.state = { valeur: defaultValue }
    }
    render() {
        return (
            <RNPickerSelect
                onValueChange={(value) => {
                    this.setState({ valeur: value });
                    this.props.getValue(value);
                }}
                items={this.props.items}
                value={this.props.ext}
                placeholder={this.props.placeholder}
                useNativeAndroidPickerStyle={false}
                style={this.props.minStyle ? {...styles} : {
                    ...pickerSelectStyles,
                    iconContainer: {
                        top: 20,
                        right: 10,
                    },
                    placeholder: {
                        color: color.mine.textGray,
                        fontSize: 16,
                    },
                }}
                icon={() => {
                    return (this.props.icon) 
                        ? <Icon name={this.props.icon.name} size={1.5} color={this.props.icon.color} />
                        : null
                    ;
                }}
            />
        )
    };
    _getIcon() {
        return (this.state.valeur == 0) ? (<Icon name="face-woman" color={color.mine.primary} size={26} style={styles.fldIcon} />) : (<Icon name="face-man" color={color.mine.primary} size={26} style={styles.fldIcon} />);
    }

}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 14,
        borderColor: color.mine.fieldBorder,
        paddingRight: 30, // to ensure the text is never behind the icon
        paddingLeft: 40, // to ensure the text is never behind the icon
        backgroundColor: color.mine.fieldBg,
        borderBottomWidth: 1, 
        marginBottom: 2, 
        marginTop: 2, 
        borderRadius: 8, 
        borderWidth: 0.5
    },
    inputAndroid: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 14,
        borderColor: color.mine.fieldBorder,
        paddingRight: 30, // to ensure the text is never behind the icon
        paddingLeft: 40, // to ensure the text is never behind the icon
        backgroundColor: color.mine.fieldBg,
        borderBottomWidth: 1, marginBottom: 2, marginTop: 2, borderRadius: 8, borderWidth: 0.5, borderColor: '#ccc'
    }
});

const styles = StyleSheet.create({
    inputAndroid:{ 
        flex: 0, 
        paddingLeft: 10, 
        borderWidth: 0, 
        borderBottomWidth: 0.5, 
        width: 'auto', 
        borderTopRightRadius: 0, 
        borderRadius: 0,
        borderBottomRightRadius: 0, 
        borderRightWidth: 0, 
        backgroundColor: 'transparent', 
        color: '#f00',
        ...design.form.textInputProfil, 
    },
    inputIos:{
        flex: 0, 
        paddingLeft: 10, 
        borderWidth: 0, 
        borderBottomWidth: 0.5, 
        width: 'auto', 
        borderTopRightRadius: 0, 
        borderRadius: 0,
        borderBottomRightRadius: 0, 
        borderRightWidth: 0, 
        backgroundColor: 'transparent', 
        color: '#f00',
        ...design.form.textInputProfil, 
    }
});
export default Select;