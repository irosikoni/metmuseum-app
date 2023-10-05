import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Props } from "../App";
import { departmentSchema } from "./MuseumDepartments";
import { Button, FlatList, NativeBaseProvider } from "native-base";
import { z } from "zod";
import { NativeBaseConfigProvider } from "native-base/lib/typescript/core/NativeBaseContext";

const objectsInDepartmentsSchema = z.object({
  total: z.number(),
  objectIDs: z.array(z.number()),
});

const objectSchema = z.object({
  primaryImage: z.string(),
  objectName: z.string(),
});

type MuseumObject = z.infer<typeof objectSchema>;

const objectStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFE0CE",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  objectBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function MuseumObjects({ route }: Props) {
  console.log(route.params);
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

  const fetchObject = async (objectId: number) => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    );
    const objectData = objectSchema.parse(await response.json());
    console.log(objectData);
    setObjectInfo(objectData);
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  const [objectInfo, setObjectInfo] = useState<MuseumObject>();
  const renderObject = (item: number) => {
    // console.log(item);
    // fetchObject(item);
    return (
      <View style={objectStyles.container}>
        {/* <Text>{item.toString()}</Text> */}
        <Text>{item}</Text>
        {/* <Text>{objectInfo ? objectInfo.objectName : "Nie ma nazwy"}</Text> */}
        {/* <Button title={item.toString()} /> */}
      </View>
    );
  };
  return (
    <View style={objectStyles.objectBox}>
      <Text>{displayName}</Text>
      <NativeBaseProvider>
        <FlatList
          data={data}
          renderItem={({ item }) => renderObject(item)}
          keyExtractor={(item) => item.toString()}
        />
      </NativeBaseProvider>
    </View>
  );
}
