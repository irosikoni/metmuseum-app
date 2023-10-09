import { useEffect, useState } from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import { z } from "zod";
import { Dimensions } from "react-native";

const objectSchema = z.object({
  primaryImage: z.string(),
  objectName: z.string(),
});

type MuseumObject = z.infer<typeof objectSchema>;

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: "#AFE0CE",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    justifyContent: "center",
    opacity: 0.8,
  },
  text: {
    color: "#000000",
    backgroundColor: "#D5D3C4d0",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    opacity: 1,
  },
});

export default function ObjectPanel({ objectId }: { objectId: number }) {
  const [objectInfo, setObjectInfo] = useState<MuseumObject>();
  const [loading, setLoading] = useState(true);
  const dimensions = Dimensions.get("window");

  const fetchObject = async (objectId: number) => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    );
    const objectData = objectSchema.parse(await response.json());
    setObjectInfo(objectData);
    setLoading(false);
  };

  useEffect(() => {
    fetchObject(objectId);
  }, []);

  return (
    <ImageBackground
      source={{
        uri: objectInfo?.primaryImage
          ? objectInfo.primaryImage
          : "https://picsum.photos/",
      }}
      style={styles.image}
    >
      {loading && <Text>Loading...</Text>}
      {objectInfo && (
        <Text
          style={{
            ...styles.text,
            lineHeight: dimensions.height * 0.5,
          }}
        >
          {objectInfo ? objectInfo.objectName : "Nie ma nazwy"}
        </Text>
      )}
    </ImageBackground>
  );
}
