import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MuseumDepartmentsScreen from "./MuseumDepartments";
import MuseumObjects from "./MuseumObjects";

const DepartmentsStack = createNativeStackNavigator();

export default function DepartmentsStackScreen() {
  return (
    <DepartmentsStack.Navigator>
      <DepartmentsStack.Screen
        name="DepartmentsList"
        component={MuseumDepartmentsScreen}
      />
      <DepartmentsStack.Screen
        name="MuseumObjects"
        component={MuseumObjects}
        initialParams={{ departmentId: 1, displayName: "American Wing" }}
      />
    </DepartmentsStack.Navigator>
  );
}
