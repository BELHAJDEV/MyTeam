import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useId, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimeInput from '../components/DateTimeInput';
import PeriodInput from '../components/PeriodInput';
import PlaceInput from '../components/PlaceInput';
import themes from '../utils/json/themes.json';
import { Checkbox } from 'react-native-paper';
import ThemeInput from '../components/ThemeInput';
import ThemesCmp from '../components/ThemesCmp';
import CommentCmp from '../components/CommentCmp';
import PlayersCmp from '../components/PlayersCmp';
import moment from 'moment';
import { SessionContext } from '../context';
import { v4 as uuidv4 } from 'uuid';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
const NewSession = ({route}) => {
    const params = route.params ?? {}
    const {id,info,action} = params;
    const navigation = useNavigation()
    const [time,setTime] = useState(new Date());
    const [date,setDate] = useState(new Date());
    const [period,setPeriod] = useState("0");
    const [periodTwo,setPeriodTwo] = useState("0");
    const [place,setPlace] = useState();
    const [data,setData] = useState([]);
    const [comment,setComment] = useState();
    const [rpe,setRpe] = useState();
    const [selectedPlayers,setSelectedPlayers] = useState([]);
    const {state,dispatch} = useContext(SessionContext);


    const Submit = () => {
        const body = {
            id : id || uuid.v4(),
            time,
            date,
            period,
            periodTwo,
            place,
            themes : data,
            comment,
            rpe,
            selectedPlayers
        };
        if(!action){
            dispatch({type : "add",payload : body})
        }else{
            dispatch({type : "update",payload : body})
        }
        navigation.navigate("allSessions")
    }
    
    useEffect(() => {
        let total = 0;

        data.map((e) => {
            total = total + Number(e.period) 
        })
        let totalString = total.toString();
        setPeriodTwo(totalString)



    },[data])
    

    useEffect(() => {
        if(info){
            setDate(info.date);
            setTime(info.time);
            setPeriod(info.period);
            setPeriodTwo(info.periodTwo);
            setRpe(info.rpe)
            // setSelectedPlayers(info.selectedPlayers);
            setPlace(info.place);
            setComment(info.comment);
            setData(info.themes)

        }
    },[info])

  return (
    <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
    >
        <ScrollView>
            <PlaceInput label={"Lieu  : * "} value={place} setValue={setPlace}type={"place"} />
            <View style={styles.row}>
                <DateTimeInput type={"date"} setValue={setDate} />
                <DateTimeInput type={"time"} setValue={setTime} />
            </View>
            <View style={styles.row}>
                <PeriodInput value={period} setValue={setPeriod} editable={true} label={"Durée total : * "}/>
                <PeriodInput value={periodTwo} setValue={setPeriodTwo} editable={false} label={"Durée éffective : * "} />
            </View>
            
            <ThemesCmp setValue={setData} />
            <CommentCmp  value={comment} setValue={setComment} label={"Commentaire/Notes : "} />
            <PlaceInput label={"RFE Estimé :"} value={rpe} setValue={setRpe}/>
            <PlayersCmp label={"Joueurs : *"} selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} />
            <TouchableOpacity style={styles.btn} onPress={Submit}>
                <Text style={styles.btnText}>{action ? "Modifier" : "Ajouter"}</Text>
            </TouchableOpacity>
        </ScrollView>


      
    </KeyboardAvoidingView>
  )
}

export default NewSession

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 15,
        backgroundColor : "white"
    },
    row : {
        flexDirection : "row",
        alignItems : "center"
    },
    btn : {
        width : "100%",
        padding : 15,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : "#75C2F6",
        borderRadius : 20,
        marginTop : 20

        
    },
    btnText : {
        color : "white",
        fontWeight : "bold",
    }
})