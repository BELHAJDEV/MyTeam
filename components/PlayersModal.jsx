import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';


const PlayersModal = ({visible,setVisible,data,setValue}) => {

    const [players,setPlayers] = useState([]);
    const [playersNom,setPlayersNom] = useState([]);

    const HandleSelection = (label,obj) => {

        if(playersNom.includes(label)){
            let array = playersNom.filter(e => e!= label);
            let array2 = players.filter(e => e.nom!= obj.nom);
            setPlayersNom(array);
            setValue(array2);
            setPlayers(array2);

        }else{
            setPlayersNom([...playersNom,label]);
            setValue([...players,obj])
            setPlayers([...players,obj])

        }

        
    }
  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
    <TouchableOpacity style={styles.container} onPress={() => setVisible(false)}>
        <Text style={styles.blur} />
        <View style={styles.modalStyle}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setVisible(false)}>
                <Ionicons name='close' color={"black"} size={23} />
            </TouchableOpacity>
            <ScrollView>
                {data.map((el,index) => (
                    <TouchableOpacity key={index} 
                     style={[styles.element,playersNom.includes(el?.nom) ? {backgroundColor : "#eee"} :null]} 
                        onPress={() => {
                            HandleSelection(el.nom,el)

                        }}>
                        {el?.img && <Image source={{uri : el?.img}} style={styles.img} />}
                        {el.color && <View style={{width : 15,height : 15,backgroundColor : el?.color,borderRadius : 7,marginRight : 5}} />}
                        <Text style={{color : "black"}}>{el?.nom}</Text>
                    </TouchableOpacity>
                ))}
                
            </ScrollView>
        </View>
    </TouchableOpacity>
</Modal>
  )
}

export default PlayersModal

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    },
    blur : {
        width : "100%",
        height : "100%",
        position : "absolute",
        backgroundColor : "gray",
        opacity : 0.4
    },
    modalStyle : {
        width : "90%",
        maxHeight : "50%",
        padding : 10,
        backgroundColor : "white",
        borderRadius : 10

    },
    closeBtn : {
        backgroundColor : "#eee",
        width : 30,
        height : 30,
        borderRadius : 20,
        alignItems : "center",
        justifyContent : "center",
        alignSelf : "flex-end",
        position : "absolute",
        top : - 10,
        right  : -10
    },
    element : {
        padding : 10,
        marginTop : 10,
        flexDirection : "row",
        alignItems : "center",
        borderRadius : 5

    },
    img : {
        borderRadius : 15,
        width : 30,
        height : 30,
        marginRight : 10
    },
   
})