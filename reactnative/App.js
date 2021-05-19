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

import LoginView from './components/Login/LoginView';
import RegisterView from './components/Register/RegisterView';

import LoginRestaurantView from './components/Login/LoginRestaurantView';
import RegisterRestaurantView from './components/Register/RegisterRestaurantView';

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

function RestaurantsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Indian Food</Text>
      </View>
      <View style={{ width: '70%', justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
      <TouchableOpacity onPress={() => navigation.navigate('Restaurants')}>
        <View style = {{flexDirection: "row", margin: 10}}>
          <Image style ={styles.preview} source = {require("./assets/Download.jpg")}/>
          <View style={{alignItems: 'center', margin: 5}}>
            <Text>
              Taj mahChicken
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      </View>
      <View style={{ width: '70%', justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
      <TouchableOpacity onPress={() => navigation.navigate('Restaurants')}>
        <View style = {{flexDirection: "row", margin: 10}}>
          <Image style ={styles.preview} source = {require("./assets/Download.jpg")}/>
          <View style={{alignItems: 'center', margin: 5}}>
            <Text>
              Taj mahChicken
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      </View>
      <View style={{ width: '70%', justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
      <TouchableOpacity onPress={() => navigation.navigate('Restaurants')}>
        <View style = {{flexDirection: "row", margin: 10}}>
          <Image style ={styles.preview} source = {require("./assets/Download.jpg")}/>
          <View style={{alignItems: 'center', margin: 5}}>
            <Text>
              Taj mahChicken
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

function FoodTypeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: "tomato"}}>
        <Image style ={styles.logo} source = {require("./assets/logo.png")}/>
        <Text>Hungy? No, just Appetite!</Text>
      </View>
      <View style={{ width: '70%', justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
        <TouchableOpacity onPress={() => navigation.navigate('Restaurants')}>
        <View style = {{ width: '100%', justifyContent: 'center', alignItems: 'center', margin: 5}}>
          <Text>
            Indian
          </Text>
        </View>
          <View style = {{flexDirection: "row", margin: 10}}>
            <Image style ={styles.preview} source = {require("./assets/Download.jpg")}/>
            <Image style ={styles.preview} source = {require("./assets/Download.jpg")}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: '70%', justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
        <TouchableOpacity onPress={() => navigation.navigate('Restaurants')}>
          <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center', margin: 5}}>
            <Text>
              Pasta
            </Text>
          </View>
          <View style = {{flexDirection: "row", margin: 10}}>
            <Image style ={styles.preview} source = {require("./assets/Download.jpg")}/>
            <Image style ={styles.preview} source = {require("./assets/Download.jpg")}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: '70%', justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
        <TouchableOpacity onPress={() => navigation.navigate('Restaurants')}>
        <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center', margin: 5}}>
            <Text>
              Pizza
            </Text>
          </View>
          <View style = {{flexDirection: "row", margin: 10}}>
            <Image style ={styles.preview} source = {require("./assets/Download.jpg")}/>
            <Image style ={styles.preview} source = {require("./assets/Download.jpg")}/>
          </View>
        </TouchableOpacity>
      </View>
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

const Stack = createStackNavigator();

function FoodTypeStackScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Food Types" component={FoodTypeScreen} />
        <Stack.Screen name="Restaurants" component={RestaurantsScreen} />     
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
          name="Food Types"
          component={FoodTypeStackScreen}
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
