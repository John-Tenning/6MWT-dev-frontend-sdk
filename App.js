import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import LoginScreen from "./screens/LoginScreen";
import Forms from "./screens/Forms";
import TimerScreen from "./screens/TimerScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forms" component={Forms} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
