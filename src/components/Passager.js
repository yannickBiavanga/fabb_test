import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Select from './elements/Select';
import InputTypeDate from './elements/InputTypeDate';
import {color, design} from '../util/util';
import moment from 'moment';
class Passager extends React.Component{
    static propTypes={
        nbr:PropTypes.number.isRequired,
        values:PropTypes.arrayOf(
            PropTypes.shape(
                {
                    id:PropTypes.number,
                    sexe:PropTypes.number.isRequired, 
                    nom:PropTypes.string.isRequired, 
                    prnom:PropTypes.string.isRequired,
                    ddn:PropTypes.number.isRequired, 
                    tel:PropTypes.string.isRequired,
                    cin:PropTypes.string.isRequired
                }
            )
        ).isRequired
    }    
    constructor(props){
        super(props);
        this.passager=this.props.values[this.props.nbr];
    }
    render(){
        return(
            <View>
                <Text style={styles.frmLbl}>Sexe</Text>
                <Select
                    placeholder={{label: '-- Sexe --',  value: -1}}
                    items={[{label:'Homme', value:1}, {label:'Femme', value:0}]}
                    ext={this.passager.sexe}
                    minStyle={false}
                    getValue={(value)=>{this.passager.sexe=value;}} />
                <Text style={styles.frmLbl}>Nom</Text>
                <View style={styles.view}>
                    <Icon name="id-card" color={color.mine.primary} size={24}  style={styles.fldIcon} />
                    <TextInput
                        accessibilityLabel="Entrez votre nom"
                        placeholderTextColor={color.mine.textGray}
                        autoCapitalize="characters"
                        style={styles.textInput}
                        defaultValue={this.passager.nom} 
                        placeholder="MBOTA" 
                        onChangeText={(value)=>{this.passager.nom=value; this.props.getValues(this.passager);}} />
                </View>
                <Text 
                    style={styles.frmLbl}>Prénom</Text>
                <View style={styles.view}>
                    <Icon name="id-card" color={color.mine.primary} size={24}  style={styles.fldIcon} />
                    <TextInput
                        accessibilityLabel="Entrez votre prénom"
                        placeholderTextColor={color.mine.textGray}
                        autoCapitalize="words"
                        style={styles.textInput}
                        defaultValue={this.passager.prnom} 
                        placeholder="Luis Carlos" 
                        onChangeText={(value)=>{this.passager.prnom=value; this.props.getValues(this.passager);}} />
                </View>
                <InputTypeDate
                    parDefaut={this.passager.ddn}
                    getValue={(value)=>{this.passager.ddn=value/1000}}
                    label={{text:"Date de naissance", design:styles.frmLbl}}
                    icon={()=>(<Icon name="calendar" color={color.mine.primary} size={24} style={styles.fldIcon} />)}
                    design={{textInput:styles.textInput}} />
                <Text 
                    style={styles.frmLbl}>Téléphone</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={[styles.view]}>
                        <Icon name="phone" color={color.mine.primary} size={24} style={[styles.fldIcon, {zIndex:100}]} />
                        <TextInput
                            accessible={false}
                            editable={false} 
                            value="+242" 
                            style={{ 
                                ...styles.textInput,
                                flex:0, 
                                width:'auto', 
                                borderTopRightRadius:0, 
                                borderBottomRightRadius:0, 
                                borderRightWidth:0, 
                                backgroundColor:'#ccc', 
                                color:'#555', 
                                textShadowColor:'#fff', 
                                textShadowOffset:{width:0, height:1}, 
                                textShadowRadius:1,fontSize:22
                            }} />
                    </View>
                    <TextInput
                        accessibilityLabel="Entrez votre téléphone"
                        placeholderTextColor={color.mine.textGray}
                        inputMode="tel"
                        keyboardType="phone-pad"
                        maxLength={15}
                        defaultValue={this.passager.tel} 
                        style={[styles.textInput, {flex:1, borderTopLeftRadius:0, borderBottomLeftRadius:0, borderLeftWidth:0, paddingLeft:10}]} 
                        placeholder="012345678" 
                        onChangeText={(value)=>{this.passager.tel=value; this.props.getValues(this.passager);}}  />
                </View> 
                {/* <Text 
                    style={styles.frmLbl}>N° pièce d'identité</Text>
                <TextInput
                    accessibilityLabel="Entrez votre CIN"
                    placeholderTextColor={color.mine.textGray}
                    style={styles.textInput} 
                    placeholder="XX XXXX XXXXXXX" 
                    onChangeText={(value)=>{this.passager.cin=value; this.props.getValues(this.passager);}} />
                <View 
                    style={{flexDirection:'row'}}>
                    <Text style={{color:'red', fontSize:10}}> (*) </Text>
                    <Text style={styles.infoTxt}>Votre passeport ou votre carte d'identité nationale valide</Text>
                </View> */}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    textInput:design.form.textInput, 
    infoTxt:{flex:1, fontSize:10, /* textShadowOffsetWidth:0, texthadowOffsetHeight:2, shadowRadius:1, shadowOpacity:1.0, shadowColor:'#000' */},
    frmLbl:design.form.label,
    view:design.form.view,
    fldIcon:design.form.icon
});
export default Passager;