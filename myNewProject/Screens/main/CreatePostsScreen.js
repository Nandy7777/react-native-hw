import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";

// import { StatusBar } from "expo-status-bar";
// import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

const CreatePostsScreen = ({navigation}) => {
  // let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
     return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePhoto = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    const photo = await camera.takePictureAsync(options);
    setPhoto(photo.uri);
  }

  const sendPhoto = () => {
    console.log('mavigation', navigation)
    navigation.navigate("Posts", { photo });
  }
   
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <View style={styles.takePhotoContainer}>
          <Image source={{ uri: photo }} style={{ height: 200, width: 200 }} />
        </View>
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
          <Text style={styles.sendLabel}>SNAP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    marginHorizontal: 16,
    borderRadius: 8,
    height: 240,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    marginTop: 100,
    marginLeft: 110,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
  },
  sendBtn: {
    marginHorizontal: 16,
    marginTop: 207,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#BDBDBD",
    fontSize: 16, 
  },
});

export default CreatePostsScreen;