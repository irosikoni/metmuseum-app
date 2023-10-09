import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "./components/HomeScreen";
import FavouriteObjectsScreen from "./components/FavouriteObjectsScreen";
import MuseumObject from "./components/MuseumObject";
import DepartmentsStackScreen from "./components/DepartmentStackScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import HomeStackScreen from "./components/HomeStackScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MuseumObjectScreen from "./components/MuseumObject";

const Tab = createBottomTabNavigator();
export type RootStackParamList = {
  MuseumObjects: { departmentId: number; displayName: string };
  MuseumDepartmentsScreen: undefined;
  MuseumObjectScreen: { objectId: number };
};
export type Props = NativeStackScreenProps<RootStackParamList>;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { position: "absolute" },
          tabBarBackground: () => (
            <BlurView
              tint="light"
              intensity={30}
              style={StyleSheet.absoluteFill}
            />
          ),
          headerStyle: { backgroundColor: "#708F89" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" color="#354D2F" size={28} />
            ),
            tabBarInactiveTintColor: "#354D2F",
            tabBarActiveTintColor: "#354D2F",
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={FavouriteObjectsScreen}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="heart" color="#354D2F" size={28} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Departments"
          component={DepartmentsStackScreen}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="book" color="#354D2F" size={28} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="MuseumObjectScreen"
          component={MuseumObjectScreen}
          options={{ tabBarButton: () => null, headerShown: false }}
        />
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

  tabNavigator: {
    flex: 1,
    backgroundColor: "#AFE0CE",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
