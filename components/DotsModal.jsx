import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Ionicins from 'react-native-vector-icons/Ionicons'
import { SessionContext } from '../context'
import { useNavigation } from '@react-navigation/native'

const actions = [
    {label : "Modifier" ,icon : "pencil",action : "update"},
    {label : "Dupliquer" ,icon : "duplicate-outline",action : "duplicate"},
    {label : "Supprimer" ,icon : "trash-outline",action : "delete"},
]
const DotsModal = ({visible,setVisible,item}) => {
    const {state,dispatch} = useContext(SessionContext);
    const navigation = useNavigation();

    const HandleActions = (action) => {
        switch (action) {
            case "delete":
                dispatch({type : action,payload : item.id})
                
                break;
            case "duplicate":
                dispatch({type : action,payload : item})
                
                break;
            case "update":
                navigation.navigate("addSession",{action,id :item.id,info : item})
                
                
                break;
        
            default:
                break;
        }
    }

  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
        <TouchableOpacity style={styles.container} onPress={() => setVisible(false)}>
            <Text style={styles.blur} />
            <View style={styles.modalStyle}>
                <ScrollView>
                    {actions.map((el,index) => (
                        <TouchableOpacity key={index} style={styles.element} 
                            onPress={() => {
                                HandleActions(el.action)
                                setVisible(false)

                            }}>
                            <Ionicins name={el.icon} size={20} color={"orange"} />
                            <Text style={{color : "black",marginLeft : 10}}>{el.label}</Text>
                        </TouchableOpacity>
                    ))}
                    
                </ScrollView>
            </View>
        </TouchableOpacity>
    </Modal>
  )
}

export default DotsModal

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
    element : {
        paddingVertical : 10,
        marginTop : 10,
        flexDirection : "row",
        alignItems : "center"

    }
})