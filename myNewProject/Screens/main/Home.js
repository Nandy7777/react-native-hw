import React from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator(); 

const Home = ({ navigation }) => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6C00",
        tabBarStyle: styles.tabBar,
        headerRightContainerStyle: styles.exitBtn,
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="#bdbdbd" />
          ),
          headerRight: (props) => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              onPress={() => alert("exit?")}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Create posts"
        component={CreatePostsScreen}
        options={{
          headerTitleAlign: "center",
          // headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={24} color="white" />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={styles.addBtn}
              onPress={() => {
                navigation.navigate("Create posts");
              }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              onPress={() => alert("This is a button!")}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 9,
    paddingBottom: 22,
    height: 71,
    alignItems: "center",
    justifyContent: "center",
  },
  exitBtn: {
    paddingRight: 16,
  },
  addBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
});
