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
import { authentication } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const image2 = { uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png" };
const image = require('../assets/bgGradient4.png');

const LoginScreen = ({ navigation }) => {
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  const [errorUser, setErrorUser] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, user, pass)
      .then(() => {
        alert("New user " + user + " created");
        navigation.replace("Forms");
      })
      .catch((error) => {
        alert(error.message);

        if (error.code == 'auth/invalid-email' ||
          error.code == 'auth/email-already-in-use') {
          setErrorUser(true);
        } else {
          setErrorUser(false);
        }

        if (error.code == 'auth/internal-error' ||
          error.code == 'auth/weak-password') {
          setErrorPass(true);
        } else {
          setErrorPass(false);
        }
      })
  }

  const handleLogIn = () => {
    signInWithEmailAndPassword(authentication, user, pass)
      .then(() => {
        alert("Login Successful with " + user);
        navigation.replace("Forms");
      })
      .catch((error) => {
        alert(error.message);

        if (error.code == 'auth/invalid-email' ||
          error.code == 'auth/user-not-found') {
          setErrorUser(true);
        } else {
          setErrorUser(false);
        }

        if (error.code == 'auth/internal-error' ||
          error.code == 'auth/wrong-password') {
          setErrorPass(true);
        } else {
          setErrorPass(false);
        }
      })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={(Platform.OS === 'ios') ? "padding" : null}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
            <CustomTextInput
              valueState={[pass, setpass]}
              errorState={[errorPass, setErrorPass]}
              placeholder="Password"
              isSecure={true}
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={handleLogIn}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          {/* <Pressable
            style={styles.button}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable> */}
        </View>
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
