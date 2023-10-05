import { Link, NativeBaseProvider } from "native-base";
import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, Button } from "react-native";
import { z } from "zod";
import { Props } from "../App";

export type Department = z.infer<typeof departmentSchema>;

export const departmentSchema = z.object({
  departmentId: z.number(),
  displayName: z.string(),
});

const dataSchema = z.object({
  departments: z.array(departmentSchema),
});

const departmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFE0CE",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  departmentBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

  const renderDepartment = (item: Department) => {
    return (
      <View style={departmentStyles.container}>
        <Button
          title={item.displayName}
          onPress={() =>
            navigation.navigate("MuseumObjects", {
              departmentId: item.departmentId,
              displayName: item.displayName,
            })
          }
        />
      </View>
    );
  };

  return (
    <View style={departmentStyles.departmentBox}>
      <FlatList
        data={data}
        renderItem={({ item }) => renderDepartment(item)}
        keyExtractor={(item) => item.departmentId.toString()}
      />
    </View>
  );
}
