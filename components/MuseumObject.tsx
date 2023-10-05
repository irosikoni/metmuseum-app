import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import { NativeBaseProvider } from "native-base";
import { z } from "zod";

const objectSchema = z.object({
  objectID: z.number(),
  accessionYear: z.string(),
  primaryImage: z.string(),
  objectName: z.string(),
});
type DepartmentObject = z.infer<typeof objectSchema>;

export default function MuseumObject() {
  const [data, setData] = useState<DepartmentObject>();
  const [loading, setLoading] = useState(true);

  const fetchObject = async () => {
    const response = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/1250"
    );
    const data = objectSchema.parse(await response.json());
    // console.log(typeof data);
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchObject();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#D5D3C4",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text>{data ? data.objectName : "Nie ma nazwy"}</Text>
        <Image
          source={{ uri: data ? data.primaryImage : "https://picsum.photos/" }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </NativeBaseProvider>
  );
}
