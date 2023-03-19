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
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = ({navigation}) => {
  // let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState();
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

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
    if (!photo || !title || !place) return false;
    return true;
  };

  const sendPhoto = async() => {
    if (!readyToPublish()) return;
    const response = await Location.getCurrentPositionAsync();
    const location = {
      longitude: response.coords.longitude,
      latitude: response.coords.latitude,
    };
    navigation.navigate("Posts", { photo, title, place, location });
    setPhoto("");
    setTitle("");
    setPlace("");
  }
 
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Camera style={styles.camera} ref={setCamera}>
            {photo && <Image source={{ uri: photo }} style={styles.image} />}
            <TouchableOpacity
              onPress={takePhoto}
              activeOpacity={0.8}
              style={styles.snapContainer}
            >
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
          <Text style={styles.downloadPhotoText}>
            {photo ? "Edit photo" : "Download photo"}
          </Text>
          <View>
            <TextInput
              onChangeText={setTitle}
              value={title}
              placeholder="Name..."
              placeholderTextColor="#BDBDBD"
              style={{ ...styles.input, marginTop: 32 }}
            />
            <View>
              <Feather
                name="map-pin"
                size={24}
                color="#BDBDBD"
                style={styles.locationIcon}
              />
              <TextInput
                onChangeText={setPlace}
                value={place}
                placeholder="Location..."
                placeholderTextColor="#BDBDBD"
                style={{ ...styles.input, marginTop: 16, paddingLeft: 28 }}
              />
            </View>

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
        <View style={styles.btnTrashBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnTrash}
            onPress={() => alert("delete?")}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
  snapContainer: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtn: {
    marginTop: 32,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  downloadPhotoText: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    position: "absolute",
    top: 27,
    left: 0,
    marginRight: 4,
  },
  btnTrashBox: {
    position: "absolute",
    width: "100%",
    bottom: 34,
    alignItems: "center",
  },
  btnTrash: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;