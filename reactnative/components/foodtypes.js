import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function FoodTypeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Food Types</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
  
  const Stack = createStackNavigator();
  
  function FoodTypeStackScreen() {
    return (
      <Stack.Navigator>
          <Stack.Screen name="Home" component={FoodTypeScreen}/>
          <Stack.Screen name="Details" component={RestaurantScreen} />
        </Stack.Navigator>
    );
  }