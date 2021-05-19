import React, {Component} from 'react';
import {
  ScrollView,  
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';



import Spinner from 'react-native-loading-spinner-overlay';

import APIKit, {setClientToken} from './../Login/APIKit';

const initialState = {
  coordinate: {
      latitude: 0,
      longitude: 0
  },
  distance: 50,
  type: 0,
  errors: {},
  isAuthorized: false,
  isLoading: false,
};

let restaurantsState = {}

class FoodTypesView extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        const {coordinate, distance, type} = this.state;
        const payload = {coordinate, distance, type};
        const onSuccess = ({data}) => {
            // Set JSON Web Token on success
            restaurantsState = data;
            this.setState({isLoading: false, isAuthorized: true});
        };
        const onFailure = error => {
            console.log(error && error.response);
            this.setState({errors: error.response.data, isLoading: false});
        };
    
        // Show spinner when call is made
        this.state = ({isLoading: true});
    
        APIKit.post('RestaurantFinder', payload)
        .then(onSuccess)
        .catch(onFailure);
    }
    
    chooseTypeClicked(){
        //navigation.navigate('Restaurants');
    }

    createFoodTypes(data){
        let view = [];
        let type = '';
        
        for (let i = 1; i < 7; i++){
            switch (i){
                case 1:
                    type = "Indian";
                    break;
                case 2:
                    type = "Italian";
                    break;
                case 3:
                    type = "Persian";
                    break;
                case 4:
                    type = "Japanese";
                    break;
                case 5:
                    type = "Chinese";
                    break;
                case 6:
                    type = "Thai";
                    break;
                default:
                    type = "Sonstige";
                    break
            } 
            console.log(type)
            view.push(
                <View key={type} style={{justifyContent: 'center', backgroundColor: "tomato", margin: 5}}>
                    <TouchableOpacity onPress={this.chooseTypeClicked(i)}>
                    <View style = {{ justifyContent: 'center', alignItems: 'center', margin: 5}}>
                    <Text>
                        {type}
                    </Text>
                    </View>
                    <ScrollView horizontal={true} style = {{flexDirection: "row", margin: 10}}>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                        <Image style ={styles.preview} source = {require("./../../assets/Download.jpg")}/>
                    </ScrollView>
                    </TouchableOpacity>
                </View>
            );
        }
        return view;
    }

    render() {
        console.log("amina");
        const {isLoading} = this.state;
        
        return (
            <ScrollView>
                <Spinner visible={isLoading} />
                <View>
                    {this.createFoodTypes(restaurantsState)}
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