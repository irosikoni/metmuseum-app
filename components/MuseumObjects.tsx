import { useState } from "react";
import { Department } from "./MuseumDepartments";

export default function MuseumObjects(department: Department) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchObjects = async () => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${department.departmentId}&q=The%20American%20Wing`
    );
    const data = await response.json();
    setData(data);
    setLoading(false);
  };
}
