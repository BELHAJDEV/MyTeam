import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PlayersModal from './PlayersModal';
import players from '../utils/json/players.json';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlayersCmp = ({label,selectedPlayers,setSelectedPlayers}) => {
    const [visible,setVisible] = useState(false);

  return (
    <>
        <View style={[styles.field]} >
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.rowBetween]}>
               
                
                {selectedPlayers.length === 0 ? 
                    <Text style={[{color : "gray"}]}>Sélectionner</Text> :
                    <ScrollView horizontal={true} >
                        {selectedPlayers?.map((el,index) => (
                            <View key={index} style={[styles.row,styles.player]}>
                                <Image source={{uri : el?.img}} style={styles.img} />
                                <Text style={{color : "black",fontSize : 12}}>{el?.nom}</Text>
                            </View>
                        ))}
                    </ScrollView>
                }
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Ionicons name='caret-down' color={"gray"} size={20} />

                </TouchableOpacity>
            </View>
        </View>
        <PlayersModal visible={visible} setVisible={setVisible} data={players} setValue={setSelectedPlayers} />
    </>
  )
}

export default PlayersCmp

const styles = StyleSheet.create({
    field : {
        width : "100%",
        flex : 1,
        borderWidth : 1,
        // height : Platform.OS === "ios" ? 50 : 55,
        // maxHeight : 55,
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
    },
    img : {
        borderRadius : 15,
        width : 30,
        height : 30,
        marginRight : 5
    },
    player : {
        backgroundColor : "orange",
        borderRadius : 10,
        marginRight : 15,
        paddingHorizontal : 5,
        paddingVertical : 2
    }
})