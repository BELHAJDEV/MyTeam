import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommentCmp = ({label,value,setValue}) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
        <TextInput value={value} onChangeText={setValue} style={styles.input} placeholder='comment..' placeholderTextColor={"gray"} />
    </View>
  )
}

export default CommentCmp

const styles = StyleSheet.create({
    field : {
        width : "100%",
        flex : 1,
        borderWidth : 1,
        height : Platform.OS === "ios" ? 50 : 70,
        maxHeight : 70,
        padding : 10,
        paddingTop : 15,
        marginTop : 20,
        borderRadius : 5,
        borderColor : "gray",
        marginBottom : 20
        
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
    }
})