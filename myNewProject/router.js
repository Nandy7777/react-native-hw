import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/main/Home";
import CommentsScreen from "./Screens/main/CommentsScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator initialRouteName="RegistrationScreen">
                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name="Register"
                    component={RegistrationScreen}
                />
                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={LoginScreen}
                />
            </AuthStack.Navigator>
        );
    }
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <AuthStack.Screen name="CreatePosts" component={CreatePostsScreen} />
        <AuthStack.Screen name="Comments" component={CommentsScreen} />
      </AuthStack.Navigator>
    );
};