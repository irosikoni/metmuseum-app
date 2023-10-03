import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MuseumDepartments from './components/MuseumDepartments';



export default function App() {

  // fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1').then(response => response.json())
  // .then(data => console.log(data));
  

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <MuseumDepartments />
      <View></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
