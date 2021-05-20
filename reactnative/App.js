import * as React from 'react';
import { Button, PermissionsAndroid, Text, View, Image, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
//import FoodTypeStackScreen from './components/foodtypes'
import {useState, useEffect} from 'react';

import * as Location from 'expo-location';

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

let location;

function RestaurantsScreen(props) {
  return (
    <RestaurantsView navigation = {props.navigation} restaurantType = {props.route.name}/>
  );
}

function RestaurantScreen(props) {
  return (
    <RestaurantView navigation = {props.navigation} route = {props.route} location = {location}/>
  );
}

function FoodTypeScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ margin: 5, width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: "tomato"}}>
        <Image style ={styles.logo} source = {require("./assets/logo.png")}/>
        <Text>Hungry? No, just Appetite!</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <FoodTypesView navigation = {navigation} location = {location}/>
      </SafeAreaView>
    </View>
  );
}

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 1}}
        enabled>

        <SafeAreaView style={styles.container}>
          <LoginView />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 1}}
        enabled>

        <SafeAreaView style={styles.container}>
          <RegisterView />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

function LoginRestaurantScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 1}}
        enabled>

        <SafeAreaView style={styles.container}>
          <LoginRestaurantView />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

function RegisterRestaurantScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 1}}
        enabled>

        <SafeAreaView style={styles.container}>
          <RegisterRestaurantView />
        </SafeAreaView>
      </KeyboardAvoidingView>
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
          <Stack.Screen key={restaurantType} name={restaurantType} component={RestaurantsScreen} />
        );
    }
  return (
    <Stack.Navigator>
        <Stack.Screen name="Cuisine" component={FoodTypeScreen}/>
        {restaurantsStack}
        <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

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
