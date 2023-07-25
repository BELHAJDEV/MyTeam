import { StyleSheet, Text, View,Platform,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import themes from '../utils/json/themes.json'
import { Checkbox } from 'react-native-paper';
import ThemeInput from '../components/ThemeInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ThemesCmp = ({setValue}) => {

    const [themesOpened,setThemesOpened] = useState([]);
    const [childrenOpened,setChildrenOpened] = useState([]);
    const [childrenTwoOpened,setChildrenTwoOpened] = useState([]);
    const [data,setData] = useState([]);
    const [labels,setLabels] = useState([]);

    const HandleDropDown = (type,element) => {

        if(type === "parent"){
            if(themesOpened.includes(element.id)){
                let array = themesOpened.filter(e => e != element.id);
                setThemesOpened(array)
            }else{
                setThemesOpened([...themesOpened,element.id])
            }
        }
        if(type === "child"){
            if(childrenOpened.includes(element.id)){
                let array = childrenOpened.filter(e => e != element.id);
                setChildrenOpened(array)
            }else{
                setChildrenOpened([...themesOpened,element.id])
            }
        }
        if(type === "childTwo"){
            if(childrenTwoOpened.includes(element.id)){
                let array = childrenTwoOpened.filter(e => e != element.id);
                setChildrenTwoOpened(array)
            }else{
                setChildrenTwoOpened([...themesOpened,element.id])
            }
        }
    }
    const HandleSelection = (label,obj) => {

        if(labels.includes(label)){
            let array = labels.filter(e => e!= label);
            let array2 = data.filter(e => e.label!= obj.label);
            setLabels(array);
            setData(array2)
            setValue(array2)

        }else{
            setLabels([...labels,label]);
            setData([...data,{...obj,period : "20"}]);
            setValue([...data,{...obj,period : "20"}])

        }

        
    }

    const onPeriodChange = (obj) => {
        let array = []
        data.map((el) => {
            if(el.label === obj.label){
                array.push(obj)
            }else{
                array.push(el)
            }
        })
        setData(array)
        setValue(array)
    }
  return (
    <>
        {themes.map((parent,index) => (
            <View key={index} style={{backgroundColor : "white"}}>
                <View style={[styles.row,{marginVertical : 10}]}>

                    {parent.children.length > 0 && 
                    <TouchableOpacity onPress={() => HandleDropDown("parent",parent)} style={{}}>
                        <Ionicons name='chevron-forward' size={20} color={"black"}/>
                    </TouchableOpacity>
                    }
                    <Text style={{color : "black"}}>{parent.label}</Text>
                </View>
                {themesOpened.includes(parent.id) && parent.children.map((child,i) => (
                    <View key={i}>
                        <View style={[styles.row,{paddingLeft : 30,marginVertical : 10}]}>
                            <View style={[Platform.OS === "ios" ? {borderWidth : 1,borderRadius : 4} : null]}>
                            <Checkbox
                                status={labels.includes(child.label) ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    // setChecked(!checked);
                                    let family = {
                                        parent : parent.label,
                                        element : child.label
                                    }
                                    console.log("family one : ",family)
                                    HandleSelection(child.label,child)

                                }}
                                
                            />
                            </View>
                        
                            {child?.children?.length > 0 && 
                            <TouchableOpacity onPress={() => HandleDropDown("child",child)}>
                                <Ionicons name='chevron-forward' size={20} color={"black"}/>
                            </TouchableOpacity>
                            }
                            <Text style={styles.label}>{child.label}</Text>
                        </View>
                        {childrenOpened.includes(child.id) && child.children.map((childTwo,ind) => (
                            <View style={[styles.row,{paddingLeft : 50,marginVertical : 10}]} key={ind}>
                                <View style={[Platform.OS === "ios" ? {borderWidth : 1,borderRadius : 4} : null]}>
                                <Checkbox
                                    status={labels.includes(childTwo.label) ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        // setChecked(!checked);
                                        let family = {
                                            parent : parent.label,
                                            child : child.label,
                                            element : childTwo.label
                                        }
                                        console.log("family two ,",family)
                                        HandleSelection(childTwo.label,childTwo)
                                    }}
                                    
                                />
                                </View>
                    
                                {childTwo?.children?.length > 0 && 
                                <TouchableOpacity onPress={() => HandleDropDown("childTwo",childTwo)}>
                                    <Ionicons name='chevron-forward' size={20}/>
                                </TouchableOpacity>
                                }
                                <Text style={styles.label}>{childTwo.label}</Text>
                            </View>
                        ))}
                    </View>
                    
                ))}
                
            </View>
        ))}

        {data.map((element,index) => (
            <View style={[styles.row,{marginVertical : 10}]} key={index}>
                <Text style={{width : "40%",color : "black"}}>{element.label}</Text>
                <ThemeInput element={element.label}  value={element.period} onFinish={onPeriodChange} editable={true} label={"Durée"}/>
                <TouchableOpacity onPress={() => HandleSelection(element.label,element)}>
                    <Ionicons name='trash-outline' size={20} color={"red"} />
                </TouchableOpacity>
            </View>
        ))} 
    </>
    
  )
}

export default ThemesCmp

const styles = StyleSheet.create({
    row : {
        flexDirection : "row",
        alignItems : "center"
    },
    label : {
        color : "black",
        marginLeft : 10,
        fontSize : 12
    }
})