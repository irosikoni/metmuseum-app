import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { z } from "zod";

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
});

export default function ObjectPanel({ objectId }: { objectId: number }) {
  const [objectInfo, setObjectInfo] = useState<MuseumObject>();
  const [loading, setLoading] = useState(true);

  const fetchObject = async (objectId: number) => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    );
    const objectData = objectSchema.parse(await response.json());
    // console.log(objectData);
    setObjectInfo(objectData);
    setLoading(false);
  };

  useEffect(() => {
    fetchObject(objectId);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Text>{objectId}</Text>
      {loading && <Text>Loading...</Text>}
      {objectInfo && (
        <Text>{objectInfo ? objectInfo.objectName : "Nie ma nazwy"}</Text>
      )}
    </View>
  );
}
