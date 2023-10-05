import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import MuseumObjects from "./MuseumObjects";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MuseumObjects"
        component={MuseumObjects}
        initialParams={{ departmentId: -1, displayName: "sunflowers" }}
      />
    </HomeStack.Navigator>
  );
}
