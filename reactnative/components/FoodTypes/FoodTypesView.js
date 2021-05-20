import React, {Component} from 'react';
import {
  ScrollView,  
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';

import * as Location from 'expo-location';

import Spinner from 'react-native-loading-spinner-overlay';

import APIKit from './../APIKit'

let initialState = {
  coordinate: {
      latitude: 0,
      longitude: 0
  },
  distance: 10000,
  type: 0,
  errors: {},
  isAuthorized: false,
  isLoading: false,
  locationResult: null,
  hasLocationPermission: false
};

let restaurants = {}
//let location = {longitude: 0, latitude: 0}
class FoodTypesView extends Component{
  constructor(props) {
    super(props);
    initialState.isLoading = true;
    this.state = initialState;
}
componentDidMount(){
    this._getLocationAsync();
    
  };
  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ coordinate:  location });
   const {coordinate, distance, type} = this.state;
    const payload = {coordinate, distance, type};
    console.log(location);
    const onSuccess = ({data}) => {
        // Set JSON Web Token on success
        restaurants = data;
        this.setState({isLoading: false, isAuthorized: true});
    };
    const onFailure = error => {
        console.log(error);
        this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made

    APIKit.post('RestaurantFinder', payload)
    .then(onSuccess)
    .catch(onFailure);
  }
    createFoodTypes(restaurants){
        let found1 = false;
        let found2 = false;
        let found3 = false;
        let found4 = false;
        let found5 = false;
        let found6 = false;
        let foundDefault = false;
        let view = [];
        let restaurantType = '';
        for (let i = 1; i < restaurants.length; i++){
            switch (restaurants[i].restaurantType){
                case 1:
                  restaurantType = "Indian";
                  if(found1 == false){
                    view.push(<View key={restaurantType} style={{justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(restaurantType)}>
                    <View style = {{ justifyContent: 'center', alignItems: 'center', margin: 5}}>
                    <Text>
                        {restaurantType}
                    </Text>
                    </View>
                    <ScrollView horizontal={true} style = {{flexDirection: "row", margin: 10}}>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                    </ScrollView>
                    </TouchableOpacity>
                </View>);
                    found1 = true;
                  }
                  break;
                case 2:
                  restaurantType = "Italian";
                  if(found2 == false){
                    console.log(this.state.coordinate);
                    view.push(<View key={restaurantType} style={{justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(restaurantType)}>
                    <View style = {{ justifyContent: 'center', alignItems: 'center', margin: 5}}>
                    <Text>
                        {restaurantType}
                    </Text>
                    </View>
                    <ScrollView horizontal={true} style = {{flexDirection: "row", margin: 10}}>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                    </ScrollView>
                    </TouchableOpacity>
                </View>);
                    found2 = true;
                  }
                    break;
                case 3:
                  restaurantType = "Persian";
                  if(found3 == false){
                    view.push(<View key={restaurantType} style={{justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(restaurantType)}>
                    <View style = {{ justifyContent: 'center', alignItems: 'center', margin: 5}}>
                    <Text>
                        {restaurantType}
                    </Text>
                    </View>
                    <ScrollView horizontal={true} style = {{flexDirection: "row", margin: 10}}>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                    </ScrollView>
                    </TouchableOpacity>
                </View>);
                    found3 = true;
                  }
                    break;
                case 4:
                  restaurantType = "Japanese";
                  if(found4 == false){
                    view.push(<View key={restaurantType} style={{justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(restaurantType)}>
                    <View style = {{ justifyContent: 'center', alignItems: 'center', margin: 5}}>
                    <Text>
                        {restaurantType}
                    </Text>
                    </View>
                    <ScrollView horizontal={true} style = {{flexDirection: "row", margin: 10}}>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                    </ScrollView>
                    </TouchableOpacity>
                </View>);
                    found4 = true;
                  }
                    break;
                case 5:
                  restaurantType = "Chinese";
                  if(found5 == false){
                    view.push(<View key={restaurantType} style={{justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(restaurantType)}>
                    <View style = {{ justifyContent: 'center', alignItems: 'center', margin: 5}}>
                    <Text>
                        {restaurantType}
                    </Text>
                    </View>
                    <ScrollView horizontal={true} style = {{flexDirection: "row", margin: 10}}>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                    </ScrollView>
                    </TouchableOpacity>
                </View>);
                    found5 = true;
                  }
                    break;
                case 6:
                  restaurantType = "Thai";
                  if(found6 == false){
                    view.push(<View key={restaurantType} style={{justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(restaurantType)}>
                    <View style = {{ justifyContent: 'center', alignItems: 'center', margin: 5}}>
                    <Text>
                        {restaurantType}
                    </Text>
                    </View>
                    <ScrollView horizontal={true} style = {{flexDirection: "row", margin: 10}}>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                    </ScrollView>
                    </TouchableOpacity>
                </View>);
                    found6 = true;
                  }
                    break;
                default:
                  restaurantType = "Others";
                  if(foundDefault == false){
                    view.push(<View key={restaurantType} style={{justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(restaurantType)}>
                    <View style = {{ justifyContent: 'center', alignItems: 'center', margin: 5}}>
                    <Text>
                        {restaurantType}
                    </Text>
                    </View>
                    <ScrollView horizontal={true} style = {{flexDirection: "row", margin: 10}}>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                    </ScrollView>
                    </TouchableOpacity>
                </View>);
                    foundDefault = true;
                  }
                    break
            } 
        }
        return view;
    }

    render() {     
      const {isLoading} = this.state;  
        return (
            <ScrollView>
              <Spinner visible={isLoading} />
                <View>
                    {this.createFoodTypes(restaurants)}
                </View>
            </ScrollView>
        );
      }
}

// Define some colors and default sane values
const utils = {
    colors: {primaryColor: '#af0e66'},
    dimensions: {defaultPadding: 12},
    fonts: {largeFontSize: 18, mediumFontSize: 16, smallFontSize: 12},
  };
  
  // Define styles here
  const styles = {
    preview: {
        height: 120,
        margin: 5,
    },
    logo: {
    width: 200,
    height: 70
    },
    innerContainer: {
      marginBottom: 32,
    },
    logotypeContainer: {
      alignItems: 'center',
    },
    logotype: {
      maxWidth: 280,
      maxHeight: 100,
      resizeMode: 'contain',
      alignItems: 'center',
    },
    containerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f6f6f6',
    },
    input: {
      height: 50,
      padding: 12,
      backgroundColor: 'white',
      borderRadius: 6,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      marginBottom: utils.dimensions.defaultPadding,
    },
    loginButton: {
      borderColor: utils.colors.primaryColor,
      borderWidth: 2,
      padding: utils.dimensions.defaultPadding,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
    },
    loginButtonText: {
      color: utils.colors.primaryColor,
      fontSize: utils.fonts.mediumFontSize,
      fontWeight: 'bold',
    },
    errorMessageContainerStyle: {
      marginBottom: 8,
      backgroundColor: '#fee8e6',
      padding: 8,
      borderRadius: 4,
    },
    errorMessageTextStyle: {
      color: '#db2828',
      textAlign: 'center',
      fontSize: 12,
    },
  };
export default FoodTypesView;