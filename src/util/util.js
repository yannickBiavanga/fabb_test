import moment, { weekdaysShort, monthsShort } from 'moment';
import {StyleSheet} from 'react-native';
moment.updateLocale(
    'fr',
    {
        months:['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthsShort:['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Spt', 'Oct', 'Nov', 'Dec'],
        weekdaysShort:['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    }
)
export function getDate(cTime, format){
    if(typeof cTime=="number"){
        let cDate=new Date(cTime*1000);
        // if(typeof format=="undefined")return moment(cDate).format('ddd, DD MMM YYYY');
        if(typeof format=="undefined")return moment.utc(cDate).utcOffset('+00:00').format('ddd, DD MMMM YYYY');
        else return moment(cDate).format(format);
    }
    return cTime;
}

export function getTime(cTime, format){
    if(typeof cTime=="number")
    if(typeof format=="undefined"){
        let cDate=new Date(cTime*1000);
        // return moment(cDate).format('HH:mm');
        return moment.utc(cDate).utcOffset('+00:00').format('HH:mm');
    }
    return cTime;
}

export function removeTime(mDate){
    return (new Date(mDate)).getTime()-((new Date(mDate)).getUTCHours()*3600+(new Date(mDate)).getUTCMinutes()*60)*1000
}
export const color={

    darkBlack:'transparent',
    darkDarkBlack:'transparent',
    darkBorder:'#aaa',
    lightBorder:'#29282d',
    gray:'#ccc',
    lightBlack:'transparent',
    lightLightBlack:'transparent',
    text:'#fff',
    darkText:'#999',
    textTagActif:"#000",
    textTagInactif:"#999",

    dark:{
        lightLightBlack:'#4b4b57',
        darkDarkBlack:'#28272c',
        darkBlack:'#2d2c32',
        lightBlack:'#2f2e34',
        darkBorder:'rgb(25, 25, 28)',
        lightBorder:'#29282d',
        black:'#333',
        gray:'#ccc',
        text:'#fff',
        darkText:'#aaa',
        textTagActif:"#fff",
        textTagInactif:"#fbfbfb"
    },
    darkMe:{
        primary:{
            main:'#2c3b41',
            light:'#ecf0f1',
            dark:'#2c3b41',
        },
        secondary:{
            main:'#398439',
            light:'#75aff',
            dark:'#004ecb',

        },
        contrast:{
            divider:'#ecf0f1',
            grayLight:'#bdbdbd',
            grayDark:'#757575'
        }
    },
    me:{
        primary:{
            main:'#2c3b41',
            light:'#62727b',
            dark:'#102027'
        },
        secondary:{
            main:'#65ba69',
            light:'#97ed98',
            dark:'#32893d'
        },
        constrast:{
            divider:'#ecf0f1',
            grayLight:'#bdbdbd',
            grayDark:'#757575',
            fieldBg:'transparent',
            fieldBorder:'#37474f'
        }
    },
    mine:{
        primary:'#FFA726',
        light:'#ffd95b',
        dark:'#ff5722',
        // dark:'#d23f1d',
        dark_1:'#c77800',
        secondary:'#40C4FF',
        sLight:'#82f7ff',
        sDark:'#0094cc',
        divider:'#f0f0f0',
        divider_1:'#ecf0f1',
        grayLight:'#bdbdbd',

        grayDark:'#757575',
        fieldBg:'#fffa',
        // fieldBorder:'#37474f',
        fieldBorder:'#aaa',

        textLight:'#fff',
        textDark:'#333',
        textBlack:'#000',
        textGray:'#ccc',
        text:{
            light:{white:'#ffffff', noWithe:'#cccccc'},
            dark:{black:'#000000', noBlack:'#333333'}
        }

    },

    color:{
        main:{
            primary:{
                main:'#FFA726',
                light:'#ffd95b',
                dark:'#ff5722',
                dark_1:'#c77800'
            },
            secondary:{
                main:'#40C4FF',
                light:'#82f7ff',
                dark:'#0094cc'
            },
            contrast:{
                divider:'#ecf0f1',
                grayLight:'#bdbdbd',
                grayDark:'#757575'
            },
            fieldBg:'transparent',
            fieldBorder:'#37474f',
            btnBorder:'',
            TextLight:'#fff',
            TextDark:'#333',
        }
    }


}

export const design={

    form:{
        view:{position:'relative'},
        /* textInput:{padding:10, paddingVertical:8, paddingLeft:40, backgroundColor:'#fffa', color:'#333', marginBottom:2, marginTop:2, borderRadius: 8, borderRadius: 0, borderWidth:0, borderBottomWidth:1, borderColor:'#37474f', borderColor:'#aaa'}, */
        textInputProfil:{
            padding:10, 
            paddingVertical:12,
            // paddingLeft:40,
            paddingLeft:10,
            // backgroundColor:'#ffffffa',
            backgroundColor:'transparent',
            color:'#333333',
            marginBottom:2,
            marginTop:2, 
            // borderRadius: 8,
            borderRadius: 0,
            borderBottomWidth:0.5,
            // borderBottomWidth:1,
            // borderColor:'#37474f',
            borderColor:'#aaaaaa',
            fontSize:18
        },
        textInput:{
            flex:1, 
            padding:10, 
            paddingLeft:40,
            paddingVertical:14,
            backgroundColor:'#fff', 
            marginBottom:2, 
            marginTop:2, 
            borderRadius: 8, 
            borderWidth:0.5, 
            borderColor:'#cccccc', 
            borderBottomWidth:1,
            color:'#333333',
            fontSize:16
        },
        label:{fontWeight:'300', marginTop:8, fontSize:12, color:'#000000', textTransform:'uppercase'},
        icon:{position:'absolute', top:18, left:5, zIndex:50},
        btnInput: {
            borderRadius: 5,
            backgroundColor: color.mine.dark,
            borderColor: color.mine.dark_1,
            borderWidth: 0.5,
            margin: 0, 
            padding: 0,
        },
    },
    view_main_indicator:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#00000033",
        position:'absolute',
        zIndex:200,
        top:0, bottom:0, left:0, right:0
    }

};