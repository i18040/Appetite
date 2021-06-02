import axios from 'axios';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import APIKit, {setClientToken} from '../APIKit';

const initialState = {
  email: '',
  name: '',
  password: '',
  adressStreet: '',
  adressNumber: '',
  adressZip: '',
  adressCity: '',
  adressCountry: '',
  adressLatitude: 0.0,
  adressLongitude: 0.0,
  phoneNumber: '',
  restaurantType: 0,
  deliveryCosts: 1.0,
  errors: {},
  isAuthorized: false,
  isLoading: false,
};

class Register extends Component {
  state = initialState;

  componentWillUnmount() {}

  onEmailChange = email => {
    this.setState({email});
  };

  onNameChange = name => {
    this.setState({name});
  };

  onPasswordChange = password => {
    this.setState({password});
  };

  onAdressStreetChange = adressStreet => {
    this.setState({adressStreet});
  };

  onAdressNumberChange = adressNumber => {
    this.setState({adressNumber});
  };

  onAdressZipChange = adressZip => {
    this.setState({adressZip});
  };

  onAdressCityChange = adressCity => {
    this.setState({adressCity});
  };

  onAdressCountryChange = adressCountry => {
    this.setState({adressCountry});
  };

  onAdressLatitudeChange = adressLatitude => {
    this.setState({adressLatitude});
  };

  onAdressLongitudeChange = adressLongitude => {
    this.setState({adressLongitude});
  };

  onPhoneNumberChange = phoneNumber => {
    this.setState({phoneNumber});
  };

  onRestaurantTypeChange = restaurantType => {
    this.setState({restaurantType});
  };
  
  onDeliveryCostsChange = deliveryCosts => {
    this.setState({deliveryCosts});
  };

  onPressRegister() {
    const {email, name, password, adressStreet, adressNumber, adressZip, adressCity, adressCountry, adressLatitude, adressLongitude, phoneNumber, restaurantType, deliveryCosts} = this.state;
    //const payload = {email, name, password, adressStreet, adressNumber, adressZip, adressCity, adressCountry, adressLatitude, adressLongitude, phoneNumber, restaurantType, deliveryCosts};
    //console.log(payload);
    const formData = new FormData();

    formData.append('Email', email);
    formData.append('Name', name);
    formData.append('Password', password);
    formData.append('Adress.Street', adressStreet);
    formData.append('Adress.Housenumber', adressNumber);
    formData.append('Adress.Zipcode', adressZip);
    formData.append('Adress.City', adressCity);
    formData.append('Adress.Country', adressCountry);
    formData.append('Adress.Latitude', adressLatitude);
    formData.append('Adress.Longitude', adressLongitude);
    formData.append('PhoneNumber', phoneNumber);
    formData.append('RestaurantType', restaurantType);
    formData.append('Logo', '');
    formData.append('DeliveryCosts', deliveryCosts);
    
    console.log(formData);

    const onSuccess = ({data}) => {
      // Set JSON Web Token on success
      setClientToken(data.token);
      this.setState({isLoading: false, isAuthorized: true});
    };

    const onFailure = error => {
      console.log(error && error.response);
      this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made
    this.setState({isLoading: true});

    APIKit.post('/RestaurantAdministration', formData)
      .then(onSuccess)
      .catch(onFailure);
    //axios({
    //  url: 'https://appetite.kr31sw1chs.de/RestaurantAdministration',
    //  method: 'POST',
    //  data: formData,
    //  headers: {
    //    Accept: 'application/json',
    //    'Content-Type': 'multipart/form-data',
    //  },
    //})
    //  .then(onSuccess)
    //  .catch(onFailure);

  }

  getNonFieldErrorMessage() {
    // Return errors that are served in `non_field_errors`
    let message = null;
    const {errors} = this.state;
    if (errors.non_field_errors) {
      message = (
        <View style={styles.errorMessageContainerStyle}>
          {errors.non_field_errors.map(item => (
            <Text style={styles.errorMessageTextStyle} key={item}>
              {item}
            </Text>
          ))}
        </View>
      );
    }
    return message;
  }

  getErrorMessageByField(field) {
    // Checks for error message in specified field
    // Shows error message from backend
    let message = null;
    if (this.state.errors[field]) {
      message = (
        <View style={styles.errorMessageContainerStyle}>
          {this.state.errors[field].map(item => (
            <Text style={styles.errorMessageTextStyle} key={item}>
              {item}
            </Text>
          ))}
        </View>
      );
    }
    return message;
  }

  render() {
    const {isLoading} = this.state;

    return (
      <View style={styles.containerStyle}>
        <Spinner visible={isLoading} />

        {!this.state.isAuthorized ? <View>
          <View style={styles.logotypeContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logotype}
            />
          </View>
          <ScrollView>
          <TextInput
            style={styles.input}
            value={this.state.email}
            maxLength={256}
            placeholder="Enter email..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onEmailChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />

          {this.getErrorMessageByField('email')}
          
          <TextInput
            style={styles.input}
            value={this.state.name}
            maxLength={256}
            placeholder="Enter username..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onNameChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />

          {this.getErrorMessageByField('name')}

          <TextInput
            style={styles.input}
            value={this.state.phoneNumber}
            maxLength={256}
            placeholder="Enter Phone Number..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onPhoneNumberChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />

          {this.getErrorMessageByField('phoneNumber')}

          <TextInput
            style={styles.input}
            value={this.state.restaurantType}
            maxLength={1}
            placeholder="Enter Restaurant Type..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onRestaurantTypeChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />

          {this.getErrorMessageByField('restaurantType')}
          
          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.adressStreet}
            maxLength={40}
            placeholder="Enter Street Name..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onAdressStreetChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          
          {this.getErrorMessageByField('adressStreet')}

          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.adressNumber}
            maxLength={40}
            placeholder="Enter Street Number..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onAdressNumberChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          
          {this.getErrorMessageByField('adressNumber')}

          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.adressZip}
            maxLength={40}
            placeholder="Enter Zip Code..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onAdressZipChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          
          {this.getErrorMessageByField('adressZip')}

          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.adressCity}
            maxLength={40}
            placeholder="Enter City Name..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onAdressCityChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          
          {this.getErrorMessageByField('adressCity')}

          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.adressCountry}
            maxLength={40}
            placeholder="Enter Country Name..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onAdressCountryChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          
          {this.getErrorMessageByField('adressCountry')}

          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.adressLatitude}
            maxLength={40}
            placeholder="Enter Latitude..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onAdressLatitudeChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          
          {this.getErrorMessageByField('adressLatitude')}

          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.adressLongitude}
            maxLength={40}
            placeholder="Enter Longitude..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onAdressLongitudeChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          
          {this.getErrorMessageByField('adressLongitude')}

          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.deliveryCosts}
            maxLength={40}
            placeholder="Enter Delivery Cost Amount..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onDeliveryCostsChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          
          {this.getErrorMessageByField('deliveryCosts')}

          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.password}
            maxLength={40}
            placeholder="Enter password..."
            onChangeText={this.onPasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={this.onPressRegister.bind(this)}
            secureTextEntry
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />

          {this.getErrorMessageByField('password')}

          {this.getNonFieldErrorMessage()}

          <TouchableOpacity
            style={styles.registerButton}
            onPress={this.onPressRegister.bind(this)}>
            <Text style={styles.registerButtonText}>Register as Restaurant</Text>
          </TouchableOpacity>
          </ScrollView>
        </View> : <View><Text>Successfully authorized!</Text></View>}
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
  registerButton: {
    borderColor: utils.colors.primaryColor,
    borderWidth: 2,
    padding: utils.dimensions.defaultPadding,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  registerButtonText: {
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

export default Register;