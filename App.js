import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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

// import { createBottomTabNavigator } from 'react-navigation-tabs'
// //example home screen
// const HomeScreen = (props) => {
//   return (
//     <View>
//        <Text>Hello from home screen</Text>
//     </View>
//   );
// }
// const bottomTabNav = createBottomTabNavigator(
// {
//    HomeScreen: {
//     screen: HomeScreen
//    },
//    AddScreen: {
//     screen: AddScreen
//    },
//    SettingsScreen: {
//     screen: SettingsScreen
//    },
//    //add other tabs here
// },
// {
//    initialRouteName: 'HomeScreen' //Name of the preselected tab
// }
// )