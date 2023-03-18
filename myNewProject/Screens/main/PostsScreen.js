import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params])
    } 
  }, [route.params]);
  console.log('posts', posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={{marginBottom: 10}}>
            <Image source={{ uri: item.photo }} style={{width: 200, height: 200} } />
          </View >
        )}
        keyExtractor={(item, indx) => indx.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default PostsScreen;
