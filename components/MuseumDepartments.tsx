import { useState, useEffect } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { z } from "zod";
import { Props } from "../App";
import Swiper from "react-native-swiper";

export type Department = z.infer<typeof departmentSchema>;

export const departmentSchema = z.object({
  departmentId: z.number(),
  displayName: z.string(),
});

const dataSchema = z.object({
  departments: z.array(departmentSchema),
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
    margin: 100,
    backgroundColor: "#708F89",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    top: 37,
    color: "#D5D3C4",
  },
});

export default function MuseumDepartmentsScreen({ navigation, route }: Props) {
  const [data, setData] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    const response = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );
    const data = dataSchema.parse(await response.json());
    setData(data.departments);
    setLoading(false);
  };
  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <Swiper style={styles.wrapper} showsButtons showsPagination={false}>
      {data.map((item) => (
        <Pressable
          key={item.departmentId}
          style={styles.element}
          onPress={() =>
            navigation.navigate("MuseumObjects", {
              departmentId: item.departmentId,
              displayName: item.displayName,
            })
          }
        >
          <Text style={styles.text}>{item.displayName}</Text>
        </Pressable>
      ))}
    </Swiper>
  );
}
