import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppModal from './AppModal';
import places from '../utils/json/location.json';
import rpe from '../utils/json/rpe-estime.json';

const PlaceInput = ({type,label,value,setValue}) => {
    const [visible,setVisible] = useState(false);
    const [color,setColor] = useState()
  return (
    <>
        <TouchableOpacity style={[styles.field]} onPress={() => setVisible(true)}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.rowBetween]}>
                {color && <View style={{width : 15,height : 15,backgroundColor : color,borderRadius : 7,marginRight : 5}} />}
                <Text style={[styles.value,!value ? {color : "gray"} : null]}>{value || "Sélectionner"}</Text>
                <Ionicons name='caret-down' color={"gray"} size={20} />
            </View>
        </TouchableOpacity>
        <AppModal visible={visible} setVisible={setVisible} data={type === "place"? places : rpe } setValue={setValue} setColor={setColor}/>

    
    </>
  )
}

export default PlaceInput

const styles = StyleSheet.create({
    field : {
        width : "100%",
        flex : 1,
        borderWidth : 1,
        height : Platform.OS === "ios" ? 50 : 55,
        maxHeight : 55,
        padding : 10,
        paddingTop : 15,
        marginTop : 20,
        borderRadius : 5,
        borderColor : "gray",
        justifyContent : "center"
        
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
    value : {
        color : "black",
        flex : 1
    }
})