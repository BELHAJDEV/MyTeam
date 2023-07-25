import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState,useReducer,useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import NewSessionScreen from './screens/NewSession';
import DataTable from './screens/DataTable';
import { SessionContext } from './context';
import uuid from 'react-native-uuid';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stateInitialize = {
  element : {},
  data : []
}
const reducer = (state,action) => {
  switch (action.type) {
    case "add": {
      return {
        ...state,
        data : [...state.data,action.payload]
      }
    }
    case "delete": {
      return {
        ...state,
        data : state.data.filter(e => e.id != action.payload)
      }
    }
    case "duplicate": {
      return {
        ...state,
        data : [...state.data, {...action.payload,id : uuid.v4()}]
      }
    }
    case "update": {
      return {
        ...state,
        data : state.data.map((e => e.id === action.payload.id ? action.payload : e))
      }
    }
      
  
    default: {
      return state
    }
  }
}

const Stack  = createNativeStackNavigator()
const App = () => {
  
  const [state,dispatch] = useReducer(reducer,stateInitialize)

  return (
    <SafeAreaView style={styles.container}>
      <SessionContext.Provider value={{state,dispatch}}>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown : false,}}>
          <Stack.Screen name='allSessions' component={DataTable} />
          <Stack.Screen name='addSession' component={NewSessionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </SessionContext.Provider>
      
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "white"
  }
})