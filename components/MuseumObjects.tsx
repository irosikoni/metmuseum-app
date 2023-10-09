import { useEffect, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Props } from "../App";
import { departmentSchema } from "./MuseumDepartments";
import { NativeBaseProvider } from "native-base";
import { z } from "zod";
import ObjectPanel from "./ObjectPanel";
import Swiper from "react-native-swiper";

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
    width: "100%",
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
const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    backgroundColor: "#D5D3C4",
  },
  element: {
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#708F89",
  },
});

export default function MuseumObjects({ navigation, route }: Props) {
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

    setData(data.objectIDs.splice(0, 20));
    setLoading(false);
    // console.log(data.objectIDs);
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <NativeBaseProvider>
      <Swiper style={styles.wrapper} showsButtons showsPagination={false}>
        {data.map((item) => (
          <Pressable
            key={item}
            style={styles.element}
            onPress={() =>
              navigation.navigate("MuseumObjectScreen", { objectId: item })
            }
          >
            <ObjectPanel key={item} objectId={item} />
          </Pressable>
        ))}
      </Swiper>
    </NativeBaseProvider>
  );
}
