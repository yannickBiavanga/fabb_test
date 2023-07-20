import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {color, design} from '../../util/util';
import InputTypeDate from './InputTypeDate';

class InputClient extends React.Component{
    static propTypes={
        values:PropTypes.shape(
            {
                sexe:PropTypes.number.isRequired, 
                nom:PropTypes.string.isRequired, 
                prnom:PropTypes.string.isRequired,
                ddn:PropTypes.number.isRequired, 
                tel:PropTypes.string.isRequired,
                cin:PropTypes.string.isRequired
            }
        ).isRequired
    }    
    constructor(props){
        super(props);
        this.client=this.props.values;
    }
    render(){
        return(
            <View style={{flex:1}}>
                <Text 
                    style={styles.frmLbl}>Votre nom:</Text>
                <View style={styles.view}>
                    {/* <Icon name="id-card" color={color.mine.primary} size={24}  style={styles.fldIcon} /> */}
                    <TextInput
                        accessibilityLabel="Entrez votre nom"
                        placeholderTextColor={color.mine.textGray}
                        autoCapitalize="characters"
                        style={[styles.textInput, { borderWidth:0, paddingLeft:10, borderBottomWidth:0.5, borderRadius:0}]} 
                        placeholder="MBOTA" 
                        onChangeText={(value)=>{this.props.values.nom=value; this.props.getValues(this.client);}} />
                </View> 
                <Text 
                    style={styles.frmLbl}>Votre pr&eacute;nom:</Text>
                <View style={[styles.view]}>
                    <TextInput
                        accessibilityLabel="Entrez votre prénom"
                        placeholderTextColor={color.mine.textGray}
                        autoCapitalize="words"
                        style={[styles.textInput, { borderWidth:0, paddingLeft:10, borderBottomWidth:0.5, borderRadius:0}]} 
                        placeholder="Luis Carlos" 
                        onChangeText={(value)=>{this.props.values.prnom=value; this.props.getValues(this.client);}} />
                </View>
                <InputTypeDate
                    getValue={(value)=>{this.props.values.ddn=value;}}
                    label={{text:"Date de naissance", design:styles.frmLbl}}
                    parDefaut={(new Date()).getTime()}
                    design={{textInput:{borderWidth:0, paddingLeft:10, borderBottomWidth:0.5, borderRadius:0}}} />
                <Text 
                    style={styles.frmLbl}>Votre t&eacute;l&eacute;phone</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={[styles.view]}>
                        {/* <Icon name="phone" color={color.mine.primary} size={24} style={[styles.fldIcon, {zIndex:100}]} /> */}
                        <TextInput 
                            editable={false} 
                            value="+242" 
                            style={[styles.textInput, {flex:0, paddingLeft:10, borderWidth:0, borderBottomWidth:0.5, width:'auto', borderTopRightRadius:0, borderRadius:0, borderBottomRightRadius:0, borderRightWidth:0, backgroundColor:'transparent', color:'#000', fontSize:20}]} />
                    </View>
                    <TextInput
                        accessibilityLabel="Entrez votre téléphone"
                        placeholderTextColor={color.mine.textGray}
                        inputMode="tel"
                        keyboardType="phone-pad"
                        maxLength={15} 
                        style={[styles.textInput, {flex:1, paddingLeft:0, borderWidth:0, borderBottomWidth:0.5, borderRadius:0, borderTopLeftRadius:0, borderBottomLeftRadius:0, borderLeftWidth:0, paddingLeft:10}]} 
                        placeholder="012345678" 
                        onChangeText={(value)=>{this.props.values.tel=value; this.props.getValues(this.client);}}  />
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    textInput:design.form.textInput, 
    infoTxt:{flex:1, fontSize:10/* , textShadowOffsetWidth:0, texthadowOffsetHeight:2, shadowRadius:1, shadowOpacity:1.0, shadowColor:'#000' */},
    frmLbl:design.form.label,
    view:design.form.view,
    fldIcon:design.form.icon
});
export default InputClient;