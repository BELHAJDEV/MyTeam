import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const DateTimeInput = ({type,setValue}) => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
  return (
    <>
    <TouchableOpacity style={[styles.field,type === "date" ? {marginRight : 10} : null]} onPress={() => setOpen(true)}>
        <Text style={styles.label}>{type === "time" ? "à *" : "Date : *"}</Text>
        <View style={[styles.rowBetween,type === "time" ? styles.fieldReverse : null]}>
            <Text style={[styles.value,type === "time" ? {marginLeft : 5} : null]}>{moment(date).format(type === "time" ? "hh:mm a" : "DD/MM/YYYY")}</Text>
            <Ionicons name={type === "time" ? "time-outline" : "calendar"} size={20} color={"gray"}/>
        </View>
    
      </TouchableOpacity>
      <DatePicker
        mode={type}
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
            setOpen(false)
            setDate(date);
            setValue(date)
        }}
        onCancel={() => {
            setOpen(false)
        }}
        />
    </>
    
  )
}

export default DateTimeInput

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
    
    }
})