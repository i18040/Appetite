import * as React from 'react';
import { Button, Text, View, Image, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
//import FoodTypeStackScreen from './components/foodtypes'

import APIKit from './components/APIKit';

import FoodTypesView from './components/FoodTypes/FoodTypesView';

import RestaurantsView from './components/Restaurants/RestaurantsView';

import LoginView from './components/Login/LoginView';
import RegisterView from './components/Register/RegisterView';

import LoginRestaurantView from './components/Login/LoginRestaurantView';
import RegisterRestaurantView from './components/Register/RegisterRestaurantView';

import ReviewCamera from './components/reviewCamera';

const styles = StyleSheet.create({
  preview: {
    width: 100,
    height: 100,
    margin: 5,
  },
  logo: {
    width: 200,
    height: 70
  },
  loginButton: {
    width: "70%",
    height: 70,
    backgroundColor: "#fc5c65",
  },
  registerButton: {
    width: "70%",
    height: 70,
    backgroundColor: "#4ecdc4",
  },
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },
});

function RestaurantsScreen({navigation, data, name}) {
  return (
    <RestaurantsView data = {data} navigation = {navigation} name = {name}/>
  );
}

function FoodTypeScreen({navigation, data}) {
  console.log("cmina")
  console.log(data)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ margin: 5, width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: "tomato"}}>
        <Image style ={styles.logo} source = {require("./assets/logo.png")}/>
        <Text>Hungry? No, just Appetite!</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <FoodTypesView data = {data} navigation = {navigation}/>
      </SafeAreaView>
    </View>
  );
}

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 1}}
        enabled>

        <SafeAreaView style={styles.container}>
          <LoginView />
        </SafeAreaView>
      </View>
    </View>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 1}}
        enabled>

        <SafeAreaView style={styles.container}>
          <RegisterView />
        </SafeAreaView>
      </View>
    </View>
  );
}

function LoginRestaurantScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 1}}
        enabled>

        <SafeAreaView style={styles.container}>
          <LoginRestaurantView />
        </SafeAreaView>
      </View>
    </View>
  );
}

function RegisterRestaurantScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 1}}
        enabled>

        <SafeAreaView style={styles.container}>
          <RegisterRestaurantView />
        </SafeAreaView>
      </View>
    </View>
  );
}

function ReviewScreen({ navigation }) {
  return (
    <ReviewCamera />
  );
}

const Stack = createStackNavigator();

function FoodTypeStackScreen() {
  const coordinate = {latitude: 0, longitude: 0};
  const distance = 50;
  const type = 0;
  const payload = {coordinate, distance, type};
  let restaurants;
  const onSuccess = ({data}) => {
      // Set JSON Web Token on success
      restaurants = data;
      console.log("amina");
  };
  const onFailure = error => {
      console.log(error);
  };
    let restaurantsStack = [];
    let restaurantType = '';
    
    for (let i = 1; i < 7; i++){
        switch (i){
            case 1:
              restaurantType = "Indian";
              break;
            case 2:
              restaurantType = "Italian";
              break;
            case 3:
              restaurantType = "Persian";
              break;
            case 4:
              restaurantType = "Japanese";
              break;
            case 5:
              restaurantType = "Chinese";
              break;
            case 6:
              restaurantType = "Thai";
              break;
            default:
              restaurantType = "Sonstige";
              break
        } 
        restaurantsStack.push(
          <Stack.Screen key = {restaurantType} name={restaurantType} component={RestaurantsScreen} />
        );
    }
  APIKit.post('RestaurantFinder', payload)
  .then(onSuccess)
  .catch(onFailure);
  console.log("bmina")
  console.log(restaurants)
  return (
    <Stack.Navigator>
        <Stack.Screen name="Cuisine" component={FoodTypeScreen} data = {restaurants}/>
        {restaurantsStack}
      </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen 
          name="Cuisine"
          component={FoodTypeStackScreen}
        />
        <Drawer.Screen 
          name="Review"
          component={ReviewScreen}
        />
        <Drawer.Screen 
          name="Login"
          component={LoginScreen}
        />
        <Drawer.Screen 
          name="Register"
          component={RegisterScreen}
        />
        <Drawer.Screen 
          name="Login as Restaurant"
          component={LoginRestaurantScreen}
        />
        <Drawer.Screen 
          name="Register as Restaurant"
          component={RegisterRestaurantScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
