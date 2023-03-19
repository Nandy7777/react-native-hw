import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
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

  const readyToPublish = () => {
    if (!photo) return false;
    return true;
  };

  const sendPhoto = () => {
    if (!readyToPublish()) return;
    console.log('mavigation', navigation)
    navigation.navigate("Posts", { photo });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Camera style={styles.camera} ref={setCamera}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={styles.image} />
              </View>
            )}

            <TouchableOpacity
              onPress={takePhoto}
              activeOpacity={0.8}
              style={styles.snapContainer}
            >
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
          <Text style={styles.downloadPhotoText}>Download photo</Text>
          <View>
            <TouchableOpacity
              onPress={sendPhoto}
              style={{
                ...styles.sendBtn,
                backgroundColor: readyToPublish() ? "#FF6C00" : "#F6F6F6",
              }}
            >
              <Text
                style={{
                  ...styles.sendLabel,
                  color: readyToPublish() ? "#ffffff" : "#BDBDBD",
                }}
              >
                PUBLISH
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  camera: {
    borderRadius: 8,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 8,
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 60,
    height: 60,
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
  downloadPhotoText: {
    marginBottom: 22,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});

export default CreatePostsScreen;