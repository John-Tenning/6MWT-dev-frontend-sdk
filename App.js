import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import LoginScreen from "./screens/LoginScreen";
import Forms from "./screens/Forms";
import TimerScreen from "./screens/TimerScreen";
import HealthRecord from "./screens/HealthRecord";
import TestScreen from "./screens/TestScreen";

import Pdf from"./screens/Pdf.js";
const Stack = createNativeStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
<<<<<<< HEAD
        <Stack.Screen name="Test" component={TestScreen} />
=======
        <Stack.Screen name="PDF" component={Pdf} />
>>>>>>> c7d324a6631464ba2d299cf85174032aedcee3d4
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forms" component={Forms} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Health" component={HealthRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
