import { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { z } from "zod";

type Department = z.infer<typeof departmentSchema>;

const departmentSchema = z.object({
    departmentId: z.number(),
    displayName: z.string(),
})

const dataSchema = z.object({
    departments: z.array(departmentSchema),
})

export default function MuseumDepartments() {
    const [data, setData ] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDepartments = async () => {
        const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments');
        const data = dataSchema.parse(await response.json());
        console.log(typeof(data.departments));
        setData(data.departments);
        setLoading(false);
    }
    useEffect(() => {
        fetchDepartments();
    } ,[]);

    const renderDepartment = (item: Department ) => {
        return (
            <View>
                <Text>{item.displayName}</Text>
            </View>
        )
    }

    return (
        <NativeBaseProvider>
            <FlatList
                data={data}
                renderItem={({item}) => renderDepartment(item)}
                keyExtractor={item => item.departmentId.toString()}
            />
        </NativeBaseProvider>
    )
}


    