import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const PeriodInput = ({value,setValue,editable,label}) => {
  return (
    <View style={[styles.field,!editable ? {opacity : 0.7,marginLeft : 10} : null,label ==="Durée" ? {marginTop : 0,marginLeft : 10} : null]}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.row]}>
            <Ionicons name='timer' color={"gray"} size={20} />
            <TextInput value={value} onChangeText={setValue} editable={editable} style={[styles.input]} keyboardType={"phone-pad"} placeholder='gray' />
        </View>

    </View>
  )
}

export default PeriodInput

const styles = StyleSheet.create({
    field : {
        width : "100%",
        flex : 1,
        borderWidth : 1,
        // height : Platform.OS === "ios" ? 50 : 65,
        // maxHeight : 65,
        padding : 10,
        paddingTop : 15,
        marginTop : 20,
        borderRadius : 5,
        borderColor : "gray",
       
        
        
    },
    fieldReverse : {
        flexDirection : "row-reverse",
        justifyContent : "flex-end"
    },
    row : {
        flexDirection : "row",
        alignItems : "center",

    
    },
    rowBetween : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between"
    },
    label : {
        position : "absolute",
        top  : -10,
        left : 10,
        backgroundColor : "white",
        zIndex : 1,
        paddingHorizontal : 5,
        color : "gray"
    },
    input : {
        color : "black",
        flex : 1,
        marginLeft : 5,
    }
})