import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NativeBaseProvider } from "native-base";
import { z } from "zod";
import { Props } from "../App";
import { useFonts } from "expo-font";
import { Dimensions } from "react-native";

const objectSchema = z.object({
  objectID: z.number(),
  accessionYear: z.string(),
  primaryImage: z.string(),
  objectName: z.string(),
  culture: z.string(),
  objectDate: z.string(),
});

const objectParamSchema = z.object({
  objectId: z.number(),
});
type DepartmentObject = z.infer<typeof objectSchema>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D3C4",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  mainText: {
    color: "#000000",
    fontSize: 40,
    marginTop: 0,
  },
  text: {
    color: "#000000",
    fontSize: 20,
    margin: 8,
  },
  image: {
    height: 200,
    width: "80%",
    margin: 8,
  },
});

export default function MuseumObjectScreen({ navigation, route }: Props) {
  const { objectId } = objectParamSchema.parse(route.params);
  console.log(objectId);
  const [data, setData] = useState<DepartmentObject>();
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    "YoungSerif-Regular": require("../assets/fonts/YoungSerif-Regular.ttf"),
  });
  const dimensions = Dimensions.get("window");

  const fetchObject = async () => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    );
    const data = objectSchema.parse(await response.json());
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchObject();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={{ ...styles.mainText, fontFamily: "YoungSerif-Regular" }}>
          {data ? data.objectName : "Nie ma nazwy"}
        </Text>
        <Text style={{ ...styles.text, fontFamily: "YoungSerif-Regular" }}>
          This artefact was found in {data ? data.accessionYear : "Nie ma daty"}
          .
        </Text>
        <Text style={{ ...styles.text, fontFamily: "YoungSerif-Regular" }}>
          It was made in {data ? data.objectDate : "Nie ma daty"} by the{" "}
          {data?.culture ? data.culture : "unknown"} culture.
        </Text>
        <Image
          source={{
            uri: data?.primaryImage
              ? data.primaryImage
              : "https://picsum.photos/",
          }}
          style={styles.image}
        />
      </View>
    </NativeBaseProvider>
  );
}
