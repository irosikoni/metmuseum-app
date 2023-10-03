import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import { NativeBaseProvider } from "native-base";
import { z } from "zod";

type DepartmentObject = {
  objectID: number;
  accessionYear: string;
  primaryImage: string;
  objectName: string;
};

export default function MuseumObject() {
  const [data, setData] = useState<DepartmentObject>();
  const [loading, setLoading] = useState(true);

  const fetchObject = async () => {
    const response = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/1250"
    );
    const data: DepartmentObject = await response.json();
    console.log(typeof data);
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchObject();
  }, []);

  return (
    <NativeBaseProvider>
      <View>
        <Text>{data ? data.objectName : "Nie ma nazwy"}</Text>
        <Image
          source={
            data
              ? { uri: data.primaryImage }
              : { uri: "https://picsum.photos/" }
          }
          style={{ width: 200, height: 200 }}
        />
      </View>
    </NativeBaseProvider>
  );
}
