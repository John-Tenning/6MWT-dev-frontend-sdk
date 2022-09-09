import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "react-navigation-stack";

const image2 = { uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png" };
const image = require('../assets/bgGradient4.png');

const LoginScreen = ({ navigation }) => {
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  const [errorUser, setErrorUser] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

  var detailsNotNull = true;
  var count = 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior= {(Platform.OS === 'ios')? "padding" : null}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* <LinearGradient
          colors={["#a1e1fa", "#3b7197"]}
          style={styles.linearBackground}
        > */}
        <Image
          style={styles.imageCover}
          source={{ uri: "https://i.ibb.co/bsx8sLV/login-background.png" }}
        ></Image>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.heading}>6MWT</Text>
            <CustomTextInput
              valueState={[user, setuser]}
              errorState={[errorUser, setErrorUser]}
              placeholder="Username"
            />
            <CustomTextInput
              valueState={[pass, setpass]}
              errorState={[errorPass, setErrorPass]}
              placeholder="Password"
              isSecure={true}
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              count = 0;
              user.length <= 0 ? (setErrorUser(true), count++) : setErrorUser(false);
              pass.length <= 0 ? (setErrorPass(true), count++) : setErrorPass(false);

              if (count > 0) {
                detailsNotNull = false;
                Alert.alert("Enter Valid Details");
              } else {
                detailsNotNull = true;
              }

              if (detailsNotNull) {
                console.log(`UserName: ${user}`);
                console.log(`Password: ${pass}`);
                if (Platform.OS === "android") {
                  ToastAndroid.show("Submit Successful", ToastAndroid.SHORT);
                }
                navigation.navigate("Forms");
              }
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
        {/* </LinearGradient> */}
      </ImageBackground >
    </KeyboardAvoidingView >
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  linearBackground: {
    flex: 1,
  },
  imageCover: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  heading: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    width: "100%",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#a1e1fa",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 16,
    borderRadius: 16,
    elevation: 5,
    marginVertical: 8,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 20,
    color: "#3b7197",
    fontWeight: "600",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
