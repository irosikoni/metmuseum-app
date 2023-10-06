import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Props } from "../App";
import { departmentSchema } from "./MuseumDepartments";
import { Button, FlatList, NativeBaseProvider } from "native-base";
import { z } from "zod";
import { NativeBaseConfigProvider } from "native-base/lib/typescript/core/NativeBaseContext";
import ObjectPanel from "./ObjectPanel";

const objectsInDepartmentsSchema = z.object({
  total: z.number(),
  objectIDs: z.array(z.number()),
});

const objectStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D3C4",
    alignItems: "center",
    justifyContent: "center",
    // margin: 10,
  },
  objectBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
});

export default function MuseumObjects({ route }: Props) {
  // console.log(route.params);
  const { departmentId, displayName } = departmentSchema.parse(route.params);

  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchObjects = async () => {
    const response = await fetch(
      departmentId === -1
        ? `https://collectionapi.metmuseum.org/public/collection/v1/search?title=true&q=${displayName}`
        : `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
    );
    const data = objectsInDepartmentsSchema.parse(await response.json());
    setData(data.objectIDs);
    setLoading(false);
    // console.log(data.objectIDs);
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={objectStyles.container}>
        <Text>{displayName}</Text>
        <FlatList
          style={objectStyles.list}
          data={data}
          renderItem={({ item }) => <ObjectPanel objectId={item} />}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </NativeBaseProvider>
  );
}
