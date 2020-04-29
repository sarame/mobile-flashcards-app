import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DecksList from '../components/DecksList';
import AddDeck from '../components/AddDeck';
import DeckCard from '../components/DeckCard';
import AddQuestion from '../components/AddQuestion';
import StartQuiz from '../components/StartQuiz';
import { green, grey } from '../utils/colors';

const isIOS = Platform.OS === 'ios' ? true : false;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DecksListStackScreen() {
  return (
    <Stack.Navigator initialRouteName="DecksList">
      <Stack.Screen name="DecksList" component={DecksList} options={{ title: 'Decks' }}/>
      <Stack.Screen name="DeckCard" component={DeckCard} options={{ title: 'Deck Details' }}/>
      <Stack.Screen name="AddQuestion" component={AddQuestion} options={{ title: 'Add Question' }}/>
      <Stack.Screen name="StartQuiz" component={StartQuiz} 
                    options={({ route }) => ({ title: route.params.title + " Quiz" })}/>
    </Stack.Navigator>
   );
}

function AddDeckListStackScreen() {
  return (
    <Stack.Navigator initialRouteName="AddDeck">
      <Stack.Screen name="AddDeck" component={AddDeck} options={{ title: 'Add Deck' }}/>
    </Stack.Navigator>
   );
}

const tabNavOptions = (route, focused, color, size) => {
  let iconName;
  if (route.name === 'DecksListStackScreen') {
    iconName = focused ? 'ios-list-box' : 'ios-list'
  } else if (route.name === 'AddDeckListStackScreen') {
    iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
  }
  return <Ionicons name={iconName} size={size} color={color}/>;
}

function FlashCardsTabs() {
  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="DecksListStackScreen"
                   screenOptions={({ route }) => ({
                   tabBarIcon: ({focused, color, size}) => {
                    return tabNavOptions(route, focused, color, size)
                   }})}
                  tabBarOptions={{
                  activeTintColor: green,
                  inactiveTintColor: grey,
                  }}>
      <Tab.Screen name="DecksListStackScreen" component={DecksListStackScreen} options={{ title: 'Decks' }}/>
      <Tab.Screen name="AddDeckListStackScreen" component={AddDeckListStackScreen} options={{ title: 'Add Deck' }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default FlashCardsTabs;