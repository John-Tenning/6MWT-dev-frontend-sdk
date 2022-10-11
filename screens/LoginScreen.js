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
  ScrollView,
  Linking,
} from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { authentication } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

const image2 = {
  uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png",
};
const image = require("../assets/bgGradient4.png");

const LoginScreen = ({ navigation }) => {
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  const [errorUser, setErrorUser] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, user, pass)
      .then(() => {
        alert("New user " + user + " created");
        navigation.replace("Forms");
      })
      .catch((error) => {
        alert(error.message);

        if (
          error.code == "auth/invalid-email" ||
          error.code == "auth/email-already-in-use"
        ) {
          setErrorUser(true);
        } else {
          setErrorUser(false);
        }

        if (
          error.code == "auth/internal-error" ||
          error.code == "auth/weak-password"
        ) {
          setErrorPass(true);
        } else {
          setErrorPass(false);
        }
      });
  };

  const handleLogIn = () => {
    signInWithEmailAndPassword(authentication, user, pass)
      .then(() => {
        // alert("Login Successful with " + user);
        Toast.show(`Login successful with ${user}!`, {
          duration: 3000,
          shadow: true,
          backgroundColor: "#ffffff",
          textColor: "#4BB543",
        });
        navigation.replace("Forms");
      })
      .catch((error) => {
        // alert(error.message);
        alert("Invalid Credentials");

        if (
          error.code == "auth/invalid-email" ||
          error.code == "auth/user-not-found"
        ) {
          setErrorUser(true);
        } else {
          setErrorUser(false);
        }

        if (
          error.code == "auth/internal-error" ||
          error.code == "auth/wrong-password"
        ) {
          setErrorPass(true);
        } else {
          setErrorPass(false);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
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
                  capitalize={false}
                />
                <View style={styles.eye}>
                  <CustomTextInput
                    valueState={[pass, setpass]}
                    errorState={[errorPass, setErrorPass]}
                    placeholder="Password"
                    isSecure={passwordVisibility}
                    passw = "true"
                  />
                  <Pressable onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons
                      name={rightIcon}
                      size={32}
                      color="#2A2A2A"
                      style={styles.icon}
                    />
                  </Pressable>
                </View>
              </View>
              <Pressable style={styles.button} onPress={handleLogIn}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
              {/* <Pressable
                  style={styles.button}
                  onPress={handleSignUp}
                  >
                  <Text style={styles.buttonText}>Register</Text>
                  </Pressable> */}
              <View style={styles.done}>
                <Text style={{ color: "white" }}>
                  <Text style={styles.head2}>This app is created by </Text>
                  <Text
                    style={styles.text}
                    onPress={() =>
                      Linking.openURL(
                        "https://www.linkedin.com/in/sashti-amar/"
                      )
                    }
                  >
                    Sashti Amar
                  </Text>
                  <Text>{", "}</Text>
                  <Text
                    style={styles.text}
                    onPress={() =>
                      Linking.openURL(
                        "https://www.linkedin.com/in/jeyam-palaniappan-527856194/"
                      )
                    }
                  >
                    Jeyam Palaniappan
                  </Text>
                  <Text>{", "}</Text>

                  <Text
                    style={styles.text}
                    onPress={() =>
                      Linking.openURL(
                        "https://www.linkedin.com/in/tgashwinkumar/"
                      )
                    }
                  >
                    Ashwin Kumar
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // overflow: "hidden",
  },
  linearBackground: {
    flex: 1,
  },
  imageCover: {
    marginHorizontal: 0,
    height: 490,
    width: 420,
    flex: 1,
    marginTop: -56,
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  eye: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    margin: 8,
    padding: 8,
    marginLeft: 18,
    backgroundColor: "#f3f2f860",
    borderColor: "#f3f2f860",
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: 16,
    paddingLeft: 8,
    paddingVertical: 2,
    textDecorationLine: "underline",
  },
  head2: {
    color: "white",
    fontSize: 16,
    padding: 12,
  },
  done: {
    padding: 12,
    backgroundColor: "#f3f2f860",
    borderRadius: 16,
    marginVertical: 8,
  },
});
