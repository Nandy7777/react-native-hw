import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
  nickname: '',
};

export default function RegistrationScreen({ navigation }) {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocusedL, setIsFocusedL] = useState(false);
  const [isFocusedE, setIsFocusedE] = useState(false);
  const [isFocusedP, setIsFocusedP] = useState(false);
  const [hiddenPass, setHiddenPass] = useState(true);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log("state:", state);
    setState(initialState);
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ImageBackground
            style={{
              ...styles.image,
              width: windowWidth,
              height: windowHeight,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            source={require("../../assets/images/back-ground.jpg")}
          >
            <View
              style={{
                ...styles.whiteContainer,
                marginBottom: isShowKeyboard ? 150 : 0,
              }}
            >
              <View style={styles.photoFrame}>
                <View style={styles.btnAdd}>
                  <Image source={require("../../assets/images/add.png")} />
                </View>
              </View>
              <View style={styles.form}>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Registration</Text>
                </View>
                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: isFocusedL ? "#FFFFFF" : "#F6F6F6",
                      color: isFocusedL ? "#212121" : "#BDBDBD",
                      borderColor: isFocusedL ? "#FF6C00" : "#E8E8E8",
                      marginBottom: 16,
                    }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocusedL(true);
                    }}
                    onBlur={() => setIsFocusedL(false)}
                    placeholder="Login"
                    value={state.nickname}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        nickname: value,
                      }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: isFocusedE ? "#FFFFFF" : "#F6F6F6",
                      color: isFocusedE ? "#212121" : "#BDBDBD",
                      borderColor: isFocusedE ? "#FF6C00" : "#E8E8E8",
                      marginBottom: 16,
                    }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocusedE(true);
                    }}
                    onBlur={() => setIsFocusedE(false)}
                    placeholder="Email"
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: isFocusedP ? "#FFFFFF" : "#F6F6F6",
                      color: isFocusedP ? "#212121" : "#BDBDBD",
                      borderColor: isFocusedP ? "#FF6C00" : "#E8E8E8",
                    }}
                    placeholder="Password"
                    secureTextEntry={true}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocusedP(true);
                    }}
                    onBlur={() => setIsFocusedP(false)}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.inputBtn}
                    activeOpacity={0.7}
                    onPress={() => setHiddenPass(!hiddenPass)}
                  >
                    <Text style={{ ...styles.text, color: "#1B4371" }}>
                      {hiddenPass ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnSubmit}
                  onPress={onSubmit}
                >
                  <Text style={styles.btnSubmitText}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnGoLogin}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.btnGoLoginText}>
                    Already have an account? &nbsp;
                    <Text style={styles.btnGoLoginText}>log in</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  whiteContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },
  photoFrame: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    marginTop: -60,
    borderRadius: 16,
  },
  input: {
    marginHorizontal: 16,
    paddingLeft: 16,
    width: 343,
    height: 50,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    placeholderTextColor: '#BDBDBD',
    backgroundColor: '#F6F6F6',
    fontFamily: 'Roboto-Regular',
  },
  form: {
    alignItems: 'center',
  },
  btnSubmit: {
    marginTop: 43,
    height: 51,
    width: 343,
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        borderColor: '#f0f8ff',
      },
      android: {
        backgroundColor: '#FF6C00',
        borderColor: 'transparent',
      },
    }),
  },
  btnSubmitText: {
    color: Platform.OS === 'ios' ? '#4169e1' : '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    color: '#000000',
    fontSize: 30,
    marginTop: 32,
    fontFamily: 'Roboto-Medium',
  },
  btnGoLogin: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 45,
  },
  btnGoLoginText: {
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
  },
  btnAdd: {
    position: 'absolute',
    right: -12.5,
    bottom: 14,
  },
  inputBtn: {
    position: 'absolute',
    top: '30%',
    right: 40,
    backgroundColor: 'transparent',
    color: '#1B4371',
  },
});

