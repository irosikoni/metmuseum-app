import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Props } from "../App";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignContent: "center",
    opacity: 0.8,
  },
  text: {
    color: "#000000",
    backgroundColor: "#708F89a0",
    fontSize: 30,
    lineHeight: 100,
    fontWeight: "bold",
    textAlign: "center",
    opacity: 1,
    marginTop: -170,
  },
  search: {
    backgroundColor: "#D5D3C4",
    marginTop: 100,
    marginHorizontal: 16,
    width: "90%",
  },
});

export default function HomeScreen({ navigation, route }: Props) {
  const image = {
    uri: "https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg",
  };
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);
  return (
    <ImageBackground style={styles.image} source={image}>
      <Text style={styles.text}>Welcome to metmuseum!</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
        onIconPress={() =>
          navigation.navigate("MuseumObjects", {
            departmentId: -1,
            displayName: searchQuery,
          })
        }
      />
    </ImageBackground>
  );
}
