import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "./components/HomeScreen";
import FavouriteObjectsScreen from "./components/FavouriteObjectsScreen";
import MuseumObject from "./components/MuseumObject";
import DepartmentsStackScreen from "./components/DepartmentStackScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
export type RootStackParamList = {
  MuseumObjects: { departmentId: number; displayName: string };
  MuseumDepartmentsScreen: undefined;
};
export type Props = NativeStackScreenProps<RootStackParamList>;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favourite" component={FavouriteObjectsScreen} />
        <Tab.Screen name="Departments" component={DepartmentsStackScreen} />
        <Tab.Screen name="ObjectScreen" component={MuseumObject} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    backgroundColor: "#AFE0CE",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFEDDF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
