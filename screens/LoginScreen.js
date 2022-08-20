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
} from 'react-native';
import React, { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";

const LoginScreen = ({ navigation }) => {
  const [user, setuser] = useState("")
  const [pass, setpass] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.subtext}>Login to use the app.</Text>
          <TextInput value={user} onChangeText={text => setuser(text)} placeholderTextColor="grey" placeholder="Username" style={styles.input} />
          <TextInput
            value={pass}
            onChangeText={text => setpass(text)}
            placeholderTextColor="grey"
            placeholder="Password"
            secureTextEntry
            style={styles.input}
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
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    overflow: "hidden",
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 64,
    justifyContent: "space-between",
    display: "flex",
    height: "100%",
  },
  heading: {
    fontSize: 48,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#fff",
    width: "100%",
  },
  subtext: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins",
    marginTop: 8,
    marginBottom: 32,
  },
  input: {
    padding: 16,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    width: "100%",
    marginVertical: 16,
    fontSize: 20,
    fontFamily: "Poppins",
    color: "#fff",
  },
  button: {
    width: "100%",
    height: 64,
    backgroundColor: "#E6F5FC",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 8,
    borderRadius: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Poppins",
    color: "#2A2A2A",
    fontWeight: "bold",
  },
});
