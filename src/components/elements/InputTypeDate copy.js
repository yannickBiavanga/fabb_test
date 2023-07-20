import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, View, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color, design } from '../../util/util';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
class InputTypeDate extends React.Component {
    static propTypes = {
        parDefaut: PropTypes.number.isRequired,
        getValue: PropTypes.func.isRequired,
        locale: PropTypes.string,
        type: PropTypes.string,
        label: PropTypes.shape({
            text: PropTypes.string.isRequired,
            design: PropTypes.object.isRequired
        }),
        icon: PropTypes.func,
        design: PropTypes.shape({
            textInput: PropTypes.object,
            close: PropTypes.shape({
                color: PropTypes.string,
                size: PropTypes.number
            })
        })
    }
    static defaultProps = {
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
    }
    constructor(props) {
        super(props);
        //determinons la valeur par defaut
        const defaultValue = (this.props.type == 'date')
            ? new Date(this.props.parDefaut).getTime() - this._getTimeInDate(new Date(this.props.parDefaut))
            : new Date(this.props.parDefaut).getTime();
        //initialiser la valeur de sortie
        this.props.getValue(defaultValue);
        //initialiser laffichage
        this.state = {
            valeur: new Date(defaultValue),
            isOpen: false
        }
    }

    render() {
        return this.state.isOpen
            ? (
                <View style={[this.props.design.container]}>
                    {this.displayLbl()}
                    <View style={{ position: 'relative' }}>
                        {this.displayIcon()}
                        <TextInput
                            accessibilityLabel={this.props.label.text}
                            placeholderTextColor="#ccc"
                            style={{ ...this.props.design.textInput, color: '#000000' }}
                            editable={false} value={(this.props.type == 'date')
                                ? moment.utc(this.state.valeur).utcOffset('+00:00').format('DD/MM/YYYY')
                                : moment.utc(this.state.valeur).utcOffset('+00:00').format('DD/MM/YYYY, HH:mm')} />
                        <TouchableOpacity
                            style={styles.close_btn}
                            onPress={() => { this.setState({ isOpen: false }); }}>
                            <Icon name="close" color="red" size={22} /></TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: '#fff0', borderRadius: 5, position: 'relative' }}>
                        <DatePicker
                            mode={this.props.type}
                            date={this.state.valeur}
                            onDateChange={(value) => {
                                //get cDate value
                                const theDate = (new Date(value)).getTime() - this._getTimeInDate(value);
                                this.props.getValue(theDate);
                                //actualser laffichage
                                this.setState({ valeur: value });
                            }}
                            locale="fr-fr"
                            timeZoneOffsetInMinutes={0}
                            androidVariant={Platform.OS != "android" ? "iosClone" : "nativeAndroid"}
                            fadeToColor="none"
                            style={{ padding: 0, margin: 0, marginTop: 0 }} />
                    </View>
                </View>
            ) : (
                <TouchableOpacity onPress={() => { this.setState({ isOpen: true }); }} style={[this.props.design.container]}>
                    {this.displayLbl()}
                    <View>
                        {this.displayIcon()}
                        <TextInput
                            accessibilityLabel={this.props.label.text}
                            placeholderTextColor="#cccccc"
                            style={{ ...this.props.design.textInput, color: '#000000' }}
                            editable={false}
                            value={(this.props.type == 'date')
                                ? moment.utc(this.state.valeur).utcOffset('+00:00').format('DD/MM/YYYY')
                                : moment.utc(this.state.valeur).utcOffset('+00:00').format('DD/MM/YYYY, HH:mm')} />
                    </View>
                </TouchableOpacity>
            )
    }

    displayIcon() {
        return (typeof this.props.icon == 'undefined' || this.props.icon == null) ? null : this.props.icon();
    }
    displayLbl() {
        return (typeof this.props.label == 'undefined' || this.props.label == null)
            ? null
            : <Text style={this.props.label.design}>{this.props.label.text}</Text>
    }
    displayTextBox() {

    }
    _getTimeInDate(mDate) {
        return (this.props.type !== 'date')
            ? 0
            : (new Date(mDate).getUTCHours() * 3600 + new Date(mDate).getUTCMinutes() * 60) * 1000;
    }

    inputText() {
        return <TextInput
            accessibilityLabel={this.props.label.text}
            placeholderTextColor="#cccccc"
            style={{ ...this.props.design.textInput, color: '#000000' }}
            editable={false} value={(this.props.type == 'date')
                ? moment.utc(this.state.valeur).utcOffset('+00:00').format('DD/MM/YYYY')
                : moment.utc(this.state.valeur).utcOffset('+00:00').format('DD/MM/YYYY, HH:mm')} />
    }
}
const styles = StyleSheet.create({
    fldIcon: design.form.icon,
    textInput: design.form.textInput,
    close_btn: { position: 'absolute', top: '21%', right: '3%', zIndex: 100, padding: 5, backgroundColor: '#0000000' }
});
export default InputTypeDate;