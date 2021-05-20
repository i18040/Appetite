import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

let restaurants = {}
class RestaurantsView extends Component{

    constructor(props){
        super(props);
        restaurants = this.props.data;
        type = this.props.name;
        console.log(type);
    }

    createRestaurants(restaurants, type){
        let view = [];
        for (let i = 1; i < restaurants.length; i++){
            if(type == restaurants[i].restaurantType){
              console.log(type)
              view.push(
                <View style={{ width: '70%', justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
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
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
              <Text>{type}</Text>
              {this.createRestaurants(restaurants, type)}
            </View>
          </View>
          
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