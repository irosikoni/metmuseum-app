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

const a = {
  a: 12,
  b: 13,
  c: 25,
};

const schema = z.object({
  a: z.number(),
  b: z.number(),
});

const b = schema.parse(a);

export default function MuseumObject() {
  const [data, setData] = useState<DepartmentObject>();
  const [loading, setLoading] = useState(true);

  const fetchObject = async () => {
    const response = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/1250"
    );
    const data = await response.json();
    // console.log(typeof data);
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
          source={{ uri: data ? data.primaryImage : "https://picsum.photos/" }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </NativeBaseProvider>
  );
}
