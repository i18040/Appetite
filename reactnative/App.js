import * as React from 'react';
import { Button, Text, View, Image, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
//import FoodTypeStackScreen from './components/foodtypes'

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
      <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: "tomato"}}>
        <Image style ={styles.logo} source = {require("./assets/logo.png")}/>
        <Text>Hungy? No, just Appetite!</Text>
      </View>
      <View style={styles.loginButton}/>
      <View style={styles.registerButton}/>
    </View>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: "tomato"}}>
        <Image style ={styles.logo} source = {require("./assets/logo.png")}/>
        <Text>Hungy? No, just Appetite!</Text>
      </View>
      
    </View>
  );
}

const Stack = createStackNavigator();

function FoodTypeStackScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Food Types" component={FoodTypeScreen}/>
        <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
      </Stack.Navigator>
  );
}

const LoginStack = createStackNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
        <LoginStack.Screen name="Login" component={LoginScreen}/>
        <LoginStack.Screen name="Register" component={RegisterScreen} />
      </LoginStack.Navigator>
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
          component={LoginStackScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
