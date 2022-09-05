import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  Button,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../components/CustomTextInput";

const LoginScreen = ({ navigation }) => {
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1546370080-e42239f15249?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
        }}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.heading}>Login</Text>
            <Text style={styles.subtext}>To enter the application</Text>
            <CustomTextInput
              valueState={[user, setuser]}
              placeholder="Username"
            />
            <CustomTextInput
              valueState={[pass, setpass]}
              placeholder="Password"
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              console.log(`UserName: ${user}`);
              console.log(`Password: ${pass}`);
              if (Platform.OS === "android") {
                ToastAndroid.show("Submit Successful", ToastAndroid.SHORT);
              }
              navigation.navigate("Forms");
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: "white",
    marginHorizontal: 24,
    marginVertical: 64,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: "space-between",
    display: "flex",
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: 16,
  },
  heading: {
    fontSize: 48,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "black",
    width: "100%",
    textAlign: "center",
  },
  subtext: {
    color: "#196966",
    fontSize: 14,
    fontFamily: "Poppins",
    marginTop: 4,
    marginBottom: 32,
    width: "100%",
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#196966",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    marginVertical: 8,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    // fontFamily: "Poppins",
    fontWeight: "600",
  },
});
