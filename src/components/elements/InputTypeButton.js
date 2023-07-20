import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
class InputTypeButton extends React.Component{
    static propTypes={
        label:PropTypes.string.isRequired,
        design:PropTypes.object
    }
    static defaultProps = {
        label:'Confirm',
        design:{
            input:{justifyContent:'center', alignItems:'center', paddingVertical:12, backgroundColor:'orange'}, 
            label:{color:'#333'}
        }
    }

    constructor(props){
        super(props);
    }

    render(){

        return(
            <TouchableOpacity 
                accessibilityLabel={this.props.label}
                onPress={()=>{this.props.onSubmit();}}
                style={{justifyContent:'center', alignItems:'center', paddingVertical:12, backgroundColor:'orange', ...this.props.design.input}}>
                <Text style={{textTransform:'uppercase', fontWeight:'600', ...this.props.design.label}}>{this.props.label}</Text>
            </TouchableOpacity>
        )
    };

}
const styles = StyleSheet.create({
});
export default InputTypeButton;