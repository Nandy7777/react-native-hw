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
} from 'react-native';

const initialState = {
  email: '',
  password: '',
  nickname: '',
};

export default function RegistrationScreen() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocused, setIsFocused] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false); 
    Keyboard.dismiss();
  };

  const keboardHideAndSubmit = () => {
    setIsShowKeyboard(false);
    setIsFocused(false);
    Keyboard.dismiss();
    console.log('state:', state); 
    setState(initialState);
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={{
            ...styles.image,
            width: windowWidth,
            height: windowHeight,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          source={require('../assets/images/back-ground.jpg')}
        >
          <KeyboardAvoidingView
          // behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View
              style={{
                ...styles.whiteContainer,
                marginBottom: isShowKeyboard ? 200 : 0,
              }}
            >
              <View style={styles.photoFrame}></View>
              <View style={styles.form}>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Registration</Text>
                </View>
                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: isFocused ? '#FFFFFF' : '#F6F6F6',
                      color: isFocused ? '#212121' : '#BDBDBD',
                      borderColor: isFocused ? '#FF6C00' : '#E8E8E8',
                      marginBottom: 16,
                    }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Login"
                    value={state.nickname}
                    onChangeText={value =>
                      setState(prevState => ({ ...prevState, nickname: value }))
                    }
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: isFocused ? '#FFFFFF' : '#F6F6F6',
                      color: isFocused ? '#212121' : '#BDBDBD',
                      borderColor: isFocused ? '#FF6C00' : '#E8E8E8',
                      marginBottom: 16,
                    }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Email"
                    value={state.email}
                    onChangeText={value => setState(prevState => ({ ...prevState, email: value }))}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: isFocused ? '#FFFFFF' : '#F6F6F6',
                      color: isFocused ? '#212121' : '#BDBDBD',
                      borderColor: isFocused ? '#FF6C00' : '#E8E8E8',
                    }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Password"
                    value={state.password}
                    onChangeText={value =>
                      setState(prevState => ({ ...prevState, password: value }))
                    }
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnSubmit}
                  onPress={keboardHideAndSubmit}
                >
                  <Text style={styles.btnSubmitText}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnGoLogin}
                  onPress={() => console.log('go to Login Page')}
                >
                  <Text style={styles.btnGoLoginText}>Already have an account? log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
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
    // height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    // marginBottom: 0,
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
  },
  btnGoLoginText: {
    color: '#000000',
    fontFamily: 'Roboto-Regular',
  },
});

