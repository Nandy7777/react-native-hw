import React, { useState, useEffect } from 'react';
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
} from 'react-native';


const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const [dimensions, setdimensions] = useState(Dimensions.get('window').width - 16 * 2);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 16 * 2;
      setdimensions(width);
    };
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

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
    console.log('state:', state);
    setState(initialState);
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/back-ground.jpg")}
        >
          <View
            style={{
              ...styles.container,
              position: "relative",
              marginTop: isShowKeyboard ? 130 : 273,
            }}
          >
            <View style={styles.form}>
              <Text style={styles.headerTitle}>Login</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 16,
                    backgroundColor: isFocusedE ? "#FFFFFF" : "#F6F6F6",
                    color: isFocusedE ? "#212121" : "#BDBDBD",
                    borderColor: isFocusedE ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Email"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsFocusedE(true);
                  }}
                  onBlur={() => setIsFocusedE(false)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View
                style={{
                  ...styles.inputWrapper,
                  width: dimensions,
                }}
              >
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
                    setState((prevState) => ({ ...prevState, password: value }))
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
                style={styles.btn}
                onPress={onSubmit}
              >
                <Text style={styles.btnTitle}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnGoRegister}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.btnGoRegisterText}>
                  No account? &nbsp;
                  <Text style={styles.btnGoRegisterText}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  inputWrapper: {
    alignItems: 'stretch',
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
  },
  inputBtn: {
    position: 'absolute',
    top: '30%',
    right: 40,
    backgroundColor: 'transparent',
    color: '#1B4371',
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    padding: 16,
    marginTop: 43,
    color: '#fff',
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
  btnTitle: {
    color: Platform.OS === 'ios' ? '#4169e1' : '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  headerTitle: {
    marginTop: 32,
    marginBottom: 32,
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
  },
  btnGoRegister: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 111,
  },
  btnGoRegisterText: {
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    marginRight: 5,
  },
});
