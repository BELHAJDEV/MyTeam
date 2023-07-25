import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AppModal = ({visible,setVisible,data,setValue,setColor}) => {
  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
        <TouchableOpacity style={styles.container} onPress={() => setVisible(false)}>
            <Text style={styles.blur} />
            <View style={styles.modalStyle}>
                <ScrollView>
                    {data.map((el,index) => (
                        <TouchableOpacity key={index} style={styles.element} 
                            onPress={() => {
                                if(el?.color){
                                    setValue(el?.value);
                                    setColor(el?.color)
                                }else{
                                    setValue(el?.label);

                                }
                               
                                setVisible(false);

                            }}>
                            {el.color && <View style={{width : 15,height : 15,backgroundColor : el?.color,borderRadius : 7,marginRight : 5}} />}
                            <Text style={{color : "black"}}>{el?.label}</Text>
                        </TouchableOpacity>
                    ))}
                    
                </ScrollView>
            </View>
        </TouchableOpacity>
    </Modal>
  )
}

export default AppModal

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