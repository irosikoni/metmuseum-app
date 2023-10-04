import { useState } from "react";
import { Department } from "./MuseumDepartments";
import { View, Text } from "react-native";

export default function MuseumObjects({ route }: { route: any }) {
  const { departmentId, displayName } = route.params;
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const fetchObjects = async () => {
  //   const response = await fetch(
  //     `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=}&q=The%20American%20Wing`
  //   );
  //   const data = await response.json();
  //   setData(data);
  //   setLoading(false);
  // };
  return (
    <View>
      <Text>Museum Objects</Text>
    </View>
  );
}
