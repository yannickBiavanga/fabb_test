import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import {design} from '../../util/util';
class Label extends React.Component{
    static propTypes={
        text:PropTypes.string.isRequired
    }
    constructor(props){
        super(props);
    }
    render(){
        return(
            
            <Text style={styles.frmLbl}>this.props.text</Text>
        )
    };
}
const styles = StyleSheet.create({
    frmLbl:design.form.label
});
export default Label;