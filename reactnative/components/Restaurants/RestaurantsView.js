import React, {Component} from 'react';
import {
  ScrollView, 
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import * as Location from 'expo-location';

import Spinner from 'react-native-loading-spinner-overlay';

import APIKit from './../APIKit'

let initialState = {
  coordinate: {
      latitude: 0,
      longitude: 0
  },
  distance: 50,
  type: 0,
  errors: {},
  isAuthorized: false,
  isLoading: false,
  restaurantType: 0,
};

let restaurants = {};
let restaurantType = '';
let location = {longitude: 0, latitude: 0}
class RestaurantsView extends Component{

  constructor(props) {
    super(props);
    console.log(props.restaurantType)
    switch(props.restaurantType){
      case "Indian":
        initialState.restaurantType = 1;
        restaurantType = 1;
        break;
      case "Italian":
        initialState.restaurantType = 2;
        restaurantType = 2;
        break;
      case "Persian":
        initialState.restaurantType = 3;
        restaurantType = 3;
        break;
      case "Japanese":
        initialState.restaurantType = 4;
        restaurantType = 4;
        break;
      case "Chinese":
        initialState.restaurantType = 5;
        restaurantType = 5;
        break;
      case "Thai":
        initialState.restaurantType = 6;
        restaurantType = 6;
        break;
      case "Other":
        initialState.restaurantType = 0;
        restaurantType = 0;
        break;
    }
    initialState.restaurantType = props.restaurantType;
    this.state = initialState;
    const {coordinate, distance, type} = this.state;
    const payload = {coordinate, distance, type};
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
    this.state = ({isLoading: true});

    APIKit.post('RestaurantFinder', payload)
    .then(onSuccess)
    .catch(onFailure);
  }

  componentDidMount(){
    async () => {
      location = await Location.getCurrentPositionAsync({});
    };
    this.setState({coordinate: {latitude: location.latitude, longitude: location.longitude}});
  };

    createRestaurants(restaurantType){
        
        let view = [];
        for (let i = 1; i < restaurants.length; i++){
            if(restaurantType == restaurants[i].restaurantType){
              view.push(
                <View key={restaurants[i].id} style={{ width: '70%', justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
                  <TouchableOpacity onPress={() => navigation.navigate('Restaurant', {restaurantName: restaurants[i].name})}>
                    <View style = {{flexDirection: "row", margin: 10}}>
                      <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                      <View style={{alignItems: 'center', margin: 5}}>
                        <Text>
                          {restaurants[i].name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
            
        }
        return view;
    }

    render() { 
      const {isLoading} = this.state;         
        return (
          <ScrollView>
            <Spinner visible={isLoading} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                {this.createRestaurants(restaurantType)}
              </View>
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
export default RestaurantsView;