import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Dimensions, Platform, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { MediaLibrary } from 'expo-media-library';
import APIKit, {setClientToken} from './APIKit';
import FormData from 'form-data';

export default function App() {
  //  camera permissions
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');  // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] =  useState(false);

  // on screen  load, ask for permission to use the camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = '4:3';  // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio; 
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder / 2);
      setRatio(desiredRatio);
      // Set a flag so we don't do this 
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async() => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const takePicture = async () => {
    if(camera){
        let photo = await camera.takePictureAsync();
        console.log('photo', photo);

        const formData = new FormData();
        formData.append('UserEmail', userData.email);
        formData.append('RestaurantEmail', 'test@gmail.com');
        formData.append('Text', 'Test Review');
        formData.append('Rating', 5);
        formData.append('Pictures', {value: photo.uri, options: {filename: photo.uri, contentType: null}});
        //formData.append('Pictures', photo);
        //formData.append('Pictures', {'@': photo.uri, 'type': 'image/jpg'});

        console.log(formData);
        //await MediaLibrary.saveToLibraryAsync(photo.uri);

        const onSuccess = ({data}) => {
          //Alert.alert('Login Successful');
          console.log(data);
        };
    
        const onFailure = error => {
          console.log(error && error.response);
        };
        
        APIKit.post('/ReviewService', formData)
          .then(onSuccess)
          .catch(onFailure);
        };
    }

  if (hasPermission === null) {
    return (
      <View style={styles.information}>
        <Text>Waiting for camera permissions</Text>
      </View>
    );
  } else if (hasPermission === false) {
    return (
      <View style={styles.information}>
        <Text>No access to camera</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* 
        We created a Camera height by adding margins to the top and bottom, 
        but we could set the width/height instead 
        since we know the screen dimensions
        */}
        <Camera
          style={[styles.cameraPreview, {marginTop: imagePadding, marginBottom: imagePadding}]}
          onCameraReady={setCameraReady}
          ratio={ratio}
          ref={(ref) => {
            setCamera(ref);
          }}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => takePicture()}> 
                  <Image source={require("../assets/camera.png")} style={{width: 100, height: 100}} />
              </TouchableOpacity>
            </View>
        </Camera>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
                if(cameraRef){
                    let photo = await cameraRef.takePictureAsync();
                    console.log('photo', photo);
                    await MediaLibrary.saveToLibraryAsync(photo.uri);

                }
                <Text>Take Picture</Text>
            }}></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  information: { 
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 20,
  },
  cameraPreview: {
    flex: 1,
  }
});