import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import moment from 'moment';
import DotsModal from '../components/DotsModal';
import { SessionContext } from '../context';
import { useNavigation } from '@react-navigation/native';
const dataHeader  = [
    {label : "Séance" ,icon : "sports-handball"},
    {label : "Thèmes",icon : "bookmark"},
    {label : "Lieu" ,icon : "location-on"},
    {label : "RPE Estimé",icon : "circle"},
    {label : "Durée",icon : "access-time"},
    {label : "Notes",icon : "comment"},
    {label : "Players", icon : "people-outline"}
]
const DataTable = () => {
    const navigation = useNavigation()
    const [visible,setVisible] = useState(false);
    const {state,dispatch} = useContext(SessionContext);
    const [selectedItem,setSelectedItem] = useState();
    const WIDTH = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
         {state.data.length === 0 && 
                <View style={{flex : 1,minWidth : WIDTH,justifyContent : "center",alignItems : "center"}}>
                    <Text style={{color : "gray"}}>Accune session</Text>
                </View>}
       {state.data.length > 0 && <ScrollView horizontal={true}> 
            <View>
                <View style={[styles.row,{backgroundColor : "#75C2F6"}]}>
                    {dataHeader.map((el,index) => (
                        <View style={styles.element} key={index}>
                            <MaterialIcons name={el.icon} size={20} color={"white"} />
                            <Text style={styles.headerLabel}>{el.label}</Text>
                        </View>
                    ))}  
                </View>

                {state.data.map((el,index) => (
                    <View style={[styles.row,{backgroundColor : "#eee",height : 80}]} key={index}>

                        <View style={[styles.element,{height : 80,alignItems : "flex-start"}]}>
                            <View style={{flexDirection : "row",alignItems : "center"}}>
                                <Ionicons style={{width : 25}} name='calendar' size={18} color={"orange"}/>
                                <Text style={styles.elementLabel}>{moment(el.date).format("DD/MM/YYYY")}</Text>
                            </View>
                            <View style={{flexDirection : "row",alignItems : "center",marginTop : 5}}>
                                <Ionicons style={{width : 25}} name='time-outline' size={18} color={"orange"}/>
                                <Text style={styles.elementLabel}>{moment(el.time).format("HH:MM : A")}</Text>
                            </View>
                        </View>

                        <View style={[styles.element,{height : 80}]}>
                            <MaterialIcons name={"bookmark"} size={20} color={"orange"} />
                            <Text style={[styles.elementLabel,{maxWidth :"90%"}]} numberOfLines={2}>
                                {el.themes?.map((obj) => obj.label+ "," )}
                            </Text>
                        </View>
                        <View style={[styles.element,{height : 80}]}>
                            <MaterialIcons name={"location-on"} size={20} color={"orange"} />
                            <Text style={styles.elementLabel} numberOfLines={2}>
                                {el.place}
                            </Text>
                        </View>
                        <View style={[styles.element,{height : 80}]}>
                            {/* <View style={{width : 20,height: 20,borderRadius : 10,backgroundColor : el.rpe?.color}} /> */}
                            <Text style={styles.elementLabel} numberOfLines={2}>
                                {el.rpe}
                            </Text>
                        </View>
                        <View style={[styles.element,{height : 80,flexDirection : "row"}]}>
                            <Ionicons name='time-outline' size={18} color={"orange"}/>
                            <Text style={[styles.elementLabel,{marginLeft : 10}]}>{el.period}</Text>
                        </View>
                        <View style={[styles.element,{height : 80}]}>
                            <MaterialIcons name='comment' size={18} color={"orange"}/>
                        </View>
                        <View style={[styles.element,{height : 80,flexDirection : "row"}]}>
                            <MaterialIcons name={"people-outline"} size={20} color={"orange"} />
                            <Text style={[styles.elementLabel,{marginLeft : 5}]} numberOfLines={2}>
                                {el?.selectedPlayers?.length}
                            </Text>
                        </View>
                        <TouchableOpacity style={[styles.element,{height : 80}]} onPress={() => {setSelectedItem(el),setVisible(true)}}>
                            <Entypo name='dots-three-vertical' size={18} color={"black"}/>
                        </TouchableOpacity>
                    </View>
                ))}
                 
            </View>
        </ScrollView>}
        
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("addSession")}>
            <Text style={styles.btnText}>Ajouter une session</Text>
        </TouchableOpacity>
        <DotsModal visible={visible} setVisible={setVisible} item={selectedItem}/>
    </View>
  )
}

export default DataTable

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        backgroundColor : "white"
    },
    row : {
        flexDirection : "row",
        height : 60,


    },
    element : {
        width : 120,
        height : 60,
        justifyContent : "center",
        borderRightWidth : 1,
        borderRightColor : "white",
        paddingLeft : 5,
        alignItems : "center",
        justifyContent : "center",

        
    },
    headerLabel : {
        color : "white",
        fontSize : 13,
        textAlign : "center"
    },
    elementLabel: {
        fontSize : 12,
        color : "black",
        maxWidth :"100%",
        textAlign : "center"
    },
    btn : {
        width : "90%",
        padding : 15,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : "#75C2F6",
        borderRadius : 20,
        marginTop : 20,
        alignSelf : "center"

        
    },
    btnText : {
        color : "white",
        fontWeight : "bold",
    }
})