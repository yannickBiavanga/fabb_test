import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput} from 'react-native';
class InputTypeText extends React.Component{
    static propTypes={
        items:PropTypes.arrayOf(
            PropTypes.shape(
                {
                    label:PropTypes.string.isRequired,
                    txt:PropTypes.string,
                    placeholder:PropTypes.string
                }
            )
        )
    }
    constructor(props){
        super(props);
        this.state={
            txt:'',
            placeholder:''
        }
    }
    render(){
        return(
            <TextInput 
            accessibilityLabel={this.props.label}
            placeholderTextColor="#ccc"
            placeholder={(typeof this.props.placeholder=='undefined')?null:this.props.placeholder} />
        )
    };
    componentDidMount(){
        /* if(typeof this.props.ext!='undefined')this.setState({valeur:this.props.ext});
        console.log(this.props.ext); */
    }
    _displayTxt(){
        if(typeof this.props.txt.length>0) this.setState({txt:this.props.txt})
    }

}
const styles = StyleSheet.create({
});
export default InputTypeText;