import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {Camera } from "expo-camera";

const CreatePostsScreen = () => {
 
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}>
        <TouchableOpacity>

        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
  
    height: 240,
    marginTop: 76,
  },
});

export default CreatePostsScreen;