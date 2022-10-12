import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import LoginScreen from "./screens/LoginScreen";
import Forms from "./screens/Forms";
import TimerScreen from "./screens/TimerScreen";
import HealthRecord from "./screens/HealthRecord";
import PatientRecord from "./screens/PatientRecord";
import { RootSiblingParent as ToastContainer } from "react-native-root-siblings";
const Stack = createNativeStackNavigator();

export const PatientContext = React.createContext();

const App = () => {
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  const [pID, setPID] = React.useState("");

  return (
    <PatientContext.Provider value={{ pID, setPID }}>
      <ToastContainer>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Record" component={PatientRecord} />
            <Stack.Screen name="Forms" component={Forms} />
            <Stack.Screen name="Timer" component={TimerScreen} />
            <Stack.Screen name="Health" component={HealthRecord} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastContainer>
    </PatientContext.Provider>
  );
};

export default App;
